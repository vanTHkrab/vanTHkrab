"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  status: "current" | "completed";
  gpa?: string;
  relevantCourses: string[];
  achievements: string[];
}

const education: Education[] = [
  {
    institution: "Walailak University",
    degree: "Bachelor of Engineering and Technology",
    field: "Computer Engineering and Artificial Intelligence",
    location: "Nakhon Si Thammarat, Thailand",
    period: "2022 - Present",
    status: "current",
    gpa: "3.82",
      relevantCourses: [
          "Computer Programming",
          "Algorithmic Problem Solving",
          "Data Structures",
          "Object-Oriented Programming",

          "Digital Circuits and Logic Design",
          "Circuit and Engineering Electronics",
          "Computer Architecture and Operating Systems",

          "Software Requirements and Object-Oriented Analysis and Design",
          "Web Design and Development",
          "Mobile Device Application Development",

          "Database System Design",
          "Data Warehousing and Data Mining",
          "Data Manipulation and Transformation",

          "Machine Learning",
          "Deep Learning",
      ],
    achievements: [
      "Currently a third-year student with a GPAX of 3.69.",
    ],
  },
  {
    institution: "Thepmitsuksa School",
    degree: "High School",
    field: "Science-Mathematics",
    location: "Surat Thani, Thailand",
    period: "2016 - 2021",
    status: "completed",
    relevantCourses: [
        "Advanced Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
    ],
    achievements: [
    ],
  },
];

export function Education() {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="education"
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
              Education
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Academic Background
            </h3>
            <p className="text-muted-foreground max-w-2xl">
              My educational journey in Computer Engineering and continuous learning.
            </p>
          </div>

          {/* Education items */}
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={`${edu.institution}-${edu.period}`}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * index }}
              >
                <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold">{edu.degree}</h4>
                        <p className="text-primary font-medium mt-0.5">
                          {edu.field}
                        </p>
                        <p className="text-muted-foreground text-sm mt-1">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={edu.status === "current" ? "default" : "secondary"}
                      className="w-fit"
                    >
                      {edu.status === "current" ? "In Progress" : "Completed"}
                    </Badge>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ml-13">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>GPA: {edu.gpa}/4.00</span>
                      </div>
                    )}
                  </div>

                  {/* Achievements */}
                  {edu.achievements.length > 0 && (
                    <div className="mb-4 ml-13">
                      <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        Achievements
                      </h5>
                      <ul className="space-y-1.5">
                        {edu.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Relevant Courses */}
                  {edu.relevantCourses.length > 0 && (
                    <div className="ml-13">
                      <h5 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        Relevant Coursework
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevantCourses.map((course) => (
                          <Badge key={course} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
