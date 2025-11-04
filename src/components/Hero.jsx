import { Sparkles, Globe, Scan, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm text-indigo-700">
              <Sparkles className="h-4 w-4" />
              Meet Tommy — your one‑word web AI
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Answers in one word or one sentence.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Tommy is a lightweight Chrome extension that reads the page you’re on
              and gives crisp, focused responses. No fluff. Just the signal.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#get"
                className="inline-flex justify-center items-center rounded-xl bg-gray-900 text-white px-5 py-3 font-medium shadow hover:bg-black"
              >
                Add to Chrome
              </a>
              <a
                href="#demo"
                className="inline-flex justify-center items-center rounded-xl border border-black/10 bg-white px-5 py-3 font-medium text-gray-800 hover:bg-gray-50"
              >
                See it in action
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-700"><Scan className="h-4 w-4 text-indigo-600" /> Page scan</div>
              <div className="flex items-center gap-2 text-gray-700"><Globe className="h-4 w-4 text-indigo-600" /> Site scope</div>
              <div className="flex items-center gap-2 text-gray-700"><ShieldCheck className="h-4 w-4 text-indigo-600" /> Private</div>
            </dl>
          </div>
          <div id="demo" className="relative">
            <div className="rounded-2xl border border-black/10 bg-white shadow-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-black/5 flex items-center gap-2 text-sm text-gray-500">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2">Tommy Quick Demo</span>
              </div>
              <div className="p-6">
                <p className="text-gray-800 font-medium">Page says:</p>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  "The Amazon rainforest covers over five and a half million square kilometers and hosts a diverse ecosystem..."
                </p>
                <div className="mt-6">
                  <p className="text-gray-800 font-medium">Tommy replies:</p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-xl bg-indigo-50 text-indigo-700 px-3 py-2 text-sm">
                    <Sparkles className="h-4 w-4" />
                    Vast biodiversity.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
