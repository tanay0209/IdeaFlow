"use client"
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useOrganization } from "@clerk/clerk-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const EmptyBoard = () => {
    const router = useRouter()
    const { mutate, pending } = useApiMutation(api.board.create)
    const { organization } = useOrganization()
    const onClick = () => {
        if (!organization) return
        mutate({
            orgId: organization.id,
            title: "Untitled"
        }).
            then((id) => {
                toast.success("Board Created");
                router.push(`/board/${id}`)
            })
            .catch(() => toast.error("Failed to create board"))

    }
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/empty-board.svg"
                alt="Empty Search"
                width={110}
                height={110}
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first board!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size='lg'>
                    Create Board
                </Button>
            </div>
        </div>
    )
}