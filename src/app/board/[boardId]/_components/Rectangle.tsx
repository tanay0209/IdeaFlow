import { colorToCSS } from '@/lib/utils'
import { RectangleLayer } from '@/types/canvas'
import React from 'react'

interface RectangleProps {
    id: string,
    layer: RectangleLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

export const Rectangle = ({ id, layer, onPointerDown, selectionColor }: RectangleProps) => {
    const { x, y, height, width, fill } = layer

    return (
        <rect
            className='drop-shadow-md'
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`
            }}
            x={0}
            y={0}
            width={width}
            height={height}
            strokeWidth={1}
            fill={fill ? colorToCSS(fill) : "#eee"}
            stroke={selectionColor || "transparent"}
        />
    )
}