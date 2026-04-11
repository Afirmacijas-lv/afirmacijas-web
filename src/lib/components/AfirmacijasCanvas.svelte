<script lang="ts">
    function calculateWidth(height: number): number {
        // Future logic for aspect ratios
        return height;
    }

    let canvasEl = $state<HTMLCanvasElement | null>(null);
    let { maxHeight } = $props();
    let height = $derived(maxHeight);
    let width = $derived(calculateWidth(height));

    $effect(() => {
        if (!canvasEl) return;
        const ctx = canvasEl.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = "Red";
        ctx.fillRect(0, 0, width, height);
    });

</script>

<canvas height={height} width={width} bind:this={canvasEl}></canvas>