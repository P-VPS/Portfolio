<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { site } from "@/content/site";
import { stack } from "@/composables/stackState";
import LayerStrip from "./LayerStrip.vue";

const nav = [
	{ label: "Projets", hash: "#projets" },
	{ label: "Parcours", hash: "#parcours" },
	{ label: "Compétences", hash: "#competences" },
	{ label: "Contact", hash: "#contact" },
];

const route = useRoute();
const scrolled = ref(false);
const open = ref(false);

const onScroll = () => (scrolled.value = window.scrollY > 8);
const onKey = (e: KeyboardEvent) => {
	if (e.key === "Escape") open.value = false;
};

onMounted(() => {
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
	window.removeEventListener("scroll", onScroll);
	window.removeEventListener("keydown", onKey);
});

watch(open, (v) => document.documentElement.classList.toggle("menu-open", v));
watch(
	() => route.fullPath,
	() => (open.value = false),
);

const showStrip = computed(() => stack.mode === "case" || stack.pastHero);
</script>

<template>
	<header class="header" :class="{ 'is-scrolled': scrolled || open, 'is-open': open }">
		<div class="header__bar container">
			<RouterLink to="/" class="brand" aria-label="Sébastien Voide, retour à l’accueil">
				<span class="brand__name">{{ site.name }}</span>
				<span class="brand__role">/ full-stack</span>
			</RouterLink>

			<nav class="nav" aria-label="Navigation principale">
				<RouterLink
					v-for="item in nav"
					:key="item.hash"
					:to="{ path: '/', hash: item.hash }"
					class="nav__link"
				>
					{{ item.label }}
				</RouterLink>
				<a :href="site.links.linkedin" class="nav__cta" target="_blank" rel="noopener noreferrer">
					LinkedIn <span aria-hidden="true">↗</span>
				</a>
			</nav>

			<button
				type="button"
				class="burger"
				:aria-expanded="open"
				aria-controls="menu-mobile"
				:aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
				@click="open = !open"
			>
				<span class="burger__line" /><span class="burger__line" />
			</button>
		</div>

		<div class="header__strip container" :class="{ 'is-visible': showStrip && !open }">
			<LayerStrip />
		</div>

		<div id="menu-mobile" class="menu" :class="{ 'is-open': open }" :inert="!open">
			<nav class="menu__nav container" aria-label="Menu">
				<RouterLink
					v-for="(item, i) in nav"
					:key="item.hash"
					:to="{ path: '/', hash: item.hash }"
					class="menu__link"
					:style="{ '--i': i }"
				>
					{{ item.label }}
				</RouterLink>
				<div class="menu__links">
					<a :href="site.links.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
					<a :href="site.links.github" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
				</div>
			</nav>
		</div>
	</header>
</template>

<style scoped lang="scss">
.header {
	position: fixed;
	inset: 0 0 auto;
	z-index: 30;
	transition:
		background-color var(--dur-fast) var(--ease),
		box-shadow var(--dur-fast) var(--ease);

	&.is-scrolled {
		background: rgba(242, 240, 234, 0.96);
		box-shadow: 0 1px 0 var(--line);
	}
}

.header__bar {
	height: var(--header-h);
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--space-5);
	max-width: none;

	@include up(lg) {
		// Le header s'étend au-dessus du rail
		padding-inline: 40px;
	}
}

.brand {
	display: flex;
	align-items: baseline;
	gap: 10px;
	text-decoration: none;

	&__name {
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	&__role {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		color: var(--graphite);

		@include down(sm) {
			display: none;
		}
	}
}

.nav {
	display: none;
	align-items: center;
	gap: clamp(1.25rem, 2.5vw, 2.25rem);

	@include up(md) {
		display: flex;
	}

	&__link {
		position: relative;
		font-size: 0.9375rem;
		text-decoration: none;

		&::after {
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			bottom: -4px;
			height: 1.5px;
			background: var(--signal);
			transform: scaleX(0);
			transform-origin: right;
			transition: transform var(--dur-fast) var(--ease);
		}

		@include hover {
			&:hover::after {
				transform: scaleX(1);
				transform-origin: left;
			}
		}
	}

	&__cta {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 36px;
		padding: 0 14px;
		border: 1px solid var(--ink);
		border-radius: var(--radius);
		font-size: 0.875rem;
		text-decoration: none;
		transition:
			background-color var(--dur-fast) var(--ease),
			color var(--dur-fast) var(--ease);

		@include hover {
			&:hover {
				background: var(--ink);
				color: var(--surface);
			}
		}
	}
}

.burger {
	width: 44px;
	height: 44px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: 1px solid var(--line);
	border-radius: var(--radius);
	background: var(--surface);

	@include up(md) {
		display: none;
	}

	&__line {
		width: 18px;
		height: 1.5px;
		background: var(--ink);
		transition: transform var(--dur-fast) var(--ease);
	}

	.is-open & {
		.burger__line:first-child {
			transform: translateY(4.75px) rotate(45deg);
		}
		.burger__line:last-child {
			transform: translateY(-4.75px) rotate(-45deg);
		}
	}
}

.header__strip {
	max-width: none;
	height: 0;
	overflow: hidden;
	opacity: 0;
	transition:
		height var(--dur-fast) var(--ease),
		opacity var(--dur-fast) var(--ease);

	&.is-visible {
		height: 26px;
		opacity: 1;
	}

	@include up(lg) {
		display: none;
	}
}

.menu {
	position: fixed;
	inset: var(--header-h) 0 0;
	background: var(--paper);
	visibility: hidden;
	opacity: 0;
	transition:
		opacity var(--dur-fast) var(--ease),
		visibility 0s linear var(--dur-fast);

	&.is-open {
		visibility: visible;
		opacity: 1;
		transition: opacity var(--dur-fast) var(--ease);
	}

	@include up(md) {
		display: none;
	}

	&__nav {
		display: flex;
		flex-direction: column;
		padding-top: var(--space-7);
		gap: var(--space-2);
	}

	&__link {
		font-size: 2.5rem;
		font-weight: 500;
		letter-spacing: -0.03em;
		text-decoration: none;
		padding-block: 4px;
		opacity: 0;
		transform: translateY(10px);
		transition:
			opacity var(--dur) var(--ease),
			transform var(--dur) var(--ease);
		transition-delay: calc(var(--i) * 50ms);

		.is-open & {
			opacity: 1;
			transform: none;
		}
	}

	&__links {
		display: flex;
		gap: var(--space-5);
		margin-top: var(--space-7);
		padding-top: var(--space-5);
		border-top: 1px solid var(--line);
		font-size: 1rem;

		a {
			text-decoration: none;
			min-height: 44px;
			display: inline-flex;
			align-items: center;
		}
	}
}
</style>
