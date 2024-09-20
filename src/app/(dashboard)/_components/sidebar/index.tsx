import React from 'react'
import { NewButton } from './new-button'
import { List } from './list'

function Sidebar() {
    return (
        <aside className='fixed z-[1] w-[60px] left-0 bg-blue-950 h-full p-3 flex-col gap-y-4 flex text-white'>
            <List />
            <NewButton />
        </aside>
    )
}

export default Sidebar
