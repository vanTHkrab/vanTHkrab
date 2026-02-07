"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  image?: string;
}

const projects: Project[] = [
  {
    title: "AI-based Image Analysis System for Low-cost Digital Blood Pressure Monitors",
    description: "Mobile-based blood pressure monitoring with AI",
    longDescription:
      "Designed and developed a mobile-based blood pressure monitoring system with computer vision and OCR to detect vital values from digital BP monitors. Built scalable backend architecture using microservices and asynchronous communication for data processing, real-time validation, and health record management.",
    technologies: ["Computer Vision", "OCR", "Microservices", "Mobile Development", "Real-time Processing"],
    // github: "https://github.com",
    featured: true,
  },
  {
    title: "E-Commerce (FunnyCraft)",
    description: "Full-stack e-commerce application",
    longDescription:
      "Developed a full-stack e-commerce application using Next.js 15 and NestJS with Prisma ORM. Implemented core features including product management, shopping cart, orders, and user authentication.",
    technologies: ["Next.js 15", "NestJS", "Prisma", "PostgreSQL", "TypeScript"],
    github: "https://github.com/vanTHkrab/E-commerce-FunnyCraft",
    // demo: "https://demo.com",
    featured: true,
  },
  {
    title: "Mini Smart-Farm",
    description: "IoT-based smart farm monitoring system",
    longDescription:
      "Developed a full-stack smart farm web app using Next.js 15, TypeScript, and Prisma for real-time monitoring of environmental data and remote control of farm devices.",
    technologies: ["Next.js 15", "TypeScript", "Prisma"],
    github: "https://github.com/vanTHkrab/Mini-Smartfarm",
    // demo: "https://demo.com",
    featured: true,
  },
  {
    title: "Personal Website",
    description: "Responsive my personal with animations",
    longDescription:
      "My personal website built with Next.js, Tailwind CSS, and Framer Motion to showcase my projects and skills with a modern design and smooth animations.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "other"],
    github: "https://github.com/vanTHkrab/vanTHkrab",
    demo: "https://vanthkrab.com",
    featured: false,
  },
];

export function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              Projects
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured Work
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of academic and personal projects showcasing my development skills.
            </p>
          </div>

          {/* Featured projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                        <Folder className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex gap-2">
                        {project.github && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            asChild
                          >
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="View source on GitHub"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {project.demo && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            asChild
                          >
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="View live demo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.longDescription}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Other projects */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-center">
              Other Notable Projects
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + 0.1 * index,
                  }}
                >
                  <Card className="h-full group hover:border-primary/50 transition-colors bg-card/30 backdrop-blur-sm border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <Folder className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="flex gap-1">
                          {project.github && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              asChild
                            >
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View source on GitHub"
                              >
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-base">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs text-muted-foreground"
                          >
                            {tech}
                            {project.technologies.indexOf(tech) <
                              Math.min(2, project.technologies.length - 1) && " •"}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
