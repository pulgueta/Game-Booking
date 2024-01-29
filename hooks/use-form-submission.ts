import { ElementRef, useEffect, useRef } from "react";
import { useFormState } from "react-dom";

import { toast } from "sonner";

type InitialState =
	| {
			success: boolean;
			message: string;
	  }
	| undefined;

export const useFormSubmission = (
	event: any,
	initialStatus: InitialState = undefined
) => {
	const [state, formAction] = useFormState(event, initialStatus, undefined);

	const form = useRef<ElementRef<"form">>(null);

	useEffect(() => {
		if (state?.success) {
			toast.success(state.message);

			form.current?.reset();
		}

		if (!state?.success && state?.success !== undefined) {
			toast.error(state?.message);
		}
	}, [state]);

	return {
		formAction,
		ref: form,
	};
};
