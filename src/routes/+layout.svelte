<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { t, locale, locales } from '$lib/translations';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		Button,
		DarkMode,
	} from 'flowbite-svelte';
	import { scale } from 'svelte/transition';

	const txt = new Proxy({} as Record<string, string>, {
		get: (_, key: string) => $t(`common.${key}`)
	});

	const updateLang = (newLang: string) => {
		document.cookie = `lang=${newLang}; path=/; max-age=31536000`;
		$locale = newLang;
	};

	let activeUrl = $derived(page.url.pathname);
	let activeSmallClass =
		'text-white rounded-sm my-2 hover:text-black dark:hover:text-white bg-primary-500 hover:bg-primary-50 dark:text-white dark:bg-primary-400 dark:hover:bg-primary-500';
	let nonActiveSmallClass =
		'text-black rounded-sm my-2 hover:bg-primary-50 dark:text-white dark:hover:bg-primary-600 dark:hover:text-white';
	let activeClass =
		'text-white rounded-sm my-2 hover:text-black md:hover:dark:text-white bg-primary-500 hover:bg-primary-50 md:hover:bg-transparent md:dark:hover:bg-transparent md:bg-transparent md:dark:text-white dark:bg-primary-400 md:dark:bg-transparent dark:hover:bg-primary-500 dark:text-white';
	let nonActiveClass =
		'text-black rounded-sm my-2 hover:bg-primary-50 md:hover:bg-transparent md:border-0 md:hover:text-black dark:text-white md:dark:hover:text-white dark:hover:bg-primary-600 dark:hover:text-white md:text-primary-400 md:dark:hover:bg-transparent';
	let buttonClass =
		'text-white dark:text-white dark:hover:text-primary-50 bg-primary-400 dark:bg-primary-800 hover:bg-primary-900 dark:hover:bg-primary-500';
	let { children } = $props();
</script>

<Navbar class="bg-primary-100 dark:bg-gray-900">
	<NavBrand href="/">
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
			>{txt.title}</span
		>
	</NavBrand>
	<NavHamburger class={buttonClass} />
	<NavUl
		{activeUrl}
		classes={{
			ul: 'p-3 dark:bg-gray-700 md:dark:bg-transparent rounded-none',
			active: activeClass,
			nonActive: nonActiveClass
		}}
		transition={scale}
		transitionParams={{ start: 0.8, duration: 200 }}
	>
		<NavLi href="/create">{txt.make_affirmation}</NavLi>
		<NavLi href="/about">{txt.about}</NavLi>
	</NavUl>

	<div class="ml-auto flex items-center gap-2">
		<DarkMode class={buttonClass} />
		<Button class={buttonClass}>
			{$t(`lang.${$locale}`)}
		</Button>
		<Dropdown
			class="p-2 divide-none rounded-none list-none dark:bg-primary-900"
			transition={scale}
			transitionParams={{ start: 0.8, duration: 200 }}
		>
			{#each $locales as value}
				{@const isActive = $locale === value}
				<DropdownItem
					onclick={() => updateLang(value)}
					class={isActive ? activeSmallClass : nonActiveSmallClass}
				>
					{$t(`lang.${value}`)}
				</DropdownItem>
			{/each}
		</Dropdown>
	</div>
</Navbar>

{@render children()}
