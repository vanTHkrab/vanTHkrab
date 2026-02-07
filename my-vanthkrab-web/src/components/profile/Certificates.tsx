"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Award, ExternalLink, Calendar, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface Certificate {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  certificateImage?: string;
  isUrl?: boolean;
  category: "cloud" | "development" | "security" | "student representative" | "other";
}

const certificates: Certificate[] = [
  {
    name: "SAB of Walailak University",
    issuer: "Director of Information Technology Department",
    year: "2024 July  - 2025 February",
    certificateImage: "/assets/images/certificate/sab.png",
    category: "student representative",
  },
  {
    name: "ThaiLLM",
    issuer: "Completed a course on using LLM and connecting via API, equipping with basic AI developer skills.",
    year: "16 October 2024",
    certificateImage: "/assets/images/certificate/llm.png",
    category: "development",
  },
  {
    name: "WUSTP WEDA",
    issuer: "Completed the \"DESIGN THINKING\" course.",
    year: "27 - 28 January 2023",
    certificateImage: "/assets/images/certificate/weda.png",
    category: "development",
  },
];

const categoryColors: Record<Certificate["category"], string> = {
  cloud: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  development: "bg-green-500/10 text-green-500 border-green-500/20",
  security: "bg-red-500/10 text-red-500 border-red-500/20",
    "student representative": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  other: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export function Certificates() {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="certificates"
      ref={ref}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              Certifications & Awards
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Credentials & Achievements
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and academic achievements earned through continuous learning.
            </p>
          </div>

          {/* Certificates grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Category badge */}
                <Badge
                  className={`absolute top-4 right-4 ${categoryColors[cert.category]} border`}
                >
                  {cert.category}
                </Badge>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Award className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h4 className="font-semibold mb-2 pr-16 leading-tight">
                  {cert.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {cert.issuer}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cert.year}</span>
                  </div>
                  {cert.credentialId && (
                    <span className="font-mono truncate">{cert.credentialId}</span>
                  )}
                </div>

                {/* View Certificate Dialog */}
                {cert.certificateImage && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-0 text-xs text-primary hover:text-primary/80"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        View Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle>{cert.name}</DialogTitle>
                        <DialogDescription>
                          Issued by {cert.issuer} • {cert.year}
                          {cert.credentialId && ` • ID: ${cert.credentialId}`}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="relative w-full aspect-[1.414/1] bg-muted rounded-lg overflow-hidden">
                        {cert.isUrl ? (
                          <Image
                            src={cert.certificateImage}
                            alt={`${cert.name} Certificate`}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        ) : (
                          <Image
                            src={cert.certificateImage}
                            alt={`${cert.name} Certificate`}
                            fill
                            className="object-contain"
                          />
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
