import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { PROJECTS } from "@/lib/constants";
import { GlassPanel, TagPill, ExpandHint } from "@/components/ui/Glass";
import { useFocusMode } from "@/context/FocusModeContext";

const ProjectNetworkOverlay = forwardRef<HTMLDivElement>(function ProjectNetworkOverlay(
  _props,
  ref
) {
  const { openFocus } = useFocusMode();

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex flex-col gap-4 overflow-y-auto px-5 pb-6 pt-24 sm:px-8 md:block md:overflow-visible md:px-0 md:pt-0"
    >
      {PROJECTS.map((project, i) => {
        const style = {
          "--x": `${project.position.left}%`,
          "--y": `${project.position.top}%`,
        } as CSSProperties;
        const index = String(i + 1).padStart(2, "0");

        return (
          <button
            key={project.slug}
            type="button"
            onClick={(e) =>
              openFocus(
                {
                  id: `project-${project.slug}`,
                  accent: "electric",
                  status: project.status,
                  title: project.title,
                  description: project.description,
                  role: project.role,
                  tags: project.tags,
                  caseStudy: project.caseStudy,
                },
                e.currentTarget
              )
            }
            data-anim="card"
            style={style}
            className="block w-full cursor-pointer text-left md:absolute md:left-[var(--x)] md:top-[var(--y)] md:w-72"
          >
            <GlassPanel
              accent="electric"
              className="group p-5 transition-colors hover:border-[#00E5FF]/50"
            >
              <ExpandHint />
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#00E5FF]">{index}</span>
                <h3 className="text-base font-semibold text-white">{project.title}</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/55">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-[#00E5FF] opacity-70 transition-opacity group-hover:opacity-100">
                Voir l&rsquo;étude de cas →
              </span>
            </GlassPanel>
          </button>
        );
      })}
    </div>
  );
});

export default ProjectNetworkOverlay;
