<script lang="ts">
    import AfirmacijasCanvas from '$lib/components/AfirmacijasCanvas.svelte';
    import Panel from '$lib/components/Panel.svelte';

    import { AspectRatio } from '$lib/canvas/canvas.svelte';
    import { createLayerStore } from "$lib/canvas/layers.svelte";
    import { createCanvaConfig } from "$lib/canvas/canvas.svelte";

    createLayerStore();
    createCanvaConfig();
</script>

<AfirmacijasCanvas maxHeight={300} aspectRatio={AspectRatio._1_1} />
<Panel />