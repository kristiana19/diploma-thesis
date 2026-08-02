"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUI";
import { streamTokenProvider } from "@/actions/stream.actions";

const StreamClientProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: {
        id: user.id,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.id,
        image: user.imageUrl,
      },
      tokenProvider: streamTokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <LoaderUI />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamClientProvider;