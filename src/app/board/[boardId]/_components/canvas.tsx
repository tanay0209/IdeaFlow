"use client"

import { nanoid } from "nanoid"
import React, { useCallback, useState } from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from '@/types/canvas'
import { useHistory, useCanUndo, useCanRedo, useMutation, useStorage } from '@liveblocks/react/suspense'
import { CursorsPresence } from './cursor-presence'
import { pointerEventToCanvasPoint } from '@/lib/utils'
import { LiveObject } from "@liveblocks/client"
import { LayerPreview } from "./layer-preview"

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

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY
        }))
    }, [])

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();
        const current = pointerEventToCanvasPoint(e, camera)
        setMyPresence({ cursor: current })
    }, [])


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
                            onLayerPointerDown={() => { }}
                            selectionColor="#000"
                        />
                    ))}
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}

export default Canvas
