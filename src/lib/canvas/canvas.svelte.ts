import { getContext, setContext } from "svelte";

export enum AspectRatio {
    _16_9 = 16 / 9,
    _16_10 = 16 / 10,
    _4_3 = 4 / 3,
    _3_4 = 3 / 4,
    _1_1 = 1
}

const CANVA_CONFIG = Symbol("CanvaConfig");

export class CanvaConfig {
    maxHeight = $state< number | null >(null);
    aspectRatio = $state< AspectRatio | null >(null);
    height = $derived(this.calculateHeight());
    width = $derived(this.calculateWidth());

    calculateHeight() {
        if (this.maxHeight) return this.maxHeight;
    }

    calculateWidth() {
        if (this.aspectRatio && this.maxHeight) {
            return Math.round(this.maxHeight * this.aspectRatio);
        }
        return null;
    }
};

export function createCanvaConfig() : CanvaConfig {
    const config = new CanvaConfig();
    setContext(CANVA_CONFIG, config);
    return config;
}

export function getCanvaConfig() : CanvaConfig {
    return getContext(CANVA_CONFIG);
}
