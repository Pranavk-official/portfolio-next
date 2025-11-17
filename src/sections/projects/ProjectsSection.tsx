'use client';

import ScrollElement from '@components/ui/scroll-animation';
import { ProjectCard } from '@components/projects/ProjectCard';
import { projects } from './config/projects';
import {
  Dialog,
  DialogTrigger,
  DialogContainer,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from '@components/ui/linear-modal';
import { Badge } from '@components/ui/badge';
import {  ExternalLink, Calendar, Code2 } from 'lucide-react';
import {SiGithub} from 'react-icons/si';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';

const ProjectsSection = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <ScrollElement
            viewport={{ amount: 0.5, margin: '0px 0px -100px 0px' }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="bg-linear-to-r from-primary to-primary/50 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A showcase of my work across web applications, mobile backends,
              developer tools, and community platforms
            </p>
          </ScrollElement>
        </div>

        {/* Projects Grid with Scroll Animations */}
        <ScrollElement
          viewport={{ amount: 0.2, margin: '0px 0px -100px 0px' }}
          className="mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              return (
                <Dialog
                  key={project.id}
                  transition={{
                    type: 'spring',
                    bounce: 0.05,
                    duration: 0.5,
                  }}
                >
                  <DialogTrigger
                    style={{ borderRadius: '12px' }}
                    className="flex w-full flex-col overflow-hidden"
                  >
                    <ProjectCard
                      title={project.title}
                      year={project.year}
                      shortDescription={project.shortDescription}
                      category={project.category}
                    />
                  </DialogTrigger>
                  <DialogContainer className="grid h-full place-items-center">
                    <DialogContent
                      style={{ borderRadius: '24px' }}
                      className="mx-auto h-fit border-4"
                    >
                      <div className="relative flex h-[85vh] w-[90vw] flex-col overflow-y-auto bg-background lg:w-[900px]">
                        <div className="p-6 md:p-8">
                          <DialogTitle className="text-4xl font-bold md:text-5xl">
                            {project.title}
                          </DialogTitle>

                          <DialogDescription
                            disableLayoutAnimation
                            variants={{
                              initial: { opacity: 0, scale: 0.8, y: -40 },
                              animate: { opacity: 1, scale: 1, y: 0 },
                              exit: { opacity: 0, scale: 0.8, y: -50 },
                            }}
                          >
                            {/* Project Meta Info */}
                            <div className="mb-6 mt-4 flex flex-wrap items-center gap-3">
                              <Badge
                                variant="outline"
                                className="border-primary/20"
                              >
                                {project.category
                                  .split('-')
                                  .join(' ')
                                  .toUpperCase()}
                              </Badge>
                              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{project.year}</span>
                              </div>
                            </div>

                            {/* Full Description */}
                            <div className="mb-6">
                              <h3 className="mb-2 text-lg font-semibold">
                                About
                              </h3>
                              <p className="leading-relaxed">
                                {project.fullDescription}
                              </p>
                            </div>

                            <Separator className="my-6" />

                            {/* Technologies */}
                            <div className="mb-6">
                              <div className="mb-3 flex items-center gap-2">
                                <Code2 className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold">
                                  Technologies Used
                                </h3>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, idx) => (
                                  <Badge key={idx} variant="secondary">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Key Features */}
                            <div className="mb-6">
                              <h3 className="mb-3 text-lg font-semibold">
                                Key Features
                              </h3>
                              <ul className="space-y-2">
                                {project.features.map((feature, idx) => (
                                  <li
                                    key={idx}
                                    className="flex gap-2 text-sm leading-relaxed"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Action Buttons */}
                            {(project.githubUrl || project.liveUrl) && (
                              <>
                                <Separator className="my-6" />
                                <div className="flex flex-wrap gap-3">
                                  {project.githubUrl && (
                                    <Button
                                      variant="default"
                                      onClick={() =>
                                        window.open(
                                          project.githubUrl,
                                          '_blank'
                                        )
                                      }
                                      className="flex items-center gap-2"
                                    >
                                      <SiGithub className="h-4 w-4" />
                                      View on GitHub
                                    </Button>
                                  )}
                                  {project.liveUrl && (
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        window.open(project.liveUrl, '_blank')
                                      }
                                      className="flex items-center gap-2"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                      Live Demo
                                    </Button>
                                  )}
                                </div>
                              </>
                            )}
                          </DialogDescription>
                        </div>
                        <DialogClose className="rounded-lg bg-primary p-4 text-primary-foreground" />
                      </div>
                    </DialogContent>
                  </DialogContainer>
                </Dialog>
              );
            })}
          </div>
        </ScrollElement>

        {/* Call to Action */}
        <ScrollElement
          viewport={{ amount: 0.5, margin: '0px 0px -100px 0px' }}
          className="mx-auto mt-20 max-w-2xl text-center"
        >
          <p className="text-lg text-muted-foreground">
            Want to see more? Check out my{' '}
            <a
              href="https://github.com/Pranavk-official"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-primary/80"
            >
              GitHub profile
              <ExternalLink className="h-4 w-4" />
            </a>
          </p>
        </ScrollElement>
      </div>
    </section>
  );
}

export default ProjectsSection;