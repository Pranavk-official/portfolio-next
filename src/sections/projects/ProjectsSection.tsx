'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import ScrollElement from '@components/ui/scroll-animation';
import { projects } from './config/projects';
import {
  ProgressSlider,
  SliderContent,
  SliderWrapper,
  SliderBtn,
  SliderBtnGroup,
} from '@components/uilayouts/progressive-carousel';
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
import { ExternalLink, Calendar, Code2 } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';

const ProjectsSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current?.contains(document.activeElement)) {
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const currentIndex = projects.findIndex(
          (p) => carouselRef.current?.querySelector(`[data-project-id="${p.id}"]`)
        );

        let nextIndex: number;
        if (e.key === 'ArrowLeft') {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
        } else {
          nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
        }

        const nextSlide = carouselRef.current?.querySelector(
          `[data-project-id="${projects[nextIndex].id}"]`
        ) as HTMLElement;
        nextSlide?.focus();
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

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

        {/* Projects Progressive Carousel */}
        <div className="mx-auto max-w-6xl">
          <div
            ref={carouselRef}
            role="region"
            aria-label="Featured Projects Carousel"
            aria-live="polite"
            className="touch-pan-x"
          >
            <ProgressSlider
              duration={6000}
              fastDuration={400}
              vertical={false}
              activeSlider={projects[0]?.id || ''}
              className="h-[400px] md:h-[450px] lg:h-[500px] w-full"
            >
              <SliderContent>
                {projects.map((project, index) => (
                  <SliderWrapper key={project.id} value={project.id}>
                    <div
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${index + 1} of ${projects.length}: ${project.title}`}
                    >
                      <Dialog
                        transition={{
                          type: 'spring',
                          bounce: 0.05,
                          duration: 0.5,
                        }}
                      >
                        <DialogTrigger
                          style={{ borderRadius: '16px' }}
                          className="flex h-full w-full flex-col overflow-hidden"
                          data-project-id={project.id}
                        >
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            width={1900}
                            height={1080}
                            className="rounded-xl h-[350px] 2xl:h-[500px] w-full object-cover"
                            priority={index === 0}
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
                    </div>
                  </SliderWrapper>
                ))}
              </SliderContent>
              <SliderBtnGroup className="absolute bottom-0 left-0 right-0 w-full backdrop-blur-md bg-white/40 dark:bg-black/40 grid grid-cols-2 md:grid-cols-4 border-t border-border/50">
                {projects.map((project, index) => (
                  <SliderBtn
                    key={project.id}
                    value={project.id}
                    className={`p-4 text-left transition-all hover:bg-white/60 dark:hover:bg-black/60 ${index < projects.length - 1 ? 'border-r border-border/50' : ''
                      }`}
                  >
                    <div className="space-y-2">
                      <div className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-xs font-semibold text-primary dark:text-primary-foreground">
                        {project.title}
                      </div>
                      <p className="text-sm text-black dark:text-white line-clamp-2">
                        {project.shortDescription}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {project.technologies.slice(0, 3).join(' • ')}
                      </div>
                    </div>
                  </SliderBtn>
                ))}
              </SliderBtnGroup>
            </ProgressSlider>
          </div>
        </div>

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