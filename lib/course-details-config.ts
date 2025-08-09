import { imagePaths } from "@/app/[locale]/data/image-paths";

// course-details-config.ts
export const courseDetailsConfig: Record<string, { 
  image: string;
  instructorImage: string;
}> = {
   "web-development-bootcamp": {
      image: imagePaths.courses.webDevelopment,
      instructorImage: imagePaths.instructors.instructor1
   },
  "machine-learning-python-r": { // This should match your course slug
    image: imagePaths.courses.machineLearning,
    instructorImage: imagePaths.instructors.instructor2
  },
  "complete-digital-marketing": { // Match your course slug
    image: imagePaths.courses.design,
    instructorImage: imagePaths.instructors.instructor2
  },
  // Add all your courses here
};