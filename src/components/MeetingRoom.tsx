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
import { useEffect, useState } from "react";

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
import CodeEditor from "./CodeEditor";
import EndCallButton from "./EndCallButton";

function MeetingRoom() {
  const router = useRouter();

  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const updateLayout = () => {
      setIsMobileLayout(mediaQuery.matches);
    };

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
    };
  }, []);

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex min-h-[calc(100dvh-4rem-1px)] w-full items-center justify-center px-4">
        <LoaderIcon className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="meeting-room h-[calc(100dvh-4rem-1px)] min-h-0 w-full overflow-hidden bg-background/95 p-1.5 min-[380px]:p-2 sm:p-3">
      <ResizablePanelGroup
        key={isMobileLayout ? "mobile-meeting" : "desktop-meeting"}
        orientation={isMobileLayout ? "vertical" : "horizontal"}
        className="h-full min-h-0 w-full min-w-0 gap-1.5 sm:gap-3"
      >
        {/* VIDEO PANEL */}
        <ResizablePanel
          defaultSize={isMobileLayout ? "60%" : "45%"}
          minSize={isMobileLayout ? "48%" : "30%"}
          maxSize={isMobileLayout ? "75%" : "70%"}
          className="relative min-h-0 min-w-0 overflow-hidden rounded-xl border border-pink-200/50 bg-pink-50/40 shadow-sm shadow-pink-500/5 backdrop-blur-xl sm:rounded-2xl dark:border-pink-300/15 dark:bg-pink-950/20"
        >
          {/* VIDEO LAYOUT */}
          <div className="absolute inset-0 min-h-0 min-w-0 overflow-hidden">
            {layout === "grid" ? (
              <PaginatedGridLayout />
            ) : (
              <SpeakerLayout />
            )}

            {/* PARTICIPANTS LIST OVERLAY */}
            {showParticipants && (
              <aside
                aria-label="Participants"
                className="meeting-participants-panel absolute inset-x-2 bottom-[5.25rem] top-2 z-40 min-w-0 overflow-hidden rounded-xl border border-pink-300/55 bg-pink-50/95 shadow-xl shadow-pink-500/10 backdrop-blur-2xl sm:bottom-20 sm:left-auto sm:right-3 sm:top-3 sm:w-[calc(100%-1.5rem)] sm:max-w-[320px] sm:rounded-2xl dark:border-pink-300/20 dark:bg-pink-950/90"
              >
                <CallParticipantsList
                  onClose={() => setShowParticipants(false)}
                />
              </aside>
            )}
          </div>

          {/* VIDEO CONTROLS */}
          <div className="pointer-events-none absolute inset-x-0 bottom-2 z-30 flex justify-center px-1.5 sm:bottom-4 sm:px-2">
            <div className="meeting-room-controls pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-0.5 overflow-visible rounded-2xl border border-pink-200/60 bg-white/90 p-1 shadow-lg shadow-pink-500/10 backdrop-blur-2xl [&_.str-video__call-controls]:!gap-0.5 [&_.str-video__call-controls]:!overflow-visible [&_.str-video__call-controls__button]:!size-8 [&_.str-video__call-controls__button]:!min-h-0 [&_.str-video__call-controls__button]:!min-w-0 [&_.str-video__call-controls__button]:!p-0 [&_.str-video__call-controls__button_svg]:!size-3.5 min-[420px]:gap-1 min-[420px]:rounded-full sm:gap-1.5 sm:p-2 sm:[&_.str-video__call-controls]:!gap-1 sm:[&_.str-video__call-controls__button]:!size-10 sm:[&_.str-video__call-controls__button_svg]:!size-4 dark:bg-background/90">
              <CallControls onLeave={() => router.push("/")} />

              {/* LAYOUT SELECTOR */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Change meeting layout"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-pink-300/70 bg-pink-100/75 text-pink-600 shadow-none outline-none transition-colors hover:bg-pink-200/80 hover:text-pink-700 focus:outline-none focus-visible:ring-0 data-[state=open]:bg-pink-200/80 sm:size-10"
                >
                  <LayoutListIcon className="size-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="z-[100] rounded-xl border-pink-200/60 bg-white/95 p-1.5 shadow-xl shadow-pink-500/10 backdrop-blur-2xl"
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
                className="size-8 shrink-0 rounded-full border border-pink-200/70 bg-white p-0 text-pink-500 shadow-none transition-colors hover:bg-pink-50 hover:text-pink-600 aria-pressed:bg-pink-100 aria-pressed:text-pink-600 sm:size-10"
              >
                <UsersIcon className="size-4" />
              </Button>

              <EndCallButton />
            </div>
          </div>
        </ResizablePanel>

        {/* RESIZE HANDLE */}
        <ResizableHandle
          withHandle
          className="shrink-0 bg-transparent"
        />

        {/* CODE EDITOR PANEL */}
        <ResizablePanel
          defaultSize={isMobileLayout ? "40%" : "55%"}
          minSize={isMobileLayout ? "25%" : "35%"}
          className="min-h-0 min-w-0 overflow-hidden rounded-xl border border-pink-200/50 bg-pink-50/35 shadow-sm shadow-pink-500/5 backdrop-blur-xl sm:rounded-2xl dark:border-pink-300/15 dark:bg-pink-950/20"
        >
          <div className="h-full min-h-0 w-full min-w-0 overflow-hidden">
            <CodeEditor />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}

export default MeetingRoom;