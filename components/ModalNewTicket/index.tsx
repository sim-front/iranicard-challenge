import { apiNewTicket, apiNewTicketKey } from "@/helpers/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import Button from "../_shared/Button";
import { useAppContext } from "@/helpers/_AppContext";

type Props = {
  pop: () => void;
};

const ModelNewTicket = (p: Props) => {
  const { refetchTicket } = useAppContext();

  const [valSubject, setValSubject] = useState("");
  const [valContent, setValContent] = useState("");

  const { refetch: refetchNewTicket } = useQuery({
    queryKey: [apiNewTicketKey],
    queryFn: () => apiNewTicket(valSubject, valContent),
    retry: 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    refetchNewTicket().then(() => {
      refetchTicket();
      p.pop();
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-slate-800/50 flex items-center justify-end
                    pointer-events-all`}
    >
      <div className="w-full max-w-sm mx-auto bg-slate-800 rounded-xl p-4 border border-solid border-slate-700">
        <form onSubmit={handleSubmit}>
          <p className={`text-2xl mb-12 text-center`}>تیکت جدید</p>

          <p className="w-full mb-2">موضوع</p>
          <input
            className="w-full h-10 rounded bg-slate-800 px-2 border border-slate-600"
            placeholder="موضوع را وارد کنید"
            value={valSubject}
            onChange={(e) => setValSubject(e.target.value)}
          />

          <p className="w-full mb-2 mt-4">متن</p>
          <textarea
            className="w-full h-20 rounded bg-slate-800 px-2 border border-slate-600"
            placeholder="متن را وارد کنید"
            value={valContent}
            onChange={(e) => setValContent(e.target.value)}
          />

          <div className="flex w-full">
            <Button
              className="flex-1 me-2"
              onClick={() => {
                refetchNewTicket();
              }}
            >
              ثبت
            </Button>
            <Button
              className="min-w-32"
              onClick={() => {
                p.pop();
              }}
            >
              انصراف
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModelNewTicket;
