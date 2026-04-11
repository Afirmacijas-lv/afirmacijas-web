import type { LayerStore } from "./layers.svelte";
import { renderLayers } from "./canvasRenderer";
import type { AspectRatio, CanvaConfig } from "./canvas.svelte";

export function downloadCanvas(
    layerStore: LayerStore,
    config: CanvaConfig,
    exportHeight: number,
    filename: string
) {
    if (!config.aspectRatio) return;

    const canvas = document.createElement("canvas");
    canvas.width = exportHeight * config.aspectRatio;
    canvas.height = exportHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Render each layer onto the canvas
    renderLayers(ctx, layerStore, true);

    if (!filename) filename = "afirmacija.png";

    // Trigger a download of the canvas image
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = filename;
    link.click();
}