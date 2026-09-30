import type { Directive } from "vue";

// v-reveal : apparition douce à l'entrée dans le viewport.
// v-reveal="'figure'" pour les médias, v-reveal:2 pour décaler (index de stagger).
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
	if (!observer) {
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-revealed");
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
