import { colorToCSS } from "@/lib/utils"
import { CircleLayer } from "@/types/canvas"

interface CircleProps {
    id: string,
    layer: CircleLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

export const Circle = ({ id, layer, onPointerDown, selectionColor }: CircleProps) => {
    const { x, y, height, width, fill } = layer

    return (
        <ellipse
            className="drop-shadow-md"
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`
            }}
            cx={width / 2}
            cy={height / 2}
            rx={width / 2}
            ry={height / 2}
            fill={fill ? colorToCSS(fill) : "#eee"}
            stroke={selectionColor || "transparent"}
            strokeWidth="1"
        />
    )
}

