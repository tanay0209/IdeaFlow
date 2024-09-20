import React from 'react'
import Canvas from './_components/canvas'
import { Room } from '@/components/room'
import Loading from './_components/loading'


interface BoardPageProps {
    params: {
        boardId: string
    }
}


function BoardPage({ params }: BoardPageProps) {
    return (
        <Room
            fallback={<Loading />}
            roomId={params.boardId}>
            <Canvas boardId={params.boardId} />
        </Room>
    )
}

export default BoardPage
