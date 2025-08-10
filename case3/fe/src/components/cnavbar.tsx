import { useState } from "react";

function CNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full font-jakarta flex justify-between items-center px-4 md:px-12 py-4 bg-white border-b-2 border-gray-200 font-semibold z-50">
      <a href="/dashboard" className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="w-6 h-6" />
        <span>Crispy Bites</span>
      </a>
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span
          className={`block h-1 w-6 bg-black rounded transition-all duration-300 ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block h-1 w-6 bg-black rounded my-1 transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block h-1 w-6 bg-black rounded transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>
      <div className="hidden md:flex gap-4">
        <a href="#" className="px-4 py-1.5 hover:underline">
          Home
        </a>
        <a href="#tofu" className="px-4 py-1.5 hover:underline">
          Tofu
        </a>
        <a href="#testi" className="px-4 py-1.5 hover:underline">
          Testimonials
        </a>
        <a href="#contact" className="px-4 py-1.5 hover:underline">
          Contact
        </a>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 bg-yellow-400 rounded-md hover:bg-yellow-500"
        >
          Order Now
        </a>
      </div>
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-b-2 border-gray-200 flex flex-col gap-2 px-4 py-4 md:hidden shadow-lg animate-fade-in">
          <a
            href="#"
            className="px-4 py-2 hover:underline"
            onClick={() => setOpen(false)}
          >
            Home
          </a>
          <a
            href="#tofu"
            className="px-4 py-2 hover:underline"
            onClick={() => setOpen(false)}
          >
            Tofu
          </a>
          <a
            href="#testi"
            className="px-4 py-2 hover:underline"
            onClick={() => setOpen(false)}
          >
            Testimonials
          </a>
          <a
            href="#contact"
            className="px-4 py-2 hover:underline"
            onClick={() => setOpen(false)}
          >
            Contact
          </a>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-yellow-400 rounded-md hover:bg-yellow-500"
            onClick={() => setOpen(false)}
          >
            Order Now
          </a>
        </div>
      )}
    </nav>
  );
}

export default CNavbar;