import type { ReactNode } from "react";

import { NextPage } from "next";
import { redirect } from "next/navigation";

import { currentUser } from "@/lib/auth/current-user";

type MainPage = {
	children: ReactNode;
	userbooks: ReactNode;
	bookings: ReactNode;
	availability: ReactNode;
};

const RootLayout: NextPage<MainPage> = async ({
	children,
	userbooks,
	bookings,
	availability,
}) => {
	const user = await currentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<section className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container'>
			{children}
			{userbooks}
			{availability}
			{bookings}
		</section>
	);
};
export default RootLayout;
