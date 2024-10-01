"use client"
import React from 'react'
import { LiveblocksProvider } from "@liveblocks/react/suspense"


interface ProviderProps {
    children: React.ReactNode
}

function LiveblockProvider({ children }: ProviderProps) {

    return (
        <LiveblocksProvider
            throttle={16}
            authEndpoint="/api/liveblocks-auth"
        >
            {children}
        </LiveblocksProvider>
    )
}

export default LiveblockProvider
