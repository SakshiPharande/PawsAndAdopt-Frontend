import React from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useCarousel } from "../hooks/useCarousel";

interface Slide {
  image: string;
  altText: string;
}

const slides: Slide[] = [
    {
        image: "/images/banner6.png",
        altText: "image1"
    },
    {
        image: "/images/banner4.png",
        altText: "image2"
    },
    {
        image: "/images/banner5.png",
        altText: "image3"
    },
];

const QuotesBanner: React.FC = () => {
  const { currentIndex, setCurrentIndex } = useCarousel(slides.length);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#E4D3E7] to-[#D1B0D2]">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent 
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`, 
            transition: "transform 0.5s ease-in-out" 
          }}>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative flex-shrink-0 w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={slide.image} 
                    alt={slide.altText} 
                    className="w-full h-full object-cover object-center" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>               
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <CarouselPrevious 
            className="bg-white/30 hover:bg-white/50 text-white border-none" 
            onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
          />
          <CarouselNext 
            className="bg-white/30 hover:bg-white/50 text-white border-none" 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default QuotesBanner;