import { QuickActionType } from "@/constants";
import { ArrowUpRightIcon } from "lucide-react";
import { Card } from "./ui/card";

interface ActionCardProps {
  action: QuickActionType;
  onClick: () => void;
  index: number;
}

const cardStyles = [
  {
    glow: "from-pink-400/30 via-fuchsia-300/15 to-transparent",
    icon: "bg-pink-500 text-white shadow-pink-500/25",
    label: "LIVE_SESSION",
    number: "01",
  },
  {
    glow: "from-fuchsia-300/25 via-pink-200/15 to-transparent",
    icon:
      "bg-white/65 text-fuchsia-600 shadow-fuchsia-500/10 dark:bg-white/10 dark:text-fuchsia-300",
    label: "INVITATION",
    number: "02",
  },
  {
    glow: "from-violet-300/25 via-indigo-200/15 to-transparent",
    icon:
      "bg-white/65 text-violet-600 shadow-violet-500/10 dark:bg-white/10 dark:text-violet-300",
    label: "CALENDAR",
    number: "03",
  },
  {
    glow: "from-rose-300/25 via-orange-100/15 to-transparent",
    icon:
      "bg-white/65 text-rose-600 shadow-rose-500/10 dark:bg-white/10 dark:text-rose-300",
    label: "ARCHIVE",
    number: "04",
  },
];

function ActionCard({ action, onClick, index }: ActionCardProps) {
  const style = cardStyles[index] ?? cardStyles[0];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={[
        "group glass-card relative h-full min-h-0 w-full min-w-0 cursor-pointer overflow-hidden rounded-[1.4rem]",
        "border-white/65 bg-white/35 p-0 shadow-none backdrop-blur-2xl",
        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        "active:scale-[0.985]",
        "sm:rounded-[1.75rem]",
        "supports-hover:hover:-translate-y-1",
        "supports-hover:hover:border-pink-300/70",
        "supports-hover:hover:shadow-[0_28px_70px_-32px_rgba(190,58,135,0.48)]",
        "dark:border-white/10 dark:bg-white/[0.045]",
      ].join(" ")}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.glow} opacity-80 transition-all duration-500 supports-hover:group-hover:scale-110 supports-hover:group-hover:opacity-100`}
      />

      <div className="pointer-events-none absolute -right-4 -top-6 font-mono text-[70px] font-semibold leading-none text-foreground/[0.035] transition-transform duration-500 sm:-right-5 sm:-top-8 sm:text-[86px] supports-hover:group-hover:-translate-x-2 supports-hover:group-hover:translate-y-2 dark:text-white/[0.035]">
        {style.number}
      </div>

      <div className="relative flex h-full min-h-0 w-full min-w-0 flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div
            className={[
              "flex size-11 shrink-0 items-center justify-center rounded-2xl sm:size-12",
              "shadow-lg transition-transform duration-300",
              "supports-hover:group-hover:scale-110",
              "supports-hover:group-hover:-rotate-3",
              style.icon,
            ].join(" ")}
          >
            <action.icon className="size-5" />
          </div>

          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/35 opacity-70 backdrop-blur-xl transition-all duration-300 supports-hover:group-hover:translate-x-0.5 supports-hover:group-hover:-translate-y-0.5 supports-hover:group-hover:opacity-100 dark:border-white/10 dark:bg-white/5">
            <ArrowUpRightIcon className="size-4" />
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-1.5 truncate font-mono text-[9px] uppercase tracking-[0.18em] text-primary/80 sm:mb-2 sm:text-[10px] sm:tracking-[0.2em]">
            {style.label}
          </div>

          <h3 className="break-words text-lg font-semibold tracking-[-0.025em] transition-colors supports-hover:group-hover:text-primary sm:text-xl">
            {action.title}
          </h3>

          <p className="mt-1 break-words text-sm leading-5 text-muted-foreground sm:mt-1.5 sm:leading-6">
            {action.description}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-pink-500 via-fuchsia-400 to-violet-400 transition-transform duration-500 sm:inset-x-6 supports-hover:group-hover:scale-x-100" />
    </Card>
  );
}

export default ActionCard;