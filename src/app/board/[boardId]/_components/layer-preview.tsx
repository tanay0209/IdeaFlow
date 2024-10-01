"use client"

import { LayerType } from "@/types/canvas"
import { useStorage } from "@liveblocks/react/suspense"
import { memo } from "react"
import { Rectangle } from "./Rectangle"
import { Circle } from "./Circle"
import { Text } from "./text"
import { Note } from "./note-layer"

interface LayerPreviewProps {
    id: string,
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void,
    selectionColor?: string
}
export const LayerPreview = memo(({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {

    const layer = useStorage((root) => root.layers.get(id))
    if (!layer) return null

    switch (layer.type) {
        case LayerType.Rectangle:
            return (
                <Rectangle
                    id={id}
                    layer={layer}
                    selectionColor={selectionColor}
                    onPointerDown={onLayerPointerDown}
                />
            );
        case LayerType.Circle:
            return (
                <Circle
                    id={id}
                    layer={layer}
                    selectionColor={selectionColor}
                    onPointerDown={onLayerPointerDown}

                />
            )
        case LayerType.Text:
            return (
                <Text
                    id={id}
                    layer={layer}
                    selectionColor={selectionColor}
                    onPointerDown={onLayerPointerDown}
                />
            )
        case LayerType.Note:
            return (
                <Note
                    id={id}
                    layer={layer}
                    selectionColor={selectionColor}
                    onPointerDown={onLayerPointerDown}
                />
            )
        default:
            console.warn("Unknown type")
            return null

    }
})

LayerPreview.displayName = "LayerPreview"