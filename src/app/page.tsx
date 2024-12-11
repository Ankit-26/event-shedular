import { INITIAL_PATH } from "@/config-global";
import { redirect } from "next/navigation";

export default async function HomePage() {
  redirect(INITIAL_PATH);
}
