import Link from "next/link";

import { RegisterForm } from "@/components/form/register-form";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const Register = () => {
	return (
		<section className='p-4 flex items-center justify-center'>
			<Card className='w-full md:w-96'>
				<CardHeader>
					<CardTitle>Registro</CardTitle>
					<CardDescription>
						Crea tu cuenta para poder agendar eventos
					</CardDescription>
				</CardHeader>
				<CardContent>
					<RegisterForm />
				</CardContent>
				<CardFooter className='flex items-center justify-center'>
					<Link
						href='/login'
						className={buttonVariants({ variant: "link" })}
					>
						¿Ya tienes cuenta? Inicia sesión
					</Link>
				</CardFooter>
			</Card>
		</section>
	);
};
export default Register;
