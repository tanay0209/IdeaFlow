"use client";

import { ReactNode } from "react";
import {
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client'
import { Layer } from '@/types/canvas'


interface RoomProps {
    children: React.ReactNode,
    roomId: string,
    fallback: NonNullable<ReactNode> | null
}

export function Room({ children, roomId, fallback }: RoomProps) {
    return (
        (<RoomProvider
            id={roomId}
            initialPresence={{ cursor: null, selection: [], pencilDraft: null, penColor: null }}
            initialStorage={{
                layers: new LiveMap<string, LiveObject<Layer>>(),
                layerIds: new LiveList([])
            }}
        >
            <ClientSideSuspense fallback={fallback} >
                {children}
            </ClientSideSuspense>
        </RoomProvider >)

    );
}