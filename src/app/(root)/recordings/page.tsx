"use client";

import LoaderUI from "@/components/LoaderUI";
import RecordingCard from "@/components/RecordingCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetCalls from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

function RecordingsPage() {
  const { calls, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!calls) return;

      try {
        // Get recordings for each call
        const callData = await Promise.all(
          calls.map((call) => call.queryRecordings()),
        );
        const allRecordings = callData.flatMap((call) => call.recordings);

        setRecordings(allRecordings);
      } catch (error) {
        console.log("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, [calls]);

  if (isLoading) return <LoaderUI />;

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl min-w-0 flex-col px-3 py-4 min-[380px]:px-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {/* HEADER SECTION */}
      <header className="min-w-0 shrink-0">
        <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
          Recordings
        </h1>

        <p className="mt-1 break-words text-sm text-muted-foreground sm:text-base">
          {recordings.length}{" "}
          {recordings.length === 1 ? "recording" : "recordings"} available
        </p>
      </header>

      {/* RECORDINGS GRID */}
      <ScrollArea className="mt-4 min-h-0 w-full min-w-0 flex-1 sm:mt-5">
        {recordings.length > 0 ? (
          <div className="grid w-full min-w-0 grid-cols-1 gap-4 pb-5 sm:grid-cols-2 sm:gap-5 sm:pb-6 xl:grid-cols-3 xl:gap-6">
            {recordings.map((recording) => (
              <div key={recording.end_time} className="min-w-0">
                <RecordingCard recording={recording} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[min(24rem,55dvh)] w-full items-center justify-center rounded-2xl border border-border/60 px-4 py-12 text-center">
            <p className="break-words text-base font-medium text-muted-foreground sm:text-lg">
              No recordings available
            </p>
          </div>
        )}
      </ScrollArea>
    </main>
  );
}

export default RecordingsPage;