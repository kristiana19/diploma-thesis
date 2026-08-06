"use client";

import ActionCard from "@/components/ActionCard";
import MeetingModal from "@/components/MeetingModal";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import {
  ArrowRightIcon,
  BrainCircuitIcon,
  CheckIcon,
  Code2Icon,
  Loader2Icon,
  MicIcon,
  ShieldCheckIcon,
  SparklesIcon,
  VideoIcon,
} from "lucide-react";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingCard from "@/components/MeetingCard";

export default function Home() {
  const router = useRouter();
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();

  const { isInterviewer, isLoading } = useUserRole();
  const interviews = useQuery(
    api.interviews.getMyInterviews,
    isSignedIn ? {} : "skip",
  );

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">("start");

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;

      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;

      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  if (!isAuthLoaded || (isSignedIn && isLoading)) {
    return (
      <main className="fixed inset-0 flex items-center justify-center px-4">
        <div className="glass-panel relative flex min-w-72 items-center justify-center gap-2 rounded-2xl px-12 py-3">
          <Loader2Icon className="size-5 shrink-0 animate-spin text-primary" />

          <span className="text-center text-sm text-muted-foreground">
            Loading your workspace...
          </span>
        </div>
      </main>
    );
  }

  if (!isSignedIn) {
    return <LandingPage />;
  }

  return (
    <main className="relative min-h-[calc(100dvh-4rem)] w-full overflow-x-clip lg:h-[calc(100dvh-4rem)] lg:min-h-0 lg:overflow-hidden">
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 size-[360px] rounded-full bg-pink-300/25 blur-[110px] sm:size-[430px] dark:bg-pink-500/10" />

        <div className="absolute -right-40 -top-24 size-[380px] rounded-full bg-violet-300/25 blur-[120px] sm:size-[460px] dark:bg-violet-500/10" />

        <div className="absolute -bottom-72 left-1/3 size-[500px] rounded-full bg-fuchsia-200/30 blur-[130px] dark:bg-fuchsia-500/10" />
      </div>

      <div className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col px-3 py-3 min-[380px]:px-4 sm:px-6 sm:py-5 lg:h-full lg:min-h-0 lg:px-8">
        {isInterviewer ? (
          <>
            {/* INTERVIEWER HERO */}
            <section className="glass-panel relative w-full min-w-0 shrink-0 overflow-hidden rounded-[1.4rem] p-4 min-[380px]:p-5 sm:rounded-[2rem] sm:p-7 lg:p-8">
              <div className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-gradient-to-br from-pink-300/35 to-violet-300/20 blur-3xl" />

              <div className="relative grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="min-w-0 max-w-3xl">
                  <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/60 bg-white/45 px-3 py-2 text-[9px] font-medium text-foreground/75 shadow-sm backdrop-blur-xl min-[380px]:text-[10px] sm:px-3.5 sm:text-xs dark:border-white/10 dark:bg-white/5">
                    <span className="relative flex size-2 shrink-0">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-60" />

                      <span className="relative inline-flex size-2 rounded-full bg-pink-500" />
                    </span>

                    <span className="min-w-0 truncate font-mono tracking-[0.08em] sm:tracking-[0.12em]">
                      AI_INTERVIEW_WORKSPACE
                    </span>
                  </div>

                  <h1 className="min-w-0 text-[2rem] font-semibold leading-[1.04] tracking-[-0.045em] text-foreground min-[380px]:text-[2.25rem] sm:text-5xl lg:text-[3.15rem] lg:leading-[1.02]">
                    <span className="block">Technical interviews,</span>

                    <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent sm:hidden">
                      powered by
                    </span>

                    <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent sm:hidden">
                      intelligence.
                    </span>

                    <span className="hidden bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent sm:block">
                      powered by intelligence.
                    </span>
                  </h1>

                  <p className="mt-4 max-w-2xl break-words text-sm leading-6 text-muted-foreground sm:text-base">
                    Conduct technical interviews, review candidate performance
                    and transform every conversation into structured,
                    context-aware insights.
                  </p>

                  <div className="mt-5 grid w-full min-w-0 gap-2 sm:flex sm:flex-wrap">
                    <div className="hero-chip w-full justify-start sm:w-auto">
                      <BrainCircuitIcon className="size-4 shrink-0 text-pink-500" />
                      <span className="min-w-0 break-words">
                        AI-assisted evaluation
                      </span>
                    </div>

                    <div className="hero-chip w-full justify-start sm:w-auto">
                      <ShieldCheckIcon className="size-4 shrink-0 text-violet-500" />
                      <span className="min-w-0 break-words">
                        Structured candidate reports
                      </span>
                    </div>

                    <div className="hero-chip w-full justify-start sm:w-auto">
                      <SparklesIcon className="size-4 shrink-0 text-fuchsia-500" />
                      <span className="min-w-0 break-words">
                        Context-aware analysis
                      </span>
                    </div>
                  </div>
                </div>

                {/* ANALYSIS PANEL */}
                <div className="hidden w-[260px] shrink-0 lg:block">
                  <div className="rounded-[1.6rem] border border-white/65 bg-white/35 p-3 shadow-[0_24px_70px_-28px_rgba(157,53,120,0.4)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
                    <div className="rounded-[1.2rem] border border-white/60 bg-white/55 p-4 dark:border-white/10 dark:bg-black/10">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex gap-1.5">
                          <span className="size-2.5 rounded-full bg-pink-400" />
                          <span className="size-2.5 rounded-full bg-fuchsia-300" />
                          <span className="size-2.5 rounded-full bg-violet-300" />
                        </div>

                        <span className="font-mono text-[10px] text-muted-foreground">
                          analysis.ts
                        </span>
                      </div>

                      <div className="space-y-2 font-mono text-[11px] leading-5">
                        <p>
                          <span className="text-fuchsia-500">const</span>{" "}
                          candidate ={" "}
                          <span className="text-violet-500">analyze</span>
                          ();
                        </p>

                        <p className="pl-3 text-muted-foreground">
                          technicalScore:{" "}
                          <span className="text-pink-500">92</span>,
                        </p>

                        <p className="pl-3 text-muted-foreground">
                          communication:{" "}
                          <span className="text-pink-500">88</span>,
                        </p>

                        <p className="pl-3 text-muted-foreground">
                          recommendation:{" "}
                          <span className="text-emerald-600">
                            &quot;strong&quot;
                          </span>
                        </p>

                        <div className="mt-3 h-px bg-gradient-to-r from-transparent via-pink-300/60 to-transparent" />

                        <p className="pt-1 text-muted-foreground">
                          <span className="text-fuchsia-500">return</span>{" "}
                          structuredReport;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK ACTIONS HEADER */}
            <section className="mb-3 mt-5 flex shrink-0 flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  Quick actions
                </p>

                <h2 className="break-words text-xl font-semibold tracking-tight">
                  What would you like to do?
                </h2>
              </div>

              <span className="break-all font-mono text-[10px] text-muted-foreground sm:shrink-0 sm:text-xs">
                workspace.status = &quot;ready&quot;
              </span>
            </section>

            {/* ACTION CARDS */}
            <section className="grid w-full min-w-0 flex-1 auto-rows-[175px] grid-cols-1 gap-4 pb-5 sm:auto-rows-[185px] md:grid-cols-2 lg:min-h-0 lg:auto-rows-fr lg:grid-cols-4 lg:pb-0">
              {QUICK_ACTIONS.map((action, index) => (
                <ActionCard
                  key={action.title}
                  action={action}
                  index={index}
                  onClick={() => handleQuickAction(action.title)}
                />
              ))}
            </section>

            <MeetingModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={
                modalType === "join"
                  ? "Join an interview"
                  : "Start a new interview"
              }
              isJoinMeeting={modalType === "join"}
            />
          </>
        ) : (
          <>
            {/* CANDIDATE HERO */}
            <section className="glass-panel relative w-full min-w-0 shrink-0 overflow-hidden rounded-[1.4rem] p-4 min-[380px]:p-5 sm:rounded-[2rem] sm:p-8 lg:p-9">
              <div className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-gradient-to-br from-pink-300/35 to-violet-300/20 blur-3xl" />

              <div className="relative grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="min-w-0 max-w-2xl">
                  <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/60 bg-white/45 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground shadow-sm backdrop-blur-xl min-[380px]:text-[10px] sm:tracking-[0.18em] dark:border-white/10 dark:bg-white/5">
                    <span className="relative flex size-2 shrink-0">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-50" />

                      <span className="relative inline-flex size-2 rounded-full bg-pink-500" />
                    </span>

                    <span className="min-w-0 truncate">
                      Candidate workspace
                    </span>
                  </div>

                  <h1 className="min-w-0 text-[2rem] font-semibold leading-[1.04] tracking-[-0.045em] min-[380px]:text-[2.25rem] sm:text-5xl lg:text-[3.15rem] lg:leading-[1.02]">
                    <span className="block">Your technical</span>

                    <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
                      interview journey.
                    </span>
                  </h1>

                  <p className="mt-4 max-w-xl break-words text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    Access your scheduled interviews, prepare your environment
                    and join each session with everything ready.
                  </p>

                  <div className="mt-5 grid w-full min-w-0 gap-2 sm:flex sm:flex-wrap">
                    <div className="hero-chip w-full justify-start sm:w-auto">
                      <VideoIcon className="size-4 shrink-0 text-pink-500" />
                      <span className="min-w-0 break-words">
                        Video interview
                      </span>
                    </div>

                    <div className="hero-chip w-full justify-start sm:w-auto">
                      <Code2Icon className="size-4 shrink-0 text-violet-500" />
                      <span className="min-w-0 break-words">
                        Live coding environment
                      </span>
                    </div>

                    <div className="hero-chip w-full justify-start sm:w-auto">
                      <ShieldCheckIcon className="size-4 shrink-0 text-fuchsia-500" />
                      <span className="min-w-0 break-words">
                        Secure session
                      </span>
                    </div>
                  </div>
                </div>

                {/* CANDIDATE READINESS PANEL */}
                <div className="w-full min-w-0 lg:w-[285px] lg:shrink-0">
                  <div className="w-full rounded-[1.35rem] border border-white/65 bg-white/35 p-2.5 shadow-[0_24px_70px_-28px_rgba(157,53,120,0.4)] backdrop-blur-2xl sm:rounded-[1.6rem] sm:p-3 dark:border-white/10 dark:bg-white/5">
                    <div className="w-full rounded-[1rem] border border-white/60 bg-white/55 p-3.5 sm:rounded-[1.2rem] sm:p-4 dark:border-white/10 dark:bg-black/10">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex shrink-0 gap-1.5">
                          <span className="size-2.5 rounded-full bg-pink-400" />
                          <span className="size-2.5 rounded-full bg-fuchsia-300" />
                          <span className="size-2.5 rounded-full bg-violet-300" />
                        </div>

                        <span className="min-w-0 truncate pl-3 font-mono text-[10px] text-muted-foreground">
                          readiness.ts
                        </span>
                      </div>

                      <div className="mb-4 flex flex-col gap-3 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
                        <div className="min-w-0">
                          <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground sm:text-[10px]">
                            Interview status
                          </p>

                          <p className="mt-1 text-sm font-medium">
                            Environment check
                          </p>
                        </div>

                        <div className="flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50/70 px-2.5 py-1 text-[10px] font-medium text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          Ready
                        </div>
                      </div>

                      <div className="grid min-w-0 gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
                        <ReadinessItem
                          icon={<VideoIcon className="size-4" />}
                          label="Camera"
                          iconClassName="bg-pink-500/10 text-pink-500"
                        />

                        <ReadinessItem
                          icon={<MicIcon className="size-4" />}
                          label="Microphone"
                          iconClassName="bg-fuchsia-500/10 text-fuchsia-500"
                        />

                        <ReadinessItem
                          icon={<Code2Icon className="size-4" />}
                          label="Code editor"
                          iconClassName="bg-violet-500/10 text-violet-500"
                        />
                      </div>

                      <div className="mt-4 overflow-hidden border-t border-pink-200/40 pt-3 font-mono text-[10px] text-muted-foreground dark:border-white/10">
                        <span className="text-fuchsia-500">const</span> ready ={" "}
                        <span className="text-emerald-600">true</span>;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

           {/* CANDIDATE INTERVIEWS */}
            <section className="mt-5 flex min-h-0 w-full min-w-0 flex-1 flex-col pb-5 lg:pb-0">
              <div className="mb-3 flex shrink-0 flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                    Upcoming sessions
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Your interviews
                  </h2>
                </div>

                <span className="break-all font-mono text-[10px] text-muted-foreground sm:shrink-0 sm:text-xs">
                  candidate.status = &quot;ready&quot;
                </span>
              </div>

              {interviews === undefined ? (
              <div className="glass-panel flex min-h-[210px] w-full flex-1 items-center justify-center rounded-[1.4rem] sm:rounded-[2rem]">
                <Loader2Icon className="size-7 animate-spin text-primary" />
              </div>
              ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {interviews.map((interview) => (
        <MeetingCard
          key={interview._id}
          interview={interview}
        />
      ))}
    </div>
  ) : (
    <div className="glass-panel flex min-h-[210px] w-full flex-1 items-center justify-center rounded-[1.4rem] px-5 py-8 text-center sm:rounded-[2rem]">
      <div className="min-w-0">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-white/70 bg-white/50 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <SparklesIcon className="size-6 text-primary" />
        </div>

        <h3 className="font-semibold">
          No interviews scheduled
        </h3>

        <p className="mt-2 break-words text-sm text-muted-foreground">
          Your upcoming interviews will appear here.
        </p>
      </div>
    </div>
  )}
</section>
          </>
        )}
      </div>
    </main>
  );
}

function LandingPage() {
  return (
    <main className="relative min-h-[calc(100dvh-4rem)] w-full overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 size-[380px] rounded-full bg-pink-300/25 blur-[120px] dark:bg-pink-500/10" />
        <div className="absolute -right-40 -top-20 size-[440px] rounded-full bg-violet-300/25 blur-[130px] dark:bg-violet-500/10" />
        <div className="absolute bottom-0 left-1/3 size-[440px] rounded-full bg-fuchsia-200/30 blur-[130px] dark:bg-fuchsia-500/10" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl flex-col px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        <section className="flex flex-1 flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-pink-200/70 bg-white/55 px-3 py-2 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <span className="size-2 shrink-0 rounded-full bg-pink-500" />
              <span className="truncate font-mono text-[10px] tracking-[0.1em] text-muted-foreground sm:text-xs">
                A smarter way to interview
              </span>
            </div>

            <h1 className="mt-6 max-w-2xl text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.055em] min-[390px]:text-5xl sm:text-6xl lg:text-[4.45rem]">
              <span className="block">Technical</span>
              <span className="block">interviews,</span>
              <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text pb-1 text-transparent">
                made human.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Live video, collaborative coding, and thoughtful AI feedback—so
              you can focus on what matters: real conversations and real
              potential.
            </p>

            <div className="mt-7 flex w-full flex-col gap-3 min-[420px]:w-auto min-[420px]:flex-row">
              <SignUpButton>
                <button
                  type="button"
                  className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 text-sm font-medium text-white shadow-[0_16px_35px_-16px_rgba(236,72,153,0.8)] transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  Get started
                  <ArrowRightIcon className="size-4" />
                </button>
              </SignUpButton>

              <a
                href="#features"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-pink-300/70 bg-white/45 px-6 text-sm font-medium shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/70 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
              >
                Learn more
              </a>
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              Already have an account?{" "}
              <SignInButton>
                <button
                  type="button"
                  className="cursor-pointer font-medium text-primary underline-offset-4 hover:underline"
                >
                  Sign in
                </button>
              </SignInButton>
            </p>
          </div>

          <LandingInterviewPreview />
        </section>

        <section
          id="features"
          className="glass-panel mt-12 grid scroll-mt-24 overflow-hidden rounded-[1.4rem] sm:grid-cols-3 sm:rounded-[1.75rem] lg:mt-10"
        >
          <LandingFeature
            icon={<VideoIcon className="size-5" />}
            title="Live collaboration"
            description="Face-to-face conversations with shared coding in real time."
          />
          <LandingFeature
            icon={<Code2Icon className="size-5" />}
            title="Run code instantly"
            description="A built-in editor with results available while you code."
          />
          <LandingFeature
            icon={<SparklesIcon className="size-5" />}
            title="Structured AI feedback"
            description="Actionable insights for clearer and fairer decisions."
          />
        </section>

        <p className="mt-6 text-center font-mono text-[10px] text-muted-foreground sm:text-xs">
          ♡ Built for fairer, clearer technical interviews.
        </p>
      </div>
    </main>
  );
}

function LandingInterviewPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[610px] min-w-0 lg:flex-1">
      <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-pink-300/20 to-violet-300/20 blur-2xl" />

      <div className="relative rounded-[1.5rem] border border-white/70 bg-white/35 p-3 shadow-[0_28px_80px_-34px_rgba(157,53,120,0.55)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-4 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center justify-between gap-3 border-b border-pink-200/40 px-1 pb-3 dark:border-white/10">
          <div className="flex min-w-0 items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
            <span className="truncate font-mono text-[9px] text-muted-foreground sm:text-[11px]">
              Live interview&nbsp;&nbsp; 00:24:18
            </span>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-white/60 text-fuchsia-500 dark:bg-white/5">
              <VideoIcon className="size-3.5" />
            </div>
            <div className="flex size-8 items-center justify-center rounded-lg bg-white/60 text-fuchsia-500 dark:bg-white/5">
              <MicIcon className="size-3.5" />
            </div>
          </div>
        </div>

        <div className="mt-3 flex min-w-0 flex-col gap-3 sm:flex-row">
          <div className="relative flex min-h-48 items-end overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-violet-100 via-pink-50 to-fuchsia-100 p-3 sm:w-[36%] sm:shrink-0 dark:border-white/10 dark:from-violet-950/40 dark:via-pink-950/20 dark:to-fuchsia-950/30">
            <div className="absolute inset-x-0 top-5 flex justify-center sm:top-7">
              <div className="relative size-28 overflow-hidden rounded-full border-4 border-white/80 bg-white/40 shadow-[0_12px_30px_-12px_rgba(126,34,206,0.55)] ring-2 ring-fuchsia-300/35 sm:size-32 dark:border-white/15 dark:bg-white/5">
                <Image
                  src="/candidate.png"
                  alt="Candidate in a live technical interview"
                  fill
                  priority
                  quality={100}
                  sizes="128px"
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="relative flex w-full items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-[10px] font-medium shadow-sm backdrop-blur-md dark:bg-black/25">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Candidate
            </div>
          </div>

          <div className="relative min-w-0 flex-1 rounded-2xl border border-white/60 bg-white/60 p-3 dark:border-white/10 dark:bg-black/10 sm:min-h-[270px]">
            <div className="mb-3 flex items-center justify-between border-b border-pink-100 pb-2 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-violet-100 px-2 py-1 font-mono text-[9px] font-semibold text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                  JS
                </span>
                <span className="font-mono text-[10px] font-medium">two-sum.js</span>
              </div>
              <span className="font-mono text-[9px] text-fuchsia-600">▶ Run</span>
            </div>

            <div className="overflow-hidden font-mono text-[9px] leading-5 sm:text-[10px] sm:leading-6">
              <p><span className="mr-3 text-muted-foreground/50">1</span><span className="text-fuchsia-500">function</span> twoSum(nums, target) &#123;</p>
              <p><span className="mr-3 text-muted-foreground/50">2</span>&nbsp;&nbsp;<span className="text-fuchsia-500">const</span> seen = <span className="text-violet-500">new Map</span>();</p>
              <p><span className="mr-3 text-muted-foreground/50">3</span>&nbsp;&nbsp;<span className="text-fuchsia-500">for</span> (let i = 0; i &lt; nums.length; i++) &#123;</p>
              <p><span className="mr-3 text-muted-foreground/50">4</span>&nbsp;&nbsp;&nbsp;&nbsp;const need = target - nums[i];</p>
              <p><span className="mr-3 text-muted-foreground/50">5</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-fuchsia-500">if</span> (seen.has(need)) &#123;</p>
              <p><span className="mr-3 text-muted-foreground/50">6</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-fuchsia-500">return</span> [seen.get(need), i];</p>
              <p><span className="mr-3 text-muted-foreground/50">7</span>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</p>
              <p><span className="mr-3 text-muted-foreground/50">8</span>&nbsp;&nbsp;&#125;</p>
              <p><span className="mr-3 text-muted-foreground/50">9</span>&#125;</p>
            </div>

            <div className="mt-4 rounded-xl border border-pink-100 bg-white/85 p-3 shadow-sm dark:border-white/10 dark:bg-background/85 sm:absolute sm:-bottom-4 sm:left-3 sm:right-3 sm:mt-0">
              <div className="flex items-start gap-2">
                <BrainCircuitIcon className="mt-0.5 size-4 shrink-0 text-fuchsia-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold">AI insight</p>
                  <p className="mt-1 text-[9px] leading-4 text-muted-foreground sm:text-[10px]">
                    Efficient hashmap approach with optimal complexity.
                  </p>
                </div>
                <CheckIcon className="size-5 shrink-0 rounded-full bg-emerald-500 p-1 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LandingFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function LandingFeature({ icon, title, description }: LandingFeatureProps) {
  return (
    <div className="flex min-w-0 items-start gap-4 border-b border-pink-200/40 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 dark:border-white/10">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/15 to-violet-500/15 text-fuchsia-500">
        {icon}
      </div>
      <div className="min-w-0">
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

interface ReadinessItemProps {
  icon: React.ReactNode;
  label: string;
  iconClassName: string;
}

function ReadinessItem({
  icon,
  label,
  iconClassName,
}: ReadinessItemProps) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/60 bg-white/35 px-3 py-2.5 dark:border-white/10 dark:bg-white/5">
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
        >
          {icon}
        </div>

        <span className="min-w-0 truncate text-xs font-medium">{label}</span>
      </div>

      <CheckIcon className="size-4 shrink-0 text-emerald-500" />
    </div>
  );
}