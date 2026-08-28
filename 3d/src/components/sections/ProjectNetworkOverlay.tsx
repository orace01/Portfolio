import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { PROJECTS } from "@/lib/constants";
import { GlassPanel, TagPill } from "@/components/ui/Glass";
import { useProjectModal } from "@/context/ProjectModalContext";

const ProjectNetworkOverlay = forwardRef<HTMLDivElement>(function ProjectNetworkOverlay(
  _props,
  ref
) {
  const { openProject } = useProjectModal();

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex flex-col gap-4 overflow-y-auto px-5 pb-6 pt-24 sm:px-8 md:block md:overflow-visible md:px-0 md:pt-0"
    >
      {PROJECTS.map((project) => {
        const style = {
          "--x": `${project.position.left}%`,
          "--y": `${project.position.top}%`,
        } as CSSProperties;

        return (
          <button
            key={project.slug}
            type="button"
            onClick={() => openProject(project.slug)}
            data-anim="card"
            style={style}
            className="block w-full text-left md:absolute md:left-[var(--x)] md:top-[var(--y)] md:w-72"
          >
            <GlassPanel
              accent="electric"
              className="group p-5 transition-colors hover:border-[#00E5FF]/50"
            >
              <h3 className="text-base font-semibold text-white">{project.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/55">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-[#00E5FF] opacity-70 transition-opacity group-hover:opacity-100">
                View case study →
              </span>
            </GlassPanel>
          </button>
        );
      })}
    </div>
  );
});

export default ProjectNetworkOverlay;
