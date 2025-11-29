import { Broadcast } from "@/app/lib/api";

interface Props {
  broadcast: Broadcast;
}

export default function BroadcastCard({ broadcast }: Props) {
  return (
    <div className="broadcast-card">
      <h3>{broadcast.title}</h3>
      <p>{broadcast.message}</p>
      <small>{new Date(broadcast.created_at).toLocaleString()}</small>
    </div>
  );
}
