import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RedirectUser() {
    const user = await currentUser();

    const role = user?.username;

    if (role) {
        redirect(`/${role}`)
    }

    return null;
}