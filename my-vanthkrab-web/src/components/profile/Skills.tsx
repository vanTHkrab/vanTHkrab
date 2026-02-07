"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number;
    years?: number;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 75, years: 2 },
      { name: "TypeScript", level: 70, years: 2 },
      { name: "NestJS", level: 65, years: 1 },
      { name: "Express.js", level: 75, years: 2 },
      { name: "Python", level: 70, years: 2 },
      { name: "Java", level: 65, years: 1 },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 75, years: 2 },
      { name: "Next.js", level: 70, years: 1 },
      { name: "HTML/CSS", level: 85, years: 3 },
      { name: "JavaScript", level: 80, years: 2 },
      { name: "Tailwind CSS", level: 75, years: 1 },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "PostgreSQL", level: 70, years: 1 },
      { name: "MySQL", level: 75, years: 2 },
      { name: "MongoDB", level: 65, years: 1 },
      { name: "Prisma ORM", level: 70, years: 1 },
    ],
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Git", level: 80, years: 2 },
      { name: "GitHub", level: 80, years: 2 },
      { name: "Docker", level: 60, years: 1 },
      { name: "Linux", level: 65, years: 1 },
      { name: "VS Code", level: 85, years: 3 },
    ],
  },
  {
    name: "Core CS & Others",
    skills: [
      { name: "Data Structures", level: 75, years: 2 },
      { name: "Algorithms", level: 70, years: 2 },
      { name: "OOP", level: 75, years: 2 },
      { name: "REST API", level: 70, years: 1 },
      { name: "Problem Solving", level: 80, years: 3 },
    ],
  },
];

export function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
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
              Skills & Expertise
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Technical Stack
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills, developed through
              coursework, projects, and self-learning.
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {category.name}
                </h4>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 * categoryIndex + 0.05 * skillIndex,
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{skill.name}</span>
                        {skill.years && (
                          <span className="text-xs text-muted-foreground">
                            {skill.years}y
                          </span>
                        )}
                      </div>
                      <Progress value={isInView ? skill.level : 0} className="h-1.5" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick badges */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Currently learning & exploring:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "System Design",
                "AWS Cloud",
                "Microservices",
                "GraphQL",
                "Testing",
                "CI/CD",
                "Redis",
                "WebSocket",
                "Design Patterns",
                "Agile",
              ].map((item) => (
                <Badge key={item} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
