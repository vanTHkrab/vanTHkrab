"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Trophy, Star } from "lucide-react";

type TimelineType = "education" | "career" | "achievement" | "milestone" | "develop" | "other";

interface TimelineItem {
  type: TimelineType;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    type: "develop",
    year: "2025 – Present",
    title: "AI-based Image Analysis System for Digital BP Monitors",
    subtitle: "Research & Development Project",
    description:
      "Developed a mobile BP monitoring system using computer vision, OCR, and scalable microservices.",
  },
  {
    type: "develop",
    year: "July 2025 – November 2025",
    title: "Backend Developer Intern",
    subtitle: "Sunwav Co. (WFH)",
    description:
      "Built secure backend systems with Laravel 12, REST APIs, RBAC, and admin dashboards with React.",
  },
  {
    type: "milestone",
    year: "July 2024 – February 2025",
    title: "Student Administrative Board (SAB)",
    subtitle: "Walailak University",
    description:
      "Served as a student representative supporting IT initiatives and system development.",
  },
  {
    type: "achievement",
    year: "16 October 2024",
    title: "ThaiLLM",
    subtitle: "LLM & API Integration Course",
    description:
      "Completed training on using Large Language Models and API integration for AI applications.",
  },
  {
    type: "achievement",
    year: "2024",
    title: "E-Commerce Platform (FunnyCraft)",
    subtitle: "Full-stack Web Application",
    description:
      "Built a full-stack e-commerce platform with Next.js, NestJS, Prisma, and PostgreSQL.",
  },
  {
    type: "achievement",
    year: "2024",
    title: "Mini Smart-Farm",
    subtitle: "IoT-based Monitoring System",
    description:
      "Developed a smart farm web app for real-time monitoring and IoT device control.",
  },
  {
    type: "milestone",
    year: "2023 – Present",
    title: "Personal Website",
    subtitle: "Portfolio & Personal Branding",
    description:
      "Created a responsive portfolio website using Next.js, Tailwind CSS, and Framer Motion.",
  },
  {
    type: "achievement",
    year: "27–28 January 2023",
    title: "WUSTP WEDA",
    subtitle: "Design Thinking Program",
    description:
      "Completed a design thinking program focused on ideation and problem-solving skills.",
  },
  {
    type: "education",
    year: "2022 – Present",
    title: "B.Sc. in Engineering and Technology",
    subtitle: "Walailak University",
    description:
      "Studying Computer Engineering and Artificial Intelligence.",
  },
  {
    type: "education",
    year: "2021",
    title: "High School Diploma",
    subtitle: "Thepmitsuksa School",
    description:
      "Completed Science-Mathematics program with focus on advanced math and sciences.",
  },
  {
    type: "develop",
    year: "2021",
    title: "First Project",
    description:
      "Built a herbal information website using HTML, CSS, JavaScript, and Bootstrap.",
  },
];


const typeConfig: Record<
  TimelineType,
  { icon: typeof GraduationCap; color: string }
> = {
  education: {
    icon: GraduationCap,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  },
  career: {
    icon: Briefcase,
    color: "bg-green-500/10 text-green-500 border-green-500/30",
  },
  achievement: {
    icon: Trophy,
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  },
  milestone: {
    icon: Star,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  },
  develop: {
    icon: Star,
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
  },
  other: {
    icon: Star,
    color: "bg-gray-500/10 text-gray-500 border-gray-500/30",
  },
};

export function Timeline() {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="timeline"
      ref={ref}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              Timeline
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Career Highlights
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones and achievements throughout my professional journey.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-border" />

            {/* Timeline items */}
            <div className="space-y-8">
              {timelineItems.map((item, index) => {
                const config = typeConfig[item.type];
                const Icon = config.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={`${item.year}-${item.title}`}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className={`relative flex items-start gap-4 sm:gap-8 ${
                      isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Year badge (mobile) */}
                    <div className="sm:hidden absolute left-0 top-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center">
                      <span className="text-[10px] font-bold text-muted-foreground">
                        {item.year.slice(-2)}
                      </span>
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 pl-12 sm:pl-0 ${
                        isEven ? "sm:text-right sm:pr-8" : "sm:text-left sm:pl-8"
                      }`}
                    >
                      {/* Year (desktop) */}
                      <span className="hidden sm:inline-block text-sm font-semibold text-primary mb-1">
                        {item.year}
                      </span>

                      {/* Card */}
                      <div
                        className={`p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm inline-block ${
                          isEven ? "sm:ml-auto" : "sm:mr-auto"
                        } text-left max-w-sm`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center border`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{item.title}</h4>
                            {item.subtitle && (
                              <p className="text-xs text-muted-foreground">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Center dot (desktop) */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background" />

                    {/* Spacer for alignment */}
                    <div className="hidden sm:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
