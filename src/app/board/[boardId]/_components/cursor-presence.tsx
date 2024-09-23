"use client"

import React, { memo } from 'react'
import { useOthersConnectionIds } from '@liveblocks/react/suspense'
import { Cursor } from './cursor'



const Cursors = () => {
    const ids = useOthersConnectionIds()
    return (
        <>
            {
                ids.map(connectionId => (
                    <Cursor
                        key={connectionId}
                        connectionId={connectionId}
                    />
                ))
            }
        </>
    )
}

export const CursorsPresence = memo(() => {

    const ids = useOthersConnectionIds()

    return (
        <>
            <Cursors />
        </>
    )
})

CursorsPresence.displayName = "CursorsPresence"