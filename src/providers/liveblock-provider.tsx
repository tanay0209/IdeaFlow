"use client"
import React from 'react'
import { LiveblocksProvider } from "@liveblocks/react/suspense"

interface ProviderProps {
    children: React.ReactNode
}

function LiveblockProvider({ children }: ProviderProps) {

    const apiKey = process.env.LIVEBLOCK_PUBLIC_KEY;

    return (
        <LiveblocksProvider
            authEndpoint="/api/liveblocks-auth"
        >
            {children}
        </LiveblocksProvider>
    )
}

export default LiveblockProvider
