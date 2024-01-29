import { UrlObject } from "url";

import { FC } from "react";

import Link from "next/link";

import { User } from "next-auth";

import { buttonVariants } from "@/components/ui/button";
import { authRoutes, noAuthRoutes } from "./links";

type CurrentUser = {
	user: User | null;
};

export const Routes: FC<CurrentUser> = ({ user }) => (
	<ul className='flex items-center gap-x-4'>
		{user
			? authRoutes.map((route) => (
					<li key={route.path}>
						<Link
							href={route.path as unknown as UrlObject}
							className={buttonVariants({
								variant: "ghost",
							})}
						>
							{route.label}
						</Link>
					</li>
			  ))
			: noAuthRoutes.map((route) => (
					<li key={route.path}>
						<Link
							href={route.path as unknown as UrlObject}
							className={buttonVariants({
								variant: "ghost",
							})}
						>
							{route.label}
						</Link>
					</li>
			  ))}
	</ul>
);
