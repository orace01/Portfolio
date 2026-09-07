// Léger grain papier appliqué sur l'ensemble de la page, purement
// décoratif — masqué des lecteurs d'écran et sans interaction possible.
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="paper-grain pointer-events-none fixed inset-0 z-50"
    />
  );
}
