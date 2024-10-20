import { ModelTicket } from "@/types/apiTypes";
import Button from "../_shared/Button";

const statuses: { [key: string]: string } = {
  pending: "در حال بررسی",
  // ???
};

type Props = {
  ticket: ModelTicket;
  index: number;
};

const TicketCard = (p: Props) => {
  const status = statuses[p.ticket.status] ?? p.ticket.status;

  return (
    <div className="w-full max-w-80 border border-solid border-slate-700 bg-slate-800/25 rounded-xl p-4">
      <p className="text-sm">{p.ticket.department}</p>
      <div className="flex items-center">
        <p className="text-3xl flex-1">{p.ticket.subject}</p>
        <p className="text-green-500">{status}</p>
      </div>
      <p className="mt-8">{p.ticket.created_ago}</p>

      <Button className="w-full">من را در 15 ثانیه خبر کن</Button>
    </div>
  );
};

export default TicketCard;
