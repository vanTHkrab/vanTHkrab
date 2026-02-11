"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Download, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import GradientText from "@/components/GradientText";
import DecryptedText from "@/components/DecryptedText";
import TextType from "@/components/TextType";
import Image from "next/image";
import LightRays from "@/components/LightRays";
import LogoTechStack from "@/components/profile/logo-tech-stack";
import ShinyText from "@/components/ShinyText";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function ProfileHero() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  const downloadResumeButton = () => {
    const link = document.createElement('a');
    link.href = '/assets/private/pdf/resume.pdf';
    link.download = 'Audsadawut_Nakthungtao_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
            <LightRays
                raysOrigin="top-center"
                raysColor="#ffffff"
                raysSpeed={0.3}
                lightSpread={1}
                rayLength={1}
                followMouse={false}
                mouseInfluence={0.1}
                noiseAmount={0.2}
                distortion={0}
                className="custom-rays"
                pulsating={false}
                fadeDistance={1}
                saturation={1}
            />
        </div>

      {/* Background gradient */}
      {/*<div className="absolute inset-0 -z-10">*/}
      {/*  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />*/}
      {/*  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />*/}
      {/*  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50" />*/}
      {/*</div>*/}

       {/*Theme toggle - fixed position */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <motion.div
        variants={shouldReduceMotion ? {} : containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full flex flex-col items-center justify-center text-center z-10"
      >
        {/* Avatar placeholder */}
        <motion.div
          variants={shouldReduceMotion ? {} : itemVariants}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-border/50 flex items-center justify-center backdrop-blur-sm">
              <Image src="/assets/images/profile/mahiru.jpg" alt="Profile Picture" width={160} height={160} className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover" />
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={shouldReduceMotion ? {} : itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
        >
          <ShinyText
            text="Audsadawut Nakthungtao"
            speed={3}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={60}
            direction="left"
            yoyo={true}
            pauseOnHover={false}
            disabled={false}
          />
        </motion.h1>

        {/* Role */}
        <motion.div
          variants={shouldReduceMotion ? {} : itemVariants}
          className="mb-4 text-center"
        >
            <TextType
                text={["Full-Stack Developer", "Backend Engineer"]}
                as="h2"
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary/70"
                loop
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="_"
                deletingSpeed={50}
                cursorBlinkDuration={0.5}
            />
        </motion.div>

        {/* Tagline */}
        <motion.p
            variants={shouldReduceMotion ? {} : itemVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-6 text-center break-words">
            Building scalable backend systems and elegant interfaces.
            Passionate about distributed systems, API design, and developer experience.
        </motion.p>

        {/* Location */}
        <motion.div
          variants={shouldReduceMotion ? {} : itemVariants}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <MapPin className="w-4 h-4" />
          <span>Suratthina, Thailand</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={shouldReduceMotion ? {} : itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="min-w-[160px] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
            onClick={downloadResumeButton}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[160px] backdrop-blur-sm"
            onClick={() => scrollToSection("contact")}
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Me
          </Button>
        </motion.div>

      </motion.div>
        {/* Tech stack preview */}

        <motion.div
            variants={shouldReduceMotion ? {} : itemVariants}
            className="mt-12 max-w-1/2 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground"
        >
            <LogoTechStack />
        </motion.div>
      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
