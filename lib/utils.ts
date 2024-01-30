import { UrlObject } from "url";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { env } from "@/envs.mjs";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type RSCFetch<T extends (...args: any) => any | any[]> = Awaited<
	ReturnType<T>
>;

export type Method = "GET" | "POST";

export const rscFetch = async <T extends (...args: any) => any | any[]>(
	endpoint: UrlObject | __next_route_internal_types__.RouteImpl<"">,
	body: BodyInit | null | undefined = null,
	method: Method = "GET"
): Promise<RSCFetch<T>> => {
	const response = await fetch(`${env.HOST}${endpoint}`, { method, body });

	if (!response.ok) {
		throw new Error(`Failed to fetch data from ${endpoint}`);
	}

	return (await response.json()) as RSCFetch<T>;
};
