"use client";

import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/actions/register";
import { SubmitButton } from "./submit-button";
import { useFormSubmission } from "@/hooks/use-form-submission";

export const RegisterForm = () => {
	const [show, setShow] = useState<boolean>(false);

	const { ref, formAction } = useFormSubmission(register);

	return (
		<form className='space-y-4' ref={ref} action={formAction}>
			<div>
				<Label htmlFor='name'>Nombre(s)</Label>
				<Input
					name='name'
					placeholder='Tus nombres'
					autoComplete='name'
				/>
			</div>

			<div>
				<Label htmlFor='email'>Email</Label>
				<Input
					name='email'
					placeholder='Tus correo electrónico'
					type='email'
					autoComplete='email'
				/>
			</div>

			<div className='relative'>
				<Button
					size='icon'
					variant='ghost'
					type='button'
					aria-label='Show password'
					className='absolute size-8 right-1 bottom-1'
					onClick={() => setShow(!show)}
				>
					{show ? (
						<EyeOffIcon className='size-4' />
					) : (
						<EyeIcon className='size-4' />
					)}
				</Button>
				<Label htmlFor='password'>Contraseña</Label>
				<Input
					name='password'
					placeholder='Tu contraseña secreta'
					type={show ? "text" : "password"}
					autoComplete='password'
				/>
			</div>
			<SubmitButton label='Registrarme' />
		</form>
	);
};
