import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

function HomePage() {
  return (
    <div className="h-screen bg-base-100 text-base flex">
      {/* LEFT SIDE */}
      <div className="flex flex-1 flex-col p-8 lg:p-12 relative overflow-hidden">
        {/* NAVBAR */}
        <nav className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" className="w-15 h-15 object-contain" alt="WaveChat Logo" />
            <span className="text-2xl font-bold">WaveChat</span>
          </div>

          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <button className="px-5 py-2.5 text-sm font-medium text-base-content/50 hover:text-base-content transition">
                Sign in
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="btn gap-2 bg-linear-to-r from-amber-500 to-orange-500 text-sm font-semibold rounded-full hover:opacity-90 shadow-lg shadow-orange-500/25 border-none">
                Get Started
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </SignUpButton>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col justify-center max-w-xl relative z-10">
          {/* Tag */}
          <div className="mb-8">
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight font-mono">
            Messaging for
            <br />
            <span className="bg-linear-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              everyone
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-base-content/70 leading-relaxed max-w-md">
            Fast, seamless messaging with real-time chats, instant delivery, and a smooth modern experience. Stay connected anytime, anywhere.
          </p>

          {/* CTA BTNS */}
          <div className="mt-10 flex items-center gap-4">
            <SignUpButton mode="modal">
              <button className="group flex items-center gap-3 px-8 py-4 bg-base-100 text-base-content font-semibold rounded-2xl hover:bg-base-200 transition">
                Start chatting
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignUpButton>

            <SignInButton mode="modal">
              <button className="px-8 py-4 text-base-content/60 font-semibold hover:text-base-content transition">
                I have an account
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">


        {/* Image Container */}
        <div className="relative z-10 flex items-center justify-center">
          <img src="/auth.png" alt="Chat illustration" className="w-80 xl:w-125 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
export default HomePage;