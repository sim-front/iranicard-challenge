import { apiTicketX, apiTicketXKey } from "@/helpers/apiRoutes";
import { ModelTicket } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../_shared/Button";
import { getTicketStatus } from "@/helpers/ticketTools";
import { IoSend } from "react-icons/io5";
import { BiImageAdd } from "react-icons/bi";

type Props = {};

const PageTicketItem = (p: Props) => {
  const router = useRouter();
  const { ticketId } = router.query;

  const {
    data: dataTicket,
    error: errorTicket,
    isLoading: isLoadingTicket,
    refetch: refetchTicket,
  } = useQuery({
    queryKey: [apiTicketXKey],
    queryFn: () => apiTicketX(ticketId as string),
    enabled: false,
  });

  useEffect(() => {
    if (ticketId) refetchTicket();
  }, [ticketId]);

  return (
    <div
      className={`w-full h-screen flex flex-col bg-slate-700
                items-center justify-center px-4`}
    >
      {!dataTicket && !errorTicket ? (
        // * Loading

        <p className="text-xl text-center">در حال دریافت...</p>
      ) : dataTicket ? (
        // * Success

        <div className="w-full h-full flex flex-col items-center">
          {
            // * Top info
          }
          <div className="w-full p-4">
            <p className="text-sm opacity-80 mb-2">{dataTicket.department}</p>
            <p className="text-2xl">
              <span className="text-sm opacity-70">عنوان: </span>
              {dataTicket.subject}
            </p>
            <p>
              <span className="text-sm opacity-70">وضعیت: </span>
              {getTicketStatus(dataTicket.status)}
            </p>
          </div>

          {
            // * Messages
          }
          <div
            className="w-full p-4 flex flex-col gap-4 border border-solid border-slate-900 
                        rounded-2xl bg-slate-800/50 flex-1"
          ></div>

          {
            // * Prompt bar
          }
          <div className=" w-full mt-4 mb-2 flex">
            <div className="p-3 flex flex-col items-center">
              <IoSend className="text-3xl " />
              <BiImageAdd className="text-3xl mt-4" />
            </div>

            <textarea
              className="flex-1 p-4 border border-solid border-slate-900 
                        rounded-2xl bg-slate-800 max-h-60 min-h-20"
              placeholder="پیام خود را اینجا بنویسید..."
            />
          </div>
        </div>
      ) : (
        // * Error

        <div className="flex flex-col items-center">
          <p className="text-xl text-center">خطایی رخ داده است</p>
          <Button onClick={() => refetchTicket()}>تلاش دوباره</Button>
        </div>
      )}
    </div>
  );
};

export default PageTicketItem;
