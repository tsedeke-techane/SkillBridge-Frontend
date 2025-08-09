import { imagePaths } from "@/app/[locale]/data/image-paths";

export const coursesConfig: Record<number, { image: string; instructorImage: string }> = {
   1: {
      image: imagePaths.courses.webDevelopment,
      instructorImage: imagePaths.instructors.instructor1
   },
  2: {
    image: imagePaths.courses.machineLearning,
    instructorImage: imagePaths.instructors.instructor2
  },
  3: {
    image: imagePaths.courses.design,
    instructorImage: imagePaths.instructors.instructor3
  },
   4: {
      image: imagePaths.courses.webDevelopment,
      instructorImage: imagePaths.instructors.instructor1
   },
   5: {
      image: imagePaths.courses.design,
      instructorImage: imagePaths.instructors.instructor2
   },
   6: {
      image: imagePaths.courses.machineLearning,
      instructorImage: imagePaths.instructors.instructor3
   },
};