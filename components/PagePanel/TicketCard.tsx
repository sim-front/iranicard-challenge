import { ModelTicket } from "@/types/apiTypes";
import Button from "../_shared/Button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getTicketStatus } from "@/helpers/ticketTools";

type Props = {
  ticket: ModelTicket;
  index: number;
};

const TicketCard = (p: Props) => {
  const [show, setShow] = useState(false);

  const status = getTicketStatus(p.ticket.status);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Link
      href={`/panel/${p.ticket._id}`}
      className="w-full max-w-80 hover:bg-slate-800/50"
    >
      <div
        className={`w-full max-w-80 border border-solid border-slate-700 rounded-xl p-4
            transition ease duration-200 bg-slate-800/25 
            ${show ? "opacity-100" : "opacity-0 translate-y-8"}`}
        style={{
          transitionDelay: `${500 + p.index * 50}ms`,
        }}
      >
        <p className="text-sm">{p.ticket.department}</p>
        <div className="flex items-center">
          <p className="text-3xl flex-1">{p.ticket.subject}</p>
          <p className="text-green-500">{status}</p>
        </div>
        <p className="mt-8">{p.ticket.created_ago}</p>
      </div>
    </Link>
  );
};

export default TicketCard;
