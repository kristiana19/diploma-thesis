"use client";

import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutListIcon, LoaderIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import EndCallButton from "./EndCallButton";
// import CodeEditor from "./CodeEditor";

function MeetingRoom() {
  const router = useRouter();

  const [layout, setLayout] = useState<"grid" | "speaker">(
    "speaker",
  );
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex h-[calc(100vh-4rem-1px)] items-center justify-center">
        <LoaderIcon className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="meeting-room h-[calc(100vh-4rem-1px)] bg-background/95 p-2 sm:p-3">
      <ResizablePanelGroup
        direction="horizontal"
        className="gap-2 sm:gap-3"
      >
        {/* VIDEO PANEL */}
        <ResizablePanel
          defaultSize="45"
          minSize="30"
          maxSize="70"
          className="relative min-h-[280px] overflow-hidden rounded-2xl border border-pink-200/50 bg-pink-50/40 shadow-sm shadow-pink-500/5 backdrop-blur-xl dark:border-pink-300/15 dark:bg-pink-950/20"
        >
          {/* VIDEO LAYOUT */}
          <div className="absolute inset-0">
            {layout === "grid" ? (
              <PaginatedGridLayout />
            ) : (
              <SpeakerLayout />
            )}

            {/* PARTICIPANTS LIST OVERLAY */}
            {showParticipants && (
              <div className="absolute right-0 top-0 z-40 h-full w-[85%] max-w-[300px] overflow-y-auto border-l border-pink-200/60 bg-pink-50/90 shadow-xl shadow-pink-500/10 backdrop-blur-2xl dark:border-pink-300/15 dark:bg-pink-950/90">
                <CallParticipantsList
                  onClose={() => setShowParticipants(false)}
                />
              </div>
            )}
          </div>

          {/* VIDEO CONTROLS */}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex justify-center px-2 sm:bottom-4">
            <div className="meeting-room-controls pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-pink-200/60 bg-white/85 p-2 shadow-lg shadow-pink-500/10 backdrop-blur-2xl">
              <CallControls onLeave={() => router.push("/")} />

              {/* LAYOUT SELECTOR */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Change meeting layout"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-pink-300/70 bg-pink-100/75 text-pink-600 shadow-none outline-none transition-colors hover:bg-pink-200/80 hover:text-pink-700 focus:outline-none focus-visible:ring-0 data-[state=open]:bg-pink-200/80"
                >
                  <LayoutListIcon className="size-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="rounded-xl border-pink-200/60 bg-white/95 p-1.5 shadow-xl shadow-pink-500/10 backdrop-blur-2xl"
                >
                  <DropdownMenuItem
                    onClick={() => setLayout("grid")}
                    className="cursor-pointer rounded-lg text-pink-700 focus:bg-pink-50 focus:text-pink-800"
                  >
                    Grid view
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setLayout("speaker")}
                    className="cursor-pointer rounded-lg text-pink-700 focus:bg-pink-50 focus:text-pink-800"
                  >
                    Speaker view
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* PARTICIPANTS BUTTON */}
              <Button
                variant="outline"
                size="icon"
                aria-label={
                  showParticipants
                    ? "Hide participants"
                    : "Show participants"
                }
                aria-pressed={showParticipants}
                onClick={() => {
                  setShowParticipants((current) => !current);
                }}
                className="size-10 shrink-0 rounded-full border border-pink-200/70 bg-white text-pink-500 shadow-none transition-colors hover:bg-pink-50 hover:text-pink-600 aria-pressed:bg-pink-100 aria-pressed:text-pink-600"
              >
                <UsersIcon className="size-4" />
              </Button>

              <EndCallButton />
            </div>
          </div>
        </ResizablePanel>

        {/* RESIZE HANDLE */}
        <ResizableHandle withHandle className="bg-transparent" />

        {/* CODE EDITOR PANEL */}
        <ResizablePanel
          defaultSize="55"
          minSize="30"
          className="min-h-[280px] overflow-hidden rounded-2xl border border-pink-200/50 bg-pink-50/35 shadow-sm shadow-pink-500/5 backdrop-blur-xl dark:border-pink-300/15 dark:bg-pink-950/20"
        >
          {/* <CodeEditor /> */}

          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
              Code editor
            </span>

            <p className="text-sm text-muted-foreground">
              Coming soon
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default MeetingRoom;