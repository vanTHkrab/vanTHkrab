"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {Mail, Github, Linkedin, Send, MapPin, FacebookIcon} from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "Email",
    href: "mailto:audsadawut.nak@gmail.com",
    icon: Mail,
    label: "audsadawut.nak@gmail.com",
  },
  {
    name: "GitHub",
    href: "https://github.com/vanTHkrab",
    icon: Github,
    label: "@vanTHkrab",
  },
];

export function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Section header */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              Contact
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Let&apos;s Connect
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              I&apos;m always open to discussing new opportunities, interesting projects, or just
              having a chat about technology.
            </p>
          </div>

          {/* Location */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span>Based in Surat Thani, Thailand • Available for Remote Work Or in Bangkok, Thailand</span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <Button
              size="lg"
              className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
              asChild
            >
              <a href="mailto:audsadawut.nak@gmail.com">
                <Send className="w-4 h-4 mr-2" />
                Send me an email
              </a>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Or find me on these platforms:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/50 transition-all group w-full sm:w-auto"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">{link.name}</p>
                    <p className="text-sm font-medium">{link.label}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Availability status */}
          {/*<motion.div*/}
          {/*  initial={shouldReduceMotion ? {} : { opacity: 0 }}*/}
          {/*  animate={isInView ? { opacity: 1 } : {}}*/}
          {/*  transition={{ duration: 0.5, delay: 0.8 }}*/}
          {/*  className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20"*/}
          {/*>*/}
          {/*  <span className="relative flex h-2 w-2">*/}
          {/*    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />*/}
          {/*    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />*/}
          {/*  </span>*/}
          {/*  <span className="text-sm text-green-600 dark:text-green-400">*/}
          {/*    Currently available for new opportunities*/}
          {/*  </span>*/}
          {/*</motion.div>*/}
        </motion.div>
      </div>
    </section>
  );
}
