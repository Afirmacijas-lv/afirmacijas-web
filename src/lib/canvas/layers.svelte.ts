enum LayerType {
    IMAGE = 'image',
    TEXT = 'text',
    BORDER = 'border'
};

export type Position = {
    x: number;
    y: number;
};

export type ImageLayer = {
    type: LayerType.IMAGE;
    src: string;
};

export type BorderLayer = {
    type: LayerType.BORDER;
    width: number;
    color: string;
};

// Can be multiple, needs ID
export type TextLayer = {
    id: string;
    type: LayerType.TEXT;
    content: string;
    fontSize: number;
    color: string;
    position: Position;
};


export type Layer = ImageLayer | TextLayer | BorderLayer;

export class LayerStore {
    image = $state< ImageLayer | null>(null);
    border = $state< BorderLayer | null>(null);
    text_layers = $state< TextLayer[] | null>(null);
    activeTextId = $state< string | null>(null);

    // Image helpers
    setImage(src: string) {
        this.image = {
            type: LayerType.IMAGE,
            src
        };
    }

    // Needs to be called before updating text layers
    setActiveText(id: string) {
        this.activeTextId = id;
    }

    updateTextLayer(patch: Partial<Omit<TextLayer, 'id'>>) {
        if (!this.activeTextId || !this.text_layers) return;
        const id = this.activeTextId;
        const t = this.text_layers.find(t => t.id === id);
        if (t) Object.assign(t, patch);
    }

    updateBorder(patch: Partial<Omit<BorderLayer, 'id'>>) {
        if (!this.border) return;
        Object.assign(this.border, patch);
    }

}

export function useLayerStore() {
    const layerStore = new LayerStore();
    return layerStore;
}