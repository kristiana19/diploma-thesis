import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { CodeIcon, SparklesIcon } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DasboardBtn";

function Navbar() {
  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* LEFT SIDE - LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            <CodeIcon className="size-8 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            CodeInterview
          </span>
        </Link>

        {/* RIGHT SIDE - ACTIONS */}
        <div className="flex items-center space-x-3 ml-auto">
          <Show when="signed-in">
            <DasboardBtn />
            <ModeToggle />
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-9 rounded-full ring-2 ring-primary/40",
                },
              }}
            />
          </Show>

          <Show when="signed-out">
            <ModeToggle />
            <SignInButton>
              <button className="rounded-full font-medium text-sm h-10 px-4 border border-primary/40 text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-primary text-primary-foreground rounded-full font-medium text-sm h-10 px-5 shadow-sm shadow-primary/30 hover:opacity-90 transition-opacity cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;