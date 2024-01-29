"use client";

import { Button } from "@/components/ui/button";

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
	return (
		<aside className='border p-4 rounded w-full bg-secondary md:col-span-2 lg:col-span-1 flex items-center justify-center flex-col gap-4'>
			<h3 className='text-2xl font-semibold tracking-tight'>
				{error.message}
			</h3>
			<Button onClick={() => window.location.reload()}>Actualizar</Button>
		</aside>
	);
};

export default ErrorPage;
