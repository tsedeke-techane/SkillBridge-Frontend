// lib/services-config.ts
import { BookOpen, Monitor, Briefcase } from "lucide-react";
import type { ServiceConfig } from "@/types";

export const servicesConfig: ServiceConfig[] = [
  {
    key: "courses", // matches the key in your translations
    icon: BookOpen
  },
  {
    key: "training",
    icon: Monitor
  },
  {
    key: "job-opportunities",
    icon: Briefcase
  }
];