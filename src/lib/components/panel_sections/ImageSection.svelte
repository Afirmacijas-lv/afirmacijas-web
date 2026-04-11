<script lang="ts">
    import { getLayerStore } from "$lib/canvas/layers.svelte";
    import { getCanvaConfig } from "$lib/canvas/canvas.svelte";
    import { downloadCanvas } from "$lib/canvas/download";

    const layerStore = getLayerStore();
    const config = getCanvaConfig();

    function handleUpload(e: Event) {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        layerStore.setImage(url);
    }
</script>

<button onclick={() => downloadCanvas(layerStore, config, 1080, "afirmacija.png")}>Download</button>

<div class="flex gap-4 items-center">
    <input type="file" accept="image/*" onchange={handleUpload} />
</div>