import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

export function useMediaQuery(query: string): Ref<boolean> {
	const matches = ref(false);
	let mql: MediaQueryList | undefined;
	const update = () => (matches.value = !!mql?.matches);

	onMounted(() => {
		mql = window.matchMedia(query);
		update();
		mql.addEventListener("change", update);
	});
	onBeforeUnmount(() => mql?.removeEventListener("change", update));

	return matches;
}

export const DESKTOP_QUERY = "(min-width: 1100px)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const prefersReducedMotion = (): boolean =>
	typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
