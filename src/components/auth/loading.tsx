import React from 'react'
import Image from 'next/image'
function Loading() {
    return (
        <div className='h-full w-full flex flex-col gap-y-4 justify-center items-center'>
            <Image
                src="/logo.svg"
                alt='Logo'
                height={120}
                width={120}
                className='animate-pulse duration-700'
            />
        </div>
    )
}

export default Loading
