<script lang="ts">
	import ImageSection from "./panel_sections/ImageSection.svelte";
	import TextSection from "./panel_sections/TextSection.svelte";
	import BorderSection from "./panel_sections/BorderSection.svelte";

    type Tab = "image" | "text" | "border";
    let activeTab = $state<Tab>("image");
</script>

<div>
    <div>
        {#each (['image', 'text', 'border'] as Tab[]) as tab}
        <button
            class="{activeTab === tab ? 'bg-black text-white' : 'bg-gray-100'}"
            onclick={() => activeTab = tab}
        >
            {tab}
        </button>
        {/each}
    </div>
    {#if activeTab === "image"}
        <ImageSection />
    {/if}
    
    {#if activeTab === "text"}
        <TextSection />
    {/if}

    {#if activeTab === "border"}
        <BorderSection />
    {/if}
</div>