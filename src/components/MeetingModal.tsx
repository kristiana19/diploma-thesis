import { useState } from "react";
import {
  ArrowRightIcon,
  LinkIcon,
  SparklesIcon,
  VideoIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoinMeeting: boolean;
  onStartMeeting?: () => void;
  onJoinMeeting?: (meetingId: string) => void;
}

function MeetingModal({
  isOpen,
  onClose,
  title,
  isJoinMeeting,
  onStartMeeting,
  onJoinMeeting,
}: MeetingModalProps) {
  const [meetingUrl, setMeetingUrl] = useState("");

  const handleClose = () => {
    setMeetingUrl("");
    onClose();
  };

  const handleStart = () => {
    if (isJoinMeeting) {
      const meetingId = meetingUrl
        .trim()
        .split("/")
        .filter(Boolean)
        .pop();

      if (!meetingId) {
        return;
      }

      onJoinMeeting?.(meetingId);
    } else {
      onStartMeeting?.();
    }

    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-[480px] overflow-hidden border-white/60 bg-white/75 p-0 shadow-[0_32px_100px_-30px_rgba(170,45,125,0.45)] backdrop-blur-3xl sm:w-[calc(100vw-2rem)] dark:border-white/10 dark:bg-zinc-950/75">
        <div className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-pink-300/35 blur-3xl dark:bg-pink-500/10" />

        <div className="pointer-events-none absolute -bottom-24 -left-20 size-52 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-500/10" />

        <div className="relative w-full min-w-0 p-5 sm:p-7">
          <DialogHeader className="min-w-0 text-left">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-500 text-white shadow-lg shadow-pink-500/25">
              {isJoinMeeting ? (
                <LinkIcon className="size-5" />
              ) : (
                <VideoIcon className="size-5" />
              )}
            </div>

            <div className="mb-2 inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border border-pink-200/70 bg-pink-50/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-pink-600 dark:border-pink-500/20 dark:bg-pink-500/10 dark:text-pink-300">
              <SparklesIcon className="size-3 shrink-0" />

              <span className="min-w-0 truncate">
                {isJoinMeeting
                  ? "Connect to session"
                  : "Instant interview"}
              </span>
            </div>

            <DialogTitle className="break-words text-left text-2xl font-semibold tracking-[-0.035em]">
              {title}
            </DialogTitle>

            <DialogDescription className="max-w-sm break-words text-left leading-6">
              {isJoinMeeting
                ? "Paste the interview invitation link to enter the session."
                : "Create a new interview room and begin evaluating your candidate."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 min-w-0 space-y-5">
            {isJoinMeeting ? (
              <div className="min-w-0 space-y-2">
                <label
                  htmlFor="meeting-url"
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Interview link
                </label>

                <div className="relative min-w-0">
                  <LinkIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="meeting-url"
                    type="url"
                    inputMode="url"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Paste meeting link..."
                    value={meetingUrl}
                    onChange={(event) => setMeetingUrl(event.target.value)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        meetingUrl.trim().length > 0
                      ) {
                        handleStart();
                      }
                    }}
                    className="h-12 w-full min-w-0 rounded-xl border-white/70 bg-white/45 pl-10 pr-3 text-base shadow-inner shadow-pink-100/30 backdrop-blur-xl focus-visible:ring-pink-400/40 sm:text-sm dark:border-white/10 dark:bg-white/5"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/70 bg-white/35 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex size-2.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" />

                  <div className="min-w-0">
                    <p className="text-sm font-medium">Workspace is ready</p>

                    <p className="mt-1 break-words text-xs leading-5 text-muted-foreground">
                      A secure interview room will be generated for you and your
                      candidate.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex min-w-0 flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="h-11 w-full rounded-xl border-white/70 bg-white/30 px-5 backdrop-blur-xl hover:bg-white/60 sm:w-auto dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleStart}
                disabled={isJoinMeeting && !meetingUrl.trim()}
                className="h-11 w-full rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-5 text-white shadow-lg shadow-pink-500/20 transition-all hover:from-pink-600 hover:to-fuchsia-600 sm:w-auto"
              >
                <span className="truncate">
                  {isJoinMeeting ? "Join interview" : "Start interview"}
                </span>

                <ArrowRightIcon className="ml-2 size-4 shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingModal;