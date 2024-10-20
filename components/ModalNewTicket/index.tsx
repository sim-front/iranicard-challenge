import { apiNewTicket, apiNewTicketKey } from "@/helpers/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Props = {
  pop: () => void;
};

const ModelNewTicket = (p: Props) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const {
    data: newTicketData,
    error: newTicketError,
    isLoading: isNewTicketLoading,
    refetch: refetchNewTicket,
  } = useQuery({
    queryKey: [apiNewTicketKey],
    queryFn: () => apiNewTicket(subject, content),
    retry: 0,
  });

  useEffect(() => {
    if (newTicketData) {
      p.pop();
    }
  }, [newTicketData]);

  return (
    <div
      className={`fixed inset-0 bg-slate-800/50 flex items-center justify-end
                    pointer-events-all`}
    >
      <div className="w-full max-w-sm mx-auto bg-slate-800 rounded-xl p-4 border border-solid border-slate-700">
        <form onSubmit={() => refetchNewTicket()}></form>
      </div>
    </div>
  );
};

export default ModelNewTicket;
