import type { BorderLayer, ImageLayer, Layer, TextLayer, LayerStore } from "./layers.svelte";

export function renderLayers(ctx: CanvasRenderingContext2D, layerStore: LayerStore, debug: boolean) {
    clearCanvas(ctx);
    renderCanvas(ctx, layerStore, debug);
}

function clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function renderCanvas(ctx: CanvasRenderingContext2D, layerStore: LayerStore, debug: boolean) {
    if (layerStore.image) renderImage(ctx, layerStore.image);

    if (layerStore.text_layers) {
        const inactiveTexts = layerStore.text_layers.filter(t => t.id !== layerStore.activeTextId);
        inactiveTexts.forEach((textLayer : TextLayer) => renderText(ctx, textLayer));
        const activeText = layerStore.text_layers.find(t => t.id === layerStore.activeTextId);
        if (activeText) renderText(ctx, activeText);
    }

    if (layerStore.border) renderBorder(ctx, layerStore.border);
    if (debug) fillCanvas(ctx);
}

function fillCanvas(ctx: CanvasRenderingContext2D) {
    console.log('fillCanvas', { w: ctx.canvas.width, h: ctx.canvas.height });
    ctx.fillStyle = "#eb5a62";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function renderImage(ctx: CanvasRenderingContext2D, layer: ImageLayer) {
    if (!layer.img) return;
    ctx.drawImage(layer.img, 0, 0);
}

function renderText(ctx: CanvasRenderingContext2D, layer: TextLayer) {
    ctx.font = `${layer.fontSize}px sans-serif`;
    ctx.fillStyle = layer.color;
    ctx.fillText(layer.content, layer.position.x, layer.position.y);
}

function renderBorder(ctx: CanvasRenderingContext2D, layer: BorderLayer) {
    ctx.strokeStyle = layer.color;
    ctx.lineWidth = layer.width;
    ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}