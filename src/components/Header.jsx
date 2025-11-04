import { Bot, Rocket, Github } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg">
            <Bot className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight text-gray-900">Tommy</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
          <a href="#how" className="hover:text-gray-900 transition-colors">How it works</a>
          <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Github className="h-4 w-4" />
            Source
          </a>
          <a
            href="#get"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-white shadow hover:bg-black"
          >
            <Rocket className="h-4 w-4" />
            Get the Extension
          </a>
        </div>
      </div>
    </header>
  );
}
