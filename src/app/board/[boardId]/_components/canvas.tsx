"use client"

import { nanoid } from "nanoid"
import React, { use, useCallback, useMemo, useState } from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH } from '@/types/canvas'
import { useHistory, useCanUndo, useCanRedo, useMutation, useStorage, useOthersMapped } from '@liveblocks/react/suspense'
import { CursorsPresence } from './cursor-presence'
import { connectionIdToColor, pointerEventToCanvasPoint, resizeBounds } from '@/lib/utils'
import { LiveObject } from "@liveblocks/client"
import { LayerPreview } from "./layer-preview"
import { SelectionBox } from "./selection-box"

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string
}

function Canvas({ boardId }: CanvasProps) {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })
    const layerIds = useStorage(root => root.layerIds)
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0
    })

    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    const insertLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType.Rectangle | LayerType.Circle | LayerType.Note | LayerType.Text,
        position: Point
    ) => {
        const liveLayers = storage.get("layers")
        if (liveLayers.size >= 1000) {
            return
        }
        const liveLayerIds = storage.get("layerIds")
        const layerId = nanoid()
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUsedColor
        })
        liveLayerIds.push(layerId)
        liveLayers.set(layerId, layer)

        setMyPresence({
            selection: [layerId]
        }, { addToHistory: true })
        setCanvasState({
            mode: CanvasMode.None
        })
    }, [lastUsedColor])

    const onResizeHandlePointerDown = useCallback((corner: Side, initialBounds: XYWH) => {
        history.pause()
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner
        })
    }, [history])

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY
        }))
    }, [])

    const resizeSelectedLayer = useMutation((
        { storage, self },
        point: Point
    ) => {
        if (canvasState.mode !== CanvasMode.Resizing) return;

        const bounds = resizeBounds(
            canvasState.initialBounds,
            canvasState.corner,
            point
        )

        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(self.presence.selection[0])
        if (layer) {
            layer.update(bounds)
        }
    }, [canvasState])

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();
        const current = pointerEventToCanvasPoint(e, camera)

        if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current)
        }

        setMyPresence({ cursor: current })


    }, [canvasState, resizeSelectedLayer, camera])


    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null })
    }, [])

    const onPointerUp = useMutation(({ }, e) => {
        const point = pointerEventToCanvasPoint(e, camera)

        if (canvasState.mode === CanvasMode.Inserting) {
            //@ts-ignore
            insertLayer(canvasState.layerType, point)
        } else {
            setCanvasState({
                mode: CanvasMode.None
            })
        }
        history.resume()
    }, [camera, canvasState, history, insertLayer])


    const selections = useOthersMapped((other) => other.presence.selection)

    const onLayerPointerDown = useMutation((
        { self, setMyPresence },
        e: React.PointerEvent,
        layerId: string
    ) => {
        if (canvasState.mode === CanvasMode.Inserting || canvasState.mode === CanvasMode.Pencil) return

        history.pause()
        e.stopPropagation()

        const point = pointerEventToCanvasPoint(e, camera)

        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({ selection: [layerId] }, { addToHistory: true })
        }
        setCanvasState({ mode: CanvasMode.Translating, current: point })
    }, [
        setCanvasState, camera, history, canvasState.mode
    ])

    const layerIdsToSelection = useMemo(() => {
        const layerIdsToSelection: Record<string, string> = {}
        for (const user of selections) {
            const [connectionId, selection] = user

            for (const layerId of selection) {
                layerIdsToSelection[layerId] = connectionIdToColor(connectionId)
            }
        }
        return layerIdsToSelection
    }, [selections])

    return (
        <main
            className='h-full w-full relative bg-neutral-100 touch-none'>
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canRedo={canRedo}
                canUndo={canUndo}
                undo={history.undo}
                redo={history.redo}
            />
            <svg
                className='h-screen w-screen'
                onWheel={onWheel}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transform: `translateX(${camera.x}px) translateY(${camera.y}px)`
                    }}
                >
                    {layerIds.map(layerId => (
                        <LayerPreview
                            id={layerId}
                            key={layerId}
                            onLayerPointerDown={onLayerPointerDown}
                            selectionColor={layerIdsToSelection[layerId]}
                        />
                    ))}
                    <SelectionBox
                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                    />
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}

export default Canvas
