import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/form/login-form";

const Login = () => {
	return (
		<section className='p-4 flex items-center justify-center'>
			<Card className='w-full md:w-96'>
				<CardHeader>
					<CardTitle>Iniciar sesión</CardTitle>
					<CardDescription>
						Accede a tu cuenta para crear eventos
					</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
				<CardFooter className='flex items-center justify-center'>
					<Link
						href='/register'
						className={buttonVariants({ variant: "link" })}
					>
						¿No tienes cuenta? Haz clic aquí
					</Link>
				</CardFooter>
			</Card>
		</section>
	);
};
export default Login;
