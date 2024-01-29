import { PropsWithChildren } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SessionProvider } from "next-auth/react";

import { Navbar } from "@/components/navbar";
import { auth } from "@/auth";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Reserva de Eventos",
	description:
		"Agenda tu partida con tus amigos y demuestra tu mejor potencial en el campo de juego.",
};

const RootLayout = async ({ children }: PropsWithChildren) => {
	const session = await auth();

	return (
		<html lang='es'>
			<body className={inter.className}>
				<SessionProvider session={session}>
					<Navbar />
					{children}
				</SessionProvider>
			</body>
		</html>
	);
};
export default RootLayout;
