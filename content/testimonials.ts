import type { Testimonial } from "@/types/content";

/**
 * Témoignages manuels, uniquement réels et validés par le client (jamais d'avis inventés).
 * Affichés sur les pages communes (filtrés par `city`) et en repli sur la page avis
 * si les avis Google sont indisponibles. Liste vide : rien n'est affiché.
 */
export const testimonials: Testimonial[] = [];
