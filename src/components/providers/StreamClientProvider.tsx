"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

import LoaderUI from "../LoaderUI";
import { streamTokenProvider } from "@/actions/stream.actions";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamClientProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user, isLoaded } = useUser();
  const [videoClient, setVideoClient] =
    useState<StreamVideoClient | null>(null);

  const userId = user?.id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;

  useEffect(() => {
    if (!isLoaded || !userId) return;

    if (!apiKey) {
      throw new Error(
        "NEXT_PUBLIC_STREAM_API_KEY is not configured.",
      );
    }

    const name =
      `${firstName || ""} ${lastName || ""}`.trim() || userId;

    const client = StreamVideoClient.getOrCreateInstance({
      apiKey,
      user: {
        id: userId,
        name,
        image: imageUrl,
      },
      tokenProvider: streamTokenProvider,
    });

    setVideoClient(client);
  }, [isLoaded, userId, firstName, lastName, imageUrl]);

  if (!isLoaded || !userId || !videoClient) {
    return <LoaderUI />;
  }

  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};

export default StreamClientProvider;