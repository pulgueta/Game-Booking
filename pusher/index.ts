import Sever from "pusher";
import Client from "pusher-js";

import { env } from "@/envs.mjs";

export const pusherServer = new Sever({
	appId: env.PUSHER_APPID,
	key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
	secret: env.PUSHER_SECRET,
	cluster: "us2",
	useTLS: Boolean(env.PUSHER_TLS),
});

export const pusherClient = new Client(
	process.env.NEXT_PUBLIC_PUSHER_KEY as string,
	{
		cluster: "us2",
	}
);
