import { ClientEvent } from "../types";

const event: ClientEvent<"ready"> = {
    title: "ready",
    listener: (client) => {
        console.log(`Logged in as ${client.user.tag}`)
    },
    once: true
}

export default event