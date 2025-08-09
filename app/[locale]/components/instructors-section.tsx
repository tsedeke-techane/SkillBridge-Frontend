"use client";
import Link from "next/link";
import { Twitter, Linkedin } from "lucide-react";
import { AnimatedCard } from "@/app/[locale]/components/ui/animated-card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/[locale]/components/ui/hover-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/[locale]/components/ui/avatar";
import { imagePaths } from "../data/image-paths";
import { SectionHeading } from "./ui/section-heading";
import "./styles/style.css";
import { useTranslations } from "next-intl";
import { instructorsConfig } from "@/lib/instructors-config";
export function InstructorsSection() {
  const t = useTranslations();
  const instructorsList = t.raw("meetHero.instructors") as Record<string, any>;

  const instructors = instructorsConfig.map((config) => {
    const translation = instructorsList[config.key] || {};
     const { name = "", title = "", description = "", socialLinks = {} } = translation;

    return {
      ...config,
      name,
      title,
      description,
      socialLinks,

    };
  });

  return (
    <section className='py-16 bg-[#F5FAFF] dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <SectionHeading
          title={t("meetHero.title")}
          subtitle={t("meetHero.subtitle")}
          center={true}
        />
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {instructors.map((instructor, index) => (
            <AnimatedCard
              key={instructor.key}
              delay={0.1 * index}
              className='bg-gray-50 dark:bg-gray-900/40 py-6 px-2 border border-[#2196f3]/30 dark:border-[#2195f355] rounded-none custom-shadow transition-transform duration-300 hover:scale-105'
            >
              <div className='text-center transition-all duration-300 hover:transform hover:scale-105'>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className='w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full cursor-pointer'>
                      <Avatar className='w-32 h-32'>
                        <AvatarImage
                          src={
                            instructor.image || imagePaths.placeholders.avatar
                          }
                          alt={instructor.name}
                          className='w-full h-full object-cover transition-transform duration-500 hover:scale-110'
                        />
                        <AvatarFallback className='text-2xl'>
                          {instructor.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className='w-80'>
                    <div className='flex justify-between space-x-4'>
                      <Avatar className='w-12 h-12'>
                        <AvatarImage
                          src={
                            instructor.image || imagePaths.placeholders.avatar
                          }
                        />
                        <AvatarFallback>
                          {instructor.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='space-y-1 text-left'>
                        <h4 className='text-sm font-semibold'>
                          {instructor.name }                       </h4>
                        <p className='text-sm text-blue-500'>
                          {instructor.title}
                        </p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                          {instructor.description}
                        </p>
                        <div className='flex items-center pt-2'>
                          {instructor.socialLinks?.twitter && (
                            <Link
                              href={instructor.socialLinks.twitter}
                              className='text-gray-400 hover:text-blue-500 transition-colors duration-300 mr-2'
                            >
                              <Twitter size={14} />
                            </Link>
                          )}
                          {instructor.socialLinks?.linkedin && (
                            <Link
                              href={instructor.socialLinks.linkedin}
                              className='text-gray-400 hover:text-blue-500 transition-colors duration-300'
                            >
                              <Linkedin size={14} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <h3 className='font-bold text-lg mb-1 dark:text-white'>
                  {instructor.name}
                </h3>
                <p className='text-blue-500 font-medium text-sm mb-2'>
                  {instructor.title}
                </p>
                <p className='text-gray-600 dark:text-gray-400 text-sm mb-3'>
                  {instructor.description}
                </p>
                <div className='flex justify-center gap-3'>
                  {instructor.socialLinks?.twitter && (
                    <Link
                      href={instructor.socialLinks.twitter}
                      className='text-gray-400 hover:text-blue-500 transition-colors duration-300'
                    >
                      <Twitter size={16} />
                    </Link>
                  )}
                  {instructor.socialLinks?.linkedin && (
                    <Link
                      href={instructor.socialLinks.linkedin}
                      className='text-gray-400 hover:text-blue-500 transition-colors duration-300'
                    >
                      <Linkedin size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
