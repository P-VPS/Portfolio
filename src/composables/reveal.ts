import type { Directive } from "vue";

// v-reveal : apparition douce à l'entrée dans le viewport, jouée une seule fois.
// v-reveal="'figure'" pour les médias, v-reveal:2 pour décaler (index de stagger).
// L'état est porté par un attribut data-revealed et non par une classe : Vue réécrit
// l'attribut class des éléments ayant un :class dynamique, ce qui effaçait la révélation.
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
	if (!observer) {
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						(entry.target as HTMLElement).dataset.revealed = "";
						observer?.unobserve(entry.target);
					}
				}
			},
			{ rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
		);
	}
	return observer;
}

export const vReveal: Directive<HTMLElement, string | undefined> = {
	mounted(el, binding) {
		el.dataset.reveal = binding.value ?? "";
		if (binding.arg) el.style.setProperty("--reveal-i", binding.arg);
		getObserver().observe(el);
	},
	unmounted(el) {
		observer?.unobserve(el);
	},
};
