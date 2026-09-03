import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { ABOUT_STORY } from "@/lib/constants";
import { GlassPanel, TagPill, ExpandHint } from "@/components/ui/Glass";
import { useFocusMode } from "@/context/FocusModeContext";

const AboutStoryOverlay = forwardRef<HTMLDivElement>(function AboutStoryOverlay(_props, ref) {
  const { openFocus } = useFocusMode();

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex flex-col gap-4 overflow-y-auto px-5 pb-6 pt-24 sm:px-8 md:block md:overflow-visible md:px-0 md:pt-0"
    >
      {ABOUT_STORY.map((item) => {
        const style = {
          "--x": `${item.position.left}%`,
          "--y": `${item.position.top}%`,
        } as CSSProperties;

        return (
          <button
            key={item.title}
            type="button"
            onClick={(e) =>
              openFocus(
                {
                  id: `about-${item.title}`,
                  accent: "electric",
                  title: item.title,
                  description: item.description,
                  tags: item.tags,
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
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/55">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
            </GlassPanel>
          </button>
        );
      })}
    </div>
  );
});

export default AboutStoryOverlay;
