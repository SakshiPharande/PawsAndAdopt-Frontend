import React from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useCarousel } from "../hooks/useCarousel";

interface Slide {
  image: string;
  title: string;
  description: string;
  altText: string;
}

const slides: Slide[] = [
    {
        image: "/images/banner.png",
        title: "Find Your Perfect Companion",
        description: "Every pet deserves a loving home",
        altText: "Golden retriever puppy looking at camera"
    },
    {
        image: "/images/banner5.png",
        title: "Adopt, Don't Shop",
        description: "Give a rescued pet a second chance at happiness",
        altText: "Cat playing with toys"
    },
    {
        image: "/images/banner2.jpeg",
        title: "Adopt, Don't Shop",
        description: "Give a rescued pet a second chance at happiness",
        altText: "Cat playing with toys"
    },
];

const Banner: React.FC = () => {
  const { currentIndex, setCurrentIndex } = useCarousel(slides.length);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-rose-100">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent 
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`, 
            transition: "transform 0.5s ease-in-out" 
          }}>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative h-[400px] md:h-[500px] lg:h-[550px] flex-shrink-0 w-full">
              {/* Image with overlay */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={slide.image} 
                  alt={slide.altText} 
                  className="w-full h-full object-cover object-center" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 z-10 max-w-4xl">
                <div className="flex items-center mb-4 text-amber-300">
                  <Heart className="mr-2" size={28} />
                  <span className="text-sm md:text-base font-medium uppercase tracking-wider">
                    Loving Pets Adoption
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white border-none px-6">
                    Adopt Now
                  </Button>
                </div>
              </div>
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

export default Banner;