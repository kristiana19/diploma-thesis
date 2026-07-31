import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { CodeIcon } from "lucide-react";
import Link from "next/link";

import DasboardBtn from "./DasboardBtn";
import { ModeToggle } from "./ModeToggle";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl min-w-0 items-center justify-between gap-2 px-3 min-[380px]:px-4 sm:px-6 lg:px-8">
        {/* LEFT SIDE - LOGO */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="CodeInterview home"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/60 bg-white/35 shadow-sm backdrop-blur-xl sm:size-10 dark:border-white/10 dark:bg-white/5">
            <CodeIcon className="size-5 text-primary sm:size-6" />
          </div>

          <span className="min-w-0 truncate bg-gradient-to-r from-primary via-fuchsia-500 to-violet-500 bg-clip-text font-mono text-lg font-semibold tracking-[-0.035em] text-transparent min-[380px]:text-xl sm:text-2xl">
            CodeInterview
          </span>
        </Link>

        {/* RIGHT SIDE - ACTIONS */}
        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
          <Show when="signed-in">
            <DasboardBtn />

            <ModeToggle />

            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "size-8 rounded-full ring-2 ring-primary/30 sm:size-9",
                },
              }}
            />
          </Show>

          <Show when="signed-out">
            <ModeToggle />

            <SignInButton>
              <button
                type="button"
                className="hidden h-9 shrink-0 cursor-pointer rounded-full border border-primary/40 px-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10 min-[420px]:inline-flex min-[420px]:items-center sm:h-10 sm:px-4"
              >
                Sign In
              </button>
            </SignInButton>

            <SignUpButton>
              <button
                type="button"
                className="inline-flex h-9 shrink-0 cursor-pointer items-center rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/30 transition-opacity hover:opacity-90 sm:h-10 sm:px-5"
              >
                <span className="min-[380px]:hidden">Join</span>
                <span className="hidden min-[380px]:inline">Sign Up</span>
              </button>
            </SignUpButton>
          </Show>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;