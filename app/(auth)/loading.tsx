import { Loader2Icon } from "lucide-react";

const Loading = () => {
	return (
		<div className='flex min-h-[calc(100dvh-121px)] flex-col items-center justify-center gap-y-2'>
			<h1 className='text-xl font-bold tracking-tight text-center'>
				Cargando autenticación...
			</h1>
			<Loader2Icon className='size-6 animate-spin' />
		</div>
	);
};
export default Loading;
