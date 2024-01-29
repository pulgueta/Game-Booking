"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";

export const SignOut = () => {
	const [isPending, startTransition] = useTransition();

	const onLogout = () => startTransition(async () => await logout());

	return (
		<form action={onLogout}>
			<Button id='logout-btn' variant='destructive' disabled={isPending}>
				{isPending ? "Cerrando sesión..." : "Cerrar sesión"}
			</Button>
		</form>
	);
};
