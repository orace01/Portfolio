import { ImageIcon } from "lucide-react";

type PhotoPlaceholderProps = {
  className?: string;
  iconClassName?: string;
  tone?: "light" | "dark";
  cornerMarks?: boolean;
};

// Emplacement réservé pour une future photographie, dans le même cadre
// que les images définitives afin qu'il suffise de remplacer ce composant
// par une balise <img> le moment venu.
export default function PhotoPlaceholder({
  className = "",
  iconClassName = "",
  tone = "light",
  cornerMarks = false,
}: PhotoPlaceholderProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-3 ${
        isDark ? "bg-mocha" : "bg-champagne"
      } ${className}`}
    >
      {cornerMarks && (
        <>
          <span className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-walnut" />
          <span className="absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-walnut" />
          <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-walnut" />
          <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-walnut" />
        </>
      )}
      <ImageIcon
        className={`h-8 w-8 ${isDark ? "text-paper" : "text-walnut"} ${iconClassName}`}
        strokeWidth={1.4}
        aria-hidden="true"
      />
      <span
        className={`text-[11px] italic uppercase tracking-[0.2em] ${
          isDark ? "text-paper" : "text-walnut"
        }`}
      >
        Photo à venir
      </span>
    </div>
  );
}
