"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogTitle
} from "@/components/ui/dialog"
import { useRenameModal } from "@/store/use-rename-modal"
import { FormEventHandler, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "../../../convex/_generated/api"
import { toast } from "sonner"
import { Id } from "../../../convex/_generated/dataModel"

export const RenameModal = () => {
    const { isOpen, onClose, initialValues } = useRenameModal()

    const { mutate, pending } = useApiMutation(api.board.update)
    const [title, setTitle] = useState(initialValues.title)

    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        mutate({
            id: initialValues.id as Id<"boards">,
            title,
        })
            .then(() => {
                toast.success("Board successfully renamed")
                onClose()
            })
            .catch((error) => {
                console.error("Error renaming board:", error)
                toast.error(error instanceof Error ? error.message : "An error occurred while renaming the board")
            })
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>
                        Edit Board Title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board Title"
                    />
                    <div className="flex justify-end space-x-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={pending}
                            type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}