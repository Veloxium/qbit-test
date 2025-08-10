import { CarouselSize } from "@/components/ccarauselsize";
import { CarouselPlugin } from "@/components/ccarousel";
import CNavbar from "@/components/cnavbar";
import { fetcher } from "@/utils/fetcher";
import type { Product, Slide, Testimonial } from "@/utils/type";
import useSWR from "swr";

const ImgSlide: Slide[] = [
  {
    id: 1,
    img: "/background.png",
  },
  {
    id: 2,
    img: "/products-1.png",
  },
  {
    id: 3,
    img: "/products-2.png",
  },
  {
    id: 4,
    img: "/products-3.png",
  },
];

function Home() {
  const { data: products, error: productsError } = useSWR<Product[]>(
    `${import.meta.env.VITE_API_BASE}/products`,
    fetcher
  );

  const { data: testimonials, error: testimonialsError } = useSWR<
    Testimonial[]
  >(`${import.meta.env.VITE_API_BASE}/testimonials`, fetcher);

  if (productsError || testimonialsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Failed to load data
        </h2>
        <p className="text-gray-700">
          Please try refreshing the page or check your connection.
        </p>
      </div>
    );
  }

  return (
    <div>
      <CNavbar />
      <section>
        <div className="w-full flex justify-center items-center p-6">
          <div className="relative bg-black/30 h-[80svh] w-[90svw] rounded-md flex justify-center items-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full object-cover -z-10">
              <CarouselPlugin items={ImgSlide} />
            </div>
            <div className="px-2 text-white flex flex-col justify-center items-center gap-4 text-center max-w-5xl">
              <p className="text-4xl md:text-5xl max-w-3xl text-center font-bold">
                Enjoy Crispy & Delicious Fried Tofu from Our!
              </p>
              <p className="md:text-lg md:font-semibold text-center">
                Experience the perfect blend of crispiness. Made with natural
                ingredients and a secret recipe, it's a treat you won't forget.
              </p>
              <a
                href="#order"
                className="text-black font-semibold px-6 py-2 bg-yellow-400 rounded-md hover:bg-yellow-500"
              >
                Order Now!
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="tofu">
        <div className="relative min-h-[70svh] w-full flex justify-center items-center px-6">
          <img
            src="/icon-1.png"
            alt="icon-1"
            className="float-animate-1 absolute left-10 top-4 md:top-10 w-22 md:w-28 -rotate-25"
          />
          <img
            src="/icon-1.png"
            alt="icon-1"
            className="float-animate-2 absolute left-20 bottom-4 md:bottom-10 w-12 md:w-16 -rotate-10"
          />
          <img
            src="/icon-2.png"
            alt="icon-2"
            className="float-animate-3 absolute ml-20 bottom-10 w-28 -rotate-25"
          />
          <img
            src="/icon-3.png"
            alt="icon-3"
            className="float-animate-1 absolute right-6 md:right-20 top-28 w-30 md:w-38 -rotate-25"
          />
          <img
            src="/icon-3.png"
            alt="icon-3"
            className="float-animate-2 absolute mr-20 top-26 w-10 md:w-12 -rotate-25"
          />
          <div className="max-w-5xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Our Fried Tofu Shop
            </h2>
            <p className="text-lg">
              Discover the best fried tofu in town! Our tofu is made with love
              and care, ensuring every bite is crispy and delicious. Perfect for
              a snack or a meal, our fried tofu is sure to satisfy your
              cravings.
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-center text-3xl font-bold mb-4 mt-10">
          Product Menu
        </h2>
        <div className="flex flex-wrap justify-center gap-8 py-8">
          {products?.map((product, index) => (
            <div
              key={index}
              className="border hover:border-yellow-400 bg-white rounded-lg shadow-md w-72 flex flex-col items-center p-6"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4 text-center">
                {product.description}
              </p>
              <span className="text-lg font-bold text-yellow-600 mb-4">
                {product.price}
              </span>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md transition">
                Order Now
              </button>
            </div>
          ))}
        </div>
      </section>
      <section id="testi">
        <h2 className="text-center text-3xl font-bold mb-4 mt-10">
          Testimonials
        </h2>
        <div className="flex justify-center w-full py-8 relative">
          <CarouselSize items={testimonials || []} />
        </div>
      </section>
      <section id="contact">
        <div className="min-h-[80svh] flex flex-col md:flex-row p-10 justify-center gap-8 items-center">
          <div>
            <img
              src="/icon-4.png"
              alt="icon"
              className="w-[200px] md:w-[340px]"
            />
          </div>
          <div>
            <h2 className="text-center text-3xl font-bold mb-4">
              Contact for Order
            </h2>
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg text-center">
                Ready to order? Contact us via WhatsApp or Instagram below!
              </p>
              <div className="flex flex-col md:flex-row gap-6 mt-4">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-md flex items-center gap-2 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/mchfrnnda_/"
                  target="_blank"
                  className="bg-pink-500 hover:bg-pink-600 px-8 py-3 rounded-md text-white font-semibold flex items-center gap-2 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                    <path d="M16.5 7.5v.01" />
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full bg-black/90 text-white py-6 mt-12">
        <div className="px-4 md:px-12 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-1">
              <img src="/logo-wt.svg" alt="logo" className="w-6 h-6" />
              <span className="font-bold text-lg">Crispy Bites</span>
            </div>
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
