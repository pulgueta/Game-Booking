import { Loader2Icon } from "lucide-react";

const Loading = () => {
	return (
		<div className='flex min-h-[calc(100dvh-121px)] flex-col items-center justify-center gap-y-4'>
			<Loader2Icon className='size-10 animate-spin' />
		</div>
	);
};
export default Loading;
