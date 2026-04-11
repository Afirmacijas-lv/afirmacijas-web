<script lang="ts">
	import { createCanvaConfig } from "$lib/canvas/canvas.svelte";
	import { renderLayers } from "$lib/canvas/canvasRenderer";
	import { createLayerStore } from "$lib/canvas/layers.svelte";
    import { AspectRatio } from "$lib/canvas/canvas.svelte";

    const layers = createLayerStore();
    const config = createCanvaConfig();

    let canvasEl = $state<HTMLCanvasElement | null>(null);
    
    let ctx = $state<CanvasRenderingContext2D | null>(null);


    interface Props {
        maxHeight: number;
        aspectRatio: AspectRatio;
    };

    let { maxHeight, aspectRatio }: Props = $props();
    

    $effect(() => {
        console.log('config effect', { maxHeight, aspectRatio });
        config.maxHeight = maxHeight;
        config.aspectRatio = aspectRatio;
        
        if (!canvasEl) return;

        const { width, height } = config;
        if (!width || !height) return;
        
        canvasEl.width = width;
        canvasEl.height = height;

        ctx = canvasEl.getContext("2d");
        if (!ctx) return;

        renderLayers(ctx, layers, true);
    });

    $effect(() => {
        console.log('image effect', { layers });
        const src = layers.image?.src;
        if (!src) return;

        const img = new Image();
        img.onload = () => {
            if (!layers.image) return;
            layers.image.img = img;
        };
        img.src = src;
    });
</script>

<canvas bind:this={canvasEl}></canvas>