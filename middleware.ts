import NextAuth from "next-auth";

import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	if (nextUrl.pathname === "/login" || nextUrl.pathname === "/register") {
		if (isLoggedIn) {
			return Response.redirect(new URL("/", nextUrl));
		}
		return null;
	}

	if (!isLoggedIn) {
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl);

		return Response.redirect(
			new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
		);
	}

	return null;
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
