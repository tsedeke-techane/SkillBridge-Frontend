"use client";

import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/[locale]/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/[locale]/components/ui/carousel";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { SectionHeading } from "./ui/section-heading";
import { useTranslations } from "next-intl";
import { TestimonialsConfig } from "@/lib/testimonial-config";
import { imagePaths } from "../data/image-paths";

export function TestimonialsSection() {
  const t = useTranslations();
    const testimonialsData = t.raw("testimonials.testimonies") as Record<string, { name:string; title: string; testimonial: string }>;
  
    const testimonials = TestimonialsConfig.map(config => ({
      ...config,
      name: testimonialsData[config.key]?.name || "",
      title: testimonialsData[config.key]?.title || "",
      testimonial: testimonialsData[config.key]?.testimonial || ""
    }));

  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const totalSlides = testimonials.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = () => {
          const nextButton = carouselRef.current?.querySelector(
            "[data-carousel-next]"
          ) as HTMLButtonElement;

          if (nextButton) {
            nextButton.click();
            setActiveIndex((prev) => (prev + 1) % totalSlides);
          }
        };

        if (entry.isIntersecting && !hovered) {
          intervalRef.current = setInterval(next, 3000);
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      },
      { threshold: 0.5 }
    );

    if (carouselRef.current) observer.observe(carouselRef.current);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      observer.disconnect();
    };
  }, [hovered, totalSlides]);

  const handleMouseEnter = () => {
    setHovered(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  

  return (
    <section
      className='py-24 px-12 bg-[#F6F6F6] dark:bg-gray-900/60'
      ref={carouselRef}
    >
      <div className='container mx-auto'>
        <SectionHeading title={t("testimonials.title")} subtitle={t("testimonials.subtitle")} center={true} />
        <div className='mx-auto flex px-8'>
          <div className='relative w-full'>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className='w-full'
            >
              <CarouselContent
                data-carousel-content
                className='flex mb-6'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={testimonial.key + index}
                    className='md:basis-1/2 lg:basis-1/3'
                  >
                    <div className='bg-transparent hover:scale-105 h-full transition-all duration-300 group'>
                      <div className='py-6 px-2'>
                        <div className='flex flex-col items-center text-center'>
                          <div className='flex flex-col justify-center items-center bg-white group-hover:bg-[#2196f3] transition-colors duration-300 dark:bg-gray-900/40 dark:group-hover:bg-gray-800 pt-4 pb-12 px-6 gap-4 shadow-sm'>
                            <BiSolidQuoteAltLeft className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 min-[1710px]:w-24 min-[1710px]:h-24 text-[#E5E8EA]' />
                            <p className='text-[#646464] group-hover:text-white dark:text-gray-300 italic relative z-10 font-montserrat text-base 2xl:text-lg'>
                              {testimonial.testimonial}
                            </p>
                          </div>
                          <Avatar className='w-10 h-10 md:w-14 md:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 -mt-8 mb-4'>
                            <AvatarImage
                              src={
                                testimonial.image ||
                                imagePaths.placeholders.avatar
                              }
                              alt={testimonial.name}
                            />
                            <AvatarFallback>
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className='font-bold text-base lg:text-lg 2xl:text-xl mb-1 text-[#646464] group-hover:text-[#2396F3]'>
                            {testimonial.name}
                          </h3>
                          <p className='text-[#646464] dark:text-gray-400 text-xs lg:text-sm 2xl:text-base mb-4'>
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Vertically Centered Arrows */}
              <div className='absolute top-1/2 left-0 -translate-y-1/2 z-10'>
                <CarouselPrevious data-carousel-prev />
              </div>
              <div className='absolute top-1/2 right-0 -translate-y-1/2 z-10'>
                <CarouselNext data-carousel-next />
              </div>
            </Carousel>

            {/* Dot-style Pagination */}
            <div className='flex justify-center mt-4 gap-2'>
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex
                      ? "bg-[#2196f3]"
                      : "bg-gray-300 dark:bg-gray-600"
                  } transition-all duration-300`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
