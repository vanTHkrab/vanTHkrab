"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Code2, Server, Cpu } from "lucide-react";

const highlights = [
  {
    icon: Server,
    title: "Backend Architecture",
    description: "Monolithic & Microservices",
  },
  {
    icon: Code2,
    title: "API Design",
    description: "RESTful & GraphQL APIs",
  },
  {
    icon: Cpu,
    title: "Performance",
    description: "Scalability & optimization",
  },
];

export function AboutMe() {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
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
              About Me
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                Passionate Backend Developer & Computer Engineering Student
            </h3>
          </div>

          {/* Main content */}
          <div className="space-y-6 text-muted-foreground leading-relaxed indent-8">
            <p>
                Highly motivated Computer Engineering student with a strong passion for backend development and scalable system
                design. Experienced with modern backend technologies, including NestJS, Laravel, microservices, and relational
                databases. Continuously learning advanced backend concepts and software engineering best practices, aiming to grow
                into a professional Software Engineer capable of building high-quality and scalable solutions.
            </p>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
