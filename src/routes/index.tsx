import { createFileRoute } from "@tanstack/react-router";
import { Vault } from "@/components/vault";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Vault />;
}
