"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "../../convex/_generated/api"
import { ConfirmModal } from "./confirm-modal"
import { Button } from "./ui/button"
import { useRenameModal } from "@/store/use-rename-modal"
import { Id } from "../../convex/_generated/dataModel"


interface ActionProps {
    children: React.ReactNode,
    side?: DropdownMenuContentProps["side"],
    sideOffset?: DropdownMenuContentProps["sideOffset"],
    id: string,
    title: string
}

export const Actions = ({ children, side, sideOffset, id, title }: ActionProps) => {

    const { mutate, pending } = useApiMutation(api.board.remove)

    const { onOpen } = useRenameModal()
    const handleDelete = () => {
        mutate({
            id: id as Id<"boards">
        })
            .then(() => toast.success("Board Deleted successfully"))
            .catch((error) => toast.error(error))
    }

    const copyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
            .then(() => toast.success("Link copied succesfully"))
            .catch(() => toast.error("Failed to copy link"))
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem
                    onClick={copyLink}
                    className="p-3 cursor-pointer"
                >
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy Board Link
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onOpen(id, title)}
                    className="p-3 cursor-pointer"
                >
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename
                </DropdownMenuItem>


                <ConfirmModal
                    header="Delete Board?"
                    description="This will delete the board and all of its content"
                    disabled={pending}
                    onConfirm={handleDelete}
                >
                    <Button
                        variant='ghost'
                        className="p-3 text-sm w-full justify-start font-normal cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}