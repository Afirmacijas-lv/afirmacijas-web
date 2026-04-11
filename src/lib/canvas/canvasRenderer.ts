import { render } from "svelte/server";
import type { BorderLayer, ImageLayer, Layer, TextLayer, LayerStore } from "./layers.svelte";

function renderLayers(ctx: CanvasRenderingContext2D, layerStore: LayerStore) {
    clearCanvas(ctx);
    renderCanvas(ctx, layerStore);
}

function clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function renderCanvas(ctx: CanvasRenderingContext2D, layerStore: LayerStore) {
    if (layerStore.image) renderImage(ctx, layerStore.image);

    if (layerStore.text_layers) {
        const inactiveTexts = layerStore.text_layers.filter(t => t.id !== layerStore.activeTextId);
        inactiveTexts.forEach((textLayer : TextLayer) => renderText(ctx, textLayer));
        const activeText = layerStore.text_layers.find(t => t.id === layerStore.activeTextId);
        if (activeText) renderText(ctx, activeText);
    }

    if (layerStore.border) renderBorder(ctx, layerStore.border);
}

function renderImage(ctx: CanvasRenderingContext2D, layer: ImageLayer) {
    const img = new Image();
    img.src = layer.src;
    img.onload = () => {
        ctx.drawImage(img, 0, 0);
    };
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