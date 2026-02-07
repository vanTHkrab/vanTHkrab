"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import {
    ProfileHero,
    AboutMe,
    Skills,
    Experience,
    Projects,
    Certificates,
    Timeline,
    Contact,
    Education,
} from "@/components/profile";
import {BackendBeam} from "@/components/profile/BackendBeam";

// Lazy load the heavy canvas component
const BackendCanvas = dynamic(
  () => import("@/components/profile/BackendCanvas").then((mod) => mod.BackendCanvas),
  {
      ssr: false,
      loading: () => (
        <div className="py-20 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">
                Loading visualization...
            </div>
        </div>
      ),
  }
);

// Section wrapper with scroll-triggered animation
function Section({
                     children,
                     className = "",
                     id,
                 }: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        id={id}
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className={className}
      >
          {children}
      </motion.div>
    );
}

// Footer component
function ProfileFooter() {
    return (
      <footer className="py-8 px-4 border-t border-border/50">
          <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Audsadawut Nakthungtao. Built with Next.js, Tailwind
                  CSS, Frame Motion, and other modern web technologies.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                  Designed with attention to detail and a passion for clean code.
              </p>
          </div>
      </footer>
    );
}

export default function ProfilePage() {
    return (
      //    make grid background with tailwindcss
      <main className="min-h-screen w-full bg-background text-foreground overflow-x-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
          {/* Hero Section */}
          <ProfileHero />

          {/* About Section */}
          <Section id="about">
              <AboutMe />
          </Section>

          {/* Skills Section */}
          <Section id="skills">
              <Skills />
          </Section>

          {/* Experience Section */}
          <Section id="experience">
              <Experience />
          </Section>

          {/* Education Section */}
          <Section id="education">
              <Education />
          </Section>

          {/* Projects Section */}
          <Section id="projects">
              <Projects />
          </Section>

          {/* Certificates Section */}
          <Section id="certificates">
              <Certificates />
          </Section>

          {/* Timeline Section */}
          <Section id="timeline">
              <Timeline />
          </Section>

          {/* Contact Section */}
          <Section id="contact">
              <Contact />
          </Section>

          {/*/!* Canvas Section - Lazy loaded *!/*/}
          {/*<Suspense*/}
          {/*  fallback={*/}
          {/*      <div className="py-20 flex items-center justify-center">*/}
          {/*          <div className="animate-pulse text-muted-foreground">*/}
          {/*              Loading visualization...*/}
          {/*          </div>*/}
          {/*      </div>*/}
          {/*  }*/}
          {/*>*/}
          {/*    <Section className="relative h-100 md:h-150 lg:h-100">*/}
          {/*        /!*<BackendCanvas />*!/*/}
          {/*        <BackendBeam />*/}
          {/*    </Section>*/}
          {/*</Suspense>*/}

          {/* Footer */}
          <ProfileFooter />
      </main>
    );
}