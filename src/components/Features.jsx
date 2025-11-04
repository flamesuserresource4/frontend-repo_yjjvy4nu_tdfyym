import { Bot, Zap, Search, MousePointerClick, Globe } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "One‑word focus",
    desc: "Get answers in a single word or one clean sentence. No rabbit holes.",
  },
  {
    icon: Search,
    title: "Smart page scan",
    desc: "Understands the page you’re on to keep responses relevant and concise.",
  },
  {
    icon: Globe,
    title: "Site‑aware",
    desc: "Limit Tommy to the current site or broaden context to your allowed list.",
  },
  {
    icon: MousePointerClick,
    title: "Click & ask",
    desc: "Highlight text or ask a quick question. Tommy answers instantly.",
  },
  {
    icon: Zap,
    title: "Ultra‑lightweight",
    desc: "Designed to be fast and private. Your browsing stays on your device.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Why Tommy?</h2>
          <p className="mt-3 text-gray-600">
            A calm layer over the web that gives you just what you need.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white grid place-items-center shadow">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
