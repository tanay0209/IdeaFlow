import { useState } from "react";
import { useMutation } from "convex/react";
import type {
    DefaultFunctionArgs,
    FunctionReference,
    OptionalRestArgs
} from "convex/server"

export const useApiMutation = <Args extends DefaultFunctionArgs,
    ReturnType>(mutationFunction: FunctionReference<"mutation", "public", Args, ReturnType>) => {
    const [pending, setPending] = useState(false);
    const apiMutation = useMutation(mutationFunction)

    const mutate = (...payload: OptionalRestArgs<FunctionReference<"mutation", "public", Args, ReturnType>>) => {
        setPending(true);
        return apiMutation(...payload)
            .finally(() => setPending(false))
            .then((result) => result)
            .catch((error) => { throw error })
    }

    return { mutate, pending }
}