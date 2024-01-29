import Sever from "pusher";
import Client from "pusher-js";

import { env } from "@/envs.mjs";

export const pusherServer = new Sever({
	appId: env.PUSHER_APPID,
	key: env.PUSHER_KEY,
	secret: env.PUSHER_SECRET,
	cluster: env.PUSHER_CLUSTER,
	useTLS: env.PUSHER_TLS,
});

export const pusherClient = new Client("", {
	cluster: env.PUSHER_CLUSTER,
	authEndpoint: "",
});
