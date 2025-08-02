import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events/add/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/events/add/"!</div>;
}
