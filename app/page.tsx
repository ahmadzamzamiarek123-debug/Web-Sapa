import { getComments } from "@/app/actions";
import HomeClient from "@/app/components/HomeClient";

export default async function Home() {
  // Fetch comments on the server side
  const comments = await getComments();

  return <HomeClient initialComments={comments} />;
}
