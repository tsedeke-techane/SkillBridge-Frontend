"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/[locale]/components/ui/card";
import { Button } from "@/app/[locale]/components/ui/button";
import { Badge } from "@/app/[locale]/components/ui/badge";
import { Input } from "@/app/[locale]/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/[locale]/components/ui/tabs";
import { Star, Search, Filter, ArrowUpRight, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import { Navbar } from "../components/navbar";
import { AnimatedCard } from "@/app/[locale]/components/ui/animated-card";
import Footer from "@/app/[locale]/components/footer";
import { useTranslations } from "next-intl"; // or your i18n library
import { coursesConfig } from "@/lib/course-config-for-course-page";
import { fetchCategories, fetchCourses } from "@/lib/apI";

export default function CoursesPage() {
  const t = useTranslations();
  // const coursePage = t.raw("courses") as any;
  const courseCategory = t.raw("coursePage") as any;
  // const categories = courseCategory.categories;

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState(
    t("coursePage.allCategory")
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    const loadingCourses = async () => {
      try {
        const data = await fetchCourses();
        const mergedCourses = data.map((course: any) => ({
          ...course,
          ...coursesConfig[course.id], // Merging with coursesConfig for images
          categoryName: course.category.name,
          description: course.shortDescription,
          rating: course.rating || 0,
          reviews: course.reviews || 0,

          instructor: course.instructor?.name,
          image: course.imageUrl || coursesConfig[course.id]?.image,
          instructorImage:
            course.instructor.imageUrl ||
            coursesConfig[course.id]?.instructorImage,
        }));
        setCourses(mergedCourses);

        const uniqueCategories = [
          ...new Set(data.map((course: any) => course.category.name)),
        ];
        setCategories([t("coursePage.allCategory"), ...uniqueCategories]);

        // const categoriesData = await fetchCategories();
        // const categoryNames = categoriesData.map((category: any) => category.name);
        // setCategories(categoryNames);
      } catch (coursesError) {
        setError(t("coursePage.fetchError"));
        console.log("Error fetching courses:", error);
        setError(
          coursesError instanceof Error
            ? coursesError.message
            : t("coursePage.fetchError")
        );
      } finally {
        setLoading(false);
      }
    };
    loadingCourses();
  }, [t]);

  // Then use mergedCourses instead of coursePage in your filtering/sorting:
  const filteredCourses = courses.filter((course: any) => {
    const matchesCategory =
      activeCategory === "ሁሉም" ||
      activeCategory === "All" ||
      course.categoryName === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort courses based on selected option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular") return b.reviews - a.reviews;
    if (sortBy === "newest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

    return 0;
  });

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[...Array(6)].map((_, i) => (
            <Card key={i} className='animate-pulse'>
              <div className='h-48 bg-gray-200 rounded-t-lg'></div>
              <CardContent className='space-y-4 pt-4'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                <div className='h-4 bg-gray-200 rounded'></div>
                <div className='h-4 bg-gray-200 rounded w-5/6'></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <h1 className='text-2xl font-bold mb-4'>{error}</h1>
        <Button onClick={() => window.location.reload()}>
          {t("coursePage.retry")}
        </Button>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className='container mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-16 py-12 2xl:pb-20'>
        <div className=' mb-8'>
          <h1 className='text-3xl font-bold mb-4'>{courseCategory.explore}</h1>
          <p className='text-gray-600 max-w-3xl'>
            {courseCategory.description}
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-6 mb-8'>
          <div className='w-full md:w-2/3'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <Input
                type='search'
                placeholder={courseCategory.searchPlaceholder}
                className='pl-10'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className='w-full md:w-1/3 flex gap-2'>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='popular'>{t("coursePage.sort")}</SelectItem>
                <SelectItem value='newest'>{t("coursePage.newest")}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant='outline' size='icon'>
              <Filter className='h-4 w-4' />
              <span className='sr-only'>{t("coursePage.filter")}</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue={t("coursePage.allCategory")} className='mb-8'>
          <TabsList className='flex flex-wrap h-auto mb-4'>
            {categories.map((category: string) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className='mb-2'
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category: string) => (
            <TabsContent key={category} value={category} className='mt-0'>
              {sortedCourses.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {sortedCourses.map((course, index) => (
                    <AnimatedCard key={course.id} delay={0.1 * index}>
                      <Card className='flex overflow-hidden border-none shadow-[2px_2px_15px_rgba(0,0,0,0.2)] dark:bg-gray-900/40 transition-all duration-300 hover:shadow-xl gap-2 h-full '>
                        <CardHeader className='px-4'>
                          <div className='relative'>
                            <img
                              src={course.image}
                              alt={course.title}
                              className='w-full h-[200px] 2xl:h-[250px] object-cover rounded-sm'
                            />
                            <div className='absolute bottom-4 left-4'>
                              <Badge
                                variant='outline'
                                className='bg-gray-500/80 text-white font-medium px-3 py-1 flex items-center gap-1 rounded-[6px] border-none'
                              >
                                <Clock className='h-4 w-4' />
                                <span>{course.duration}</span>
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className='px-4'>
                          {/* Category */}
                          <p className='text-sky-500 font-medium text-xs md:text-sm lg:text-base  2xl:text-lg mb-1'>
                            {course.categoryName}
                          </p>

                          {/* Title with Arrow */}
                          <div className='flex justify-between items-start my-2'>
                            <h2 className='text-base sm:text-lg lg:text-xl  2xl:text-2xl font-bold text-gray-900 dark:text-gray-50'>
                              {course.title}
                            </h2>
                            <ArrowUpRight className='h-4 w-4 lg:h-5 lg:w-5 2xl:w-6 2xl:h-6 text-gray-700 dark:text-gray-300' />
                          </div>

                          {/* Description */}
                          <p className='text-gray-600 mb-4 dark:text-gray-400 text-sm md:text-base 2xl:text-lg'>
                            {course.description}
                          </p>

                          {/* Rating */}
                          <div className='flex items-center mb-5'>
                            <span className='text-base md:text-lg font-semibold text-gray-800 mr-2 dark:text-gray-200'>
                              {course.rating}
                            </span>
                            <div className='flex mr-2'>
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-4 w-4 lg:h-5 lg:w-5 2xl:w-6 2xl:h-6 ${
                                      i < Math.floor(course.rating)
                                        ? "text-amber-400"
                                        : "text-gray-300"
                                    }`}
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                  >
                                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                  </svg>
                                ))}
                            </div>
                            <span className='text-gray-500 text-sm md:text-base '>
                              ({course.reviews})
                            </span>
                          </div>
                        </CardContent>

                        <CardFooter className='px-4 py-4 flex gap-3'>
                          {/* View Details Button */}
                          <Button
                            variant='outline'
                            className='flex-1 border-2 border-cyan-400 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 font-medium rounded-full bg-transparent'
                            asChild
                          >
                            <Link href={`/courses/${course.id}`}>
                              {t("topCoursesHeading.details")}
                            </Link>
                          </Button>

                          {/* Enroll Now Button */}
                          <Button className='flex-1 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full'>
                            <Link
                              href={`/courses/${course.id}/ApplicationForm`}
                            >
                              {t("topCoursesHeading.enrollNow")}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </AnimatedCard>
                  ))}
                </div>
              ) : (
                <div className='text-center py-12'>
                  <p className='text-gray-500'>{t("coursePage.noCourse")}</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />
    </>
  );
}
