"use client";

import { ReactNode } from "react";
import {
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";


interface RoomProps {
    children: React.ReactNode,
    roomId: string,
    fallback: NonNullable<ReactNode> | null
}

export function Room({ children, roomId, fallback }: RoomProps) {
    return (
        (<RoomProvider
            id={roomId}
            initialPresence={{ cursor: null }}
        >
            <ClientSideSuspense fallback={fallback} >
                {children}
            </ClientSideSuspense>
        </RoomProvider >)

    );
}