import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/wydarzenia/dodaj/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/events/add/"!</div>;
}
