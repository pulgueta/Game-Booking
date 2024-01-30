import { Route } from "next";
import Link from "next/link";

import { currentUser } from "@/lib/auth/current-user";
import { ToggleMode } from "../theme-button";
import { Routes } from "./routes";
import { SignOut } from "./sign-out";

export const Navbar = async () => {
	const user = await currentUser();

	return (
		<nav className='p-6 flex flex-col md:flex-row gap-4 items-center justify-between lg:justify-around border-b'>
			<Link
				href={"/" as Route}
				className='scroll-m-20 text-2xl md:text-4xl font-extrabold tracking-tight'
			>
				Reserventos
			</Link>
			<div className='flex items-center gap-x-4'>
				<Routes user={user} />
				{user && <SignOut />}
				<ToggleMode />
			</div>
		</nav>
	);
};
