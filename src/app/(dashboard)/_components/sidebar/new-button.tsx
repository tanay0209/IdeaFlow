"use client"

import { Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle
} from "@/components/ui/dialog"
import { Hint } from "@/components/hint"

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint
                        side="right"
                        align="start"
                        sideOffset={10}
                        label="Create Organization">
                        <button className="bg-white/25 h-full w-full rounded-md items-center justify-center flex opacity-60 hover:opacity-100 transition">
                            <Plus className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <DialogTitle/>
                <CreateOrganization routing="hash" />
            </DialogContent>
        </Dialog>
    )
}