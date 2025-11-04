import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-gray-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <section id="how" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
              <ol className="mt-4 space-y-3 text-gray-700 list-decimal list-inside">
                <li>Install Tommy from the Chrome Web Store.</li>
                <li>Open any page and click the Tommy icon.</li>
                <li>Ask a question or highlight text you want summarized.</li>
                <li>Get a one‑word or one‑sentence answer instantly.</li>
              </ol>
              <div id="get" className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-3 text-white font-medium shadow hover:bg-indigo-700"
                >
                  Add to Chrome
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
