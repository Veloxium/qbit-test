import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { Slide } from "@/utils/type";
export function CarouselPlugin({ items }: { items: Slide[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <Carousel plugins={[plugin.current]} className="w-full h-full">
      <CarouselContent className="h-full">
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className="h-full flex items-center justify-center"
          >
            <img
              src={item.img}
              className="w-full h-full object-cover rounded-md"
              alt={item.img}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

