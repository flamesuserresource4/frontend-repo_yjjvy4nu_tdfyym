export default function Footer() {
  return (
    <footer className="mt-20 border-t border-black/5 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} Tommy — a minimal AI that answers in one word or one sentence.
        </p>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-gray-900">Privacy</a>
          <a href="#terms" className="hover:text-gray-900">Terms</a>
          <a href="#support" className="hover:text-gray-900">Support</a>
        </div>
      </div>
    </footer>
  );
}
