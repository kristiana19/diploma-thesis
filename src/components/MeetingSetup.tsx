import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { CameraIcon, CameraOffIcon, MicIcon, SettingsIcon, SparklesIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

function MeetingSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
  const [isCameraDisabled, setIsCameraDisabled] = useState(true);
  const [isMicDisabled, setIsMicDisabled] = useState(false);

  const call = useCall();

  useEffect(() => {
    if (!call) return;
    if (isCameraDisabled) call.camera.disable();
    else call.camera.enable();
  }, [isCameraDisabled, call]);

  useEffect(() => {
    if (!call) return;
    if (isMicDisabled) call.microphone.disable();
    else call.microphone.enable();
  }, [isMicDisabled, call]);

  if (!call) return null;

  const handleJoin = async () => {
    await call.join();
    onSetupComplete();
  };

  return (
    <main className="relative min-h-[calc(100dvh-4rem)] w-full overflow-x-clip px-3 py-6 min-[380px]:px-4 sm:px-6 sm:py-10">
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 size-[360px] rounded-full bg-pink-300/25 blur-[110px] dark:bg-pink-500/10" />
        <div className="absolute -right-40 -top-24 size-[380px] rounded-full bg-violet-300/25 blur-[120px] dark:bg-violet-500/10" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col">
        <div className="mb-5 min-w-0 sm:mb-7">
          <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/60 bg-white/45 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-pink-600 shadow-sm backdrop-blur-xl min-[380px]:text-[10px] dark:border-white/10 dark:bg-white/5 dark:text-pink-300">
            <SparklesIcon className="size-3 shrink-0" />
            <span>Environment check</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Get ready to join
          </h1>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {/* VIDEO PREVIEW */}
          <Card className="glass-panel min-w-0 border-white/60 p-4 sm:p-6 dark:border-white/10">
            <div className="mb-4 min-w-0">
              <h2 className="text-lg font-semibold sm:text-xl">Camera preview</h2>
              <p className="text-sm text-muted-foreground">Make sure you look good!</p>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/60 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
              {isCameraDisabled ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-500 text-white shadow-lg shadow-pink-500/25">
                    <CameraOffIcon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Camera is off</p>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                      video.enabled = false
                    </p>
                  </div>
                </div>
              ) : (
                <VideoPreview className="h-full w-full" />
              )}
            </div>
          </Card>

          {/* CONTROLS */}
          <Card className="glass-panel flex min-w-0 flex-col border-white/60 p-4 sm:p-6 dark:border-white/10">
            <div className="mb-4 min-w-0">
              <h2 className="text-lg font-semibold sm:text-xl">Meeting details</h2>
              <p className="break-all font-mono text-xs text-muted-foreground">{call.id}</p>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-6">
              <div className="space-y-2.5">
                <DeviceRow
                  icon={<CameraIcon className="size-4" />}
                  iconClassName="bg-pink-500/10 text-pink-500"
                  label="Camera"
                  status={isCameraDisabled ? "Off" : "On"}
                >
                  <Switch
                    checked={!isCameraDisabled}
                    onCheckedChange={(checked) => setIsCameraDisabled(!checked)}
                  />
                </DeviceRow>

                <DeviceRow
                  icon={<MicIcon className="size-4" />}
                  iconClassName="bg-fuchsia-500/10 text-fuchsia-500"
                  label="Microphone"
                  status={isMicDisabled ? "Off" : "On"}
                >
                  <Switch
                    checked={!isMicDisabled}
                    onCheckedChange={(checked) => setIsMicDisabled(!checked)}
                  />
                </DeviceRow>

                <DeviceRow
                  icon={<SettingsIcon className="size-4" />}
                  iconClassName="bg-violet-500/10 text-violet-500"
                  label="Settings"
                  status="Configure devices"
                >
                  <DeviceSettings />
                </DeviceRow>
              </div>

              <div className="space-y-3">
                <Button
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-lg shadow-pink-500/20 hover:from-pink-600 hover:to-fuchsia-600"
                  size="lg"
                  onClick={handleJoin}
                >
                  Join meeting
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Do not worry, our team is super friendly! We want you to succeed. 🎉
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

interface DeviceRowProps {
  icon: React.ReactNode;
  iconClassName: string;
  label: string;
  status: string;
  children: React.ReactNode;
}

function DeviceRow({ icon, iconClassName, label, status, children }: DeviceRowProps) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/60 bg-white/35 px-3 py-2.5 sm:px-4 sm:py-3 dark:border-white/10 dark:bg-white/5">
      <div className="flex min-w-0 items-center gap-3">
        <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg sm:size-10 ${iconClassName}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium">{label}</p>
          <p className="truncate text-xs text-muted-foreground">{status}</p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default MeetingSetup;