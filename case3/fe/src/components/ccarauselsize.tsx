import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Testimonial } from "@/utils/type";

export function CarouselSize({ items }: { items: Testimonial[] }) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full max-w-6xl"
    >
      <CarouselContent className="px-10">
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="flex justify-center md:basis-1/2 lg:basis-1/3 p-2"
          >
            <div className="h-full border hover:border-yellow-400 bg-white rounded-lg shadow-md w-80 p-6 flex flex-col items-center">
              <img
                src={
                  `https://api.dicebear.com/9.x/micah/svg?seed=${item.name}`
                }
                alt={item.alt}
                className="w-16 h-16 object-cover rounded-full mb-3 border border-yellow-400"
              />
              <p className="text-gray-700 italic mb-2 text-center">
                {item.text}
              </p>
              <span className="font-semibold text-yellow-600">
                - {item.name}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-0 size-8 sm:size-10" />
      <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-0 size-8 sm:size-10" />
    </Carousel>
  );
}
