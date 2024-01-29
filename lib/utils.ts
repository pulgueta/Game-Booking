import { UrlObject } from "url";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { env } from "@/envs.mjs";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const rscFetch = async <T>(
	endpoint: UrlObject | __next_route_internal_types__.RouteImpl<"">
): Promise<T> => (await fetch(`${env.HOST}${endpoint}`)).json() as T;
