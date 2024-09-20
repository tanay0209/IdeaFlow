"use client"
import React from 'react'

import { UserAvatar } from './user-avatar'
import { useOthers, useSelf } from '@liveblocks/react/suspense'
import { connectionIdToColor } from '@/lib/utils'

const MAX_SHOWN_USERS = 2

function Participants() {
    const users = useOthers()
    const currentUser = useSelf()
    const hasMoreUsers = users.length > MAX_SHOWN_USERS
    return (
        <div className='h-12 absolute top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
            <div className='flex gap-x-2'>
                {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
                    return (
                        <UserAvatar
                            borderColor={connectionIdToColor(connectionId)}
                            key={connectionId}
                            src={info?.picture}
                            name={info?.name}
                            fallback={info?.name?.[0] || "T"}
                        />
                    )
                })}

                {currentUser && (
                    <UserAvatar
                        borderColor={connectionIdToColor(currentUser.connectionId)}
                        src={currentUser.info.picture}
                        key={currentUser.id}
                        name={`${currentUser.info.name} (You)`}
                        fallback={currentUser?.info.name?.[0] || "You"}
                    />
                )}

                {hasMoreUsers && (
                    <UserAvatar
                        name={`${users.length - MAX_SHOWN_USERS} more`}
                        fallback={`+${users.length - MAX_SHOWN_USERS}`}
                    />
                )}
            </div>
        </div >
    )
}

export default Participants


export const ParticipantsSkeleton = () => {
    return <div className='h-12 absolute w-[100px] top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md' />

}