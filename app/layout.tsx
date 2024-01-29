import type { PropsWithChildren } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SessionProvider } from "next-auth/react";

import { Navbar } from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-switcher";
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
		<html lang='es' suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					enableSystem
					attribute='class'
					defaultTheme='system'
					storageKey='gb_theme'
				>
					<SessionProvider session={session}>
						<Navbar />
						<Toaster position='top-right' richColors />
						<main className='flex min-h-[calc(100dvh-89px)] flex-col items-center justify-between p-4'>
							{children}
						</main>
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
};
export default RootLayout;
