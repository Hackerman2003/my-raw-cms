"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  date: string;
  coverImage: string;
  stack: string[];
  outcome: string;
  excerpt: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
      className="group"
    >
      <Link href={`/studio/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gray-100">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--vermilion)]/20 to-[var(--teal-green)]/20 flex items-center justify-center">
              <span className="text-4xl text-[var(--vermilion)]">◆</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="primary"
              size="sm"
              className="w-full"
            >
              View Project
              <ExternalLink size={16} className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-[var(--neutral-text)]">
            <span>{project.client}</span>
            <span>•</span>
            <span>{project.date}</span>
          </div>

          <h3 className="text-xl font-bold text-[var(--anchor-dark)] group-hover:text-[var(--vermilion)] transition-colors">
            {project.title}
          </h3>

          <p className="text-[var(--neutral-text)] line-clamp-2">
            {project.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
            {project.stack.length > 3 && (
              <Badge variant="muted">+{project.stack.length - 3}</Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
