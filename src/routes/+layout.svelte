<script lang="ts">
	import '../app.css';
	import { t, locale, locales } from '$lib/translations';

	const txt = new Proxy({} as Record<string, string>, {
        get: (_, key: string) => $t(`common.${key}`)
    });

	const handleChange = (e: Event) => {
		const currentTarget = e.currentTarget as HTMLSelectElement;
		const value = currentTarget.value;
		document.cookie = `lang=${value}; path=/; max-age=31536000`;
        
        $locale = value;
	};

	let { children } = $props();
</script>

<nav>
	<a href="/">{txt.home}</a>
	<a href="/create">{txt.make_affirmation}</a>
	<a href="/about">{txt.about}</a>
	<select value={$locale} onchange={handleChange}>
        {#each $locales as value}
            <option {value}>
                {$t(`lang.${value}`)}
            </option>
        {/each}
    </select>
</nav>

{@render children()}
