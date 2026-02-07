"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Building2, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  type: "full-time" | "contract" | "freelance" | "student representative";
  webUrl?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    company: "Sunwav Co.",
    role: "Backend Developer Intern",
    location: "WFH",
    period: "July 2025 - November 2025",
    type: "freelance",
    description:
      "Music Label Internal Management System (Sunwav)",
    achievements: [
      "Designed and developed backend architecture using\n" +
      "Laravel 12 for internal management workflows. Built an\n" +
      "admin dashboard with React and shadcn/ui for managing\n" +
      "artists and operational data. Implemented secure APIs,\n" +
      "database design, and role-based access control.",
    ],
    technologies: ["Laravel", "React", "Tailwind CSS", "Mysql", "Git"],
    webUrl: "https://partners.sunwavdigital.com/login",
  },
  {
    company: "SAB of Walailak University",
    role: "Director of Information Technology Department",
    location: "Walailak University",
    period: "May 2024 - February 2025",
    type: "student representative",
    description:
      "Leading development of club website and helping organize coding workshops.",
    achievements: [
      "Developed backend systems for student council election\n" +
      "platforms and internal university websites using PHP and\n" +
      "Laravel. Responsible for backend design and API\n" +
      "development, with occasional support in Frontend\n" +
      "implementation.",
    ],
    technologies: ["PHP", "Laravel", "Bootstrap", "Tailwind CSS", "Mysql", "Git"],
  },
];

export function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              Work Experience
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                Journey
            </h3>
            <p className="text-muted-foreground max-w-2xl">
                A summary of my professional experiences, showcasing my roles,
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 * index }}
                  className="relative pl-8 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-8 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background" />

                  {/* Content card */}
                  <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h4 className="text-xl font-semibold">{exp.role}</h4>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      <Badge
                        variant={exp.type === "full-time" ? "default" : "secondary"}
                        className="w-fit"
                      >
                        {exp.type}
                      </Badge>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-primary mt-1.5">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {exp.webUrl && (
                      <div className="mt-4">
                        <a
                          href={exp.webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
