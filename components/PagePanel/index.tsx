import { useAppContext } from "@/helpers/_AppContext";
import { useEffect, useState } from "react";

type Props = {};

const PagePanel = (p: Props) => {
  const { tickets, refetchTicket } = useAppContext();

  const [show, setShow] = useState(false);

  useEffect(() => {
    refetchTicket();
  }, []);

  return (
    <div>
      <p className="text-3xl">PagePanel</p>

      {tickets &&
        tickets.map((ticket) => {
          return <div key={ticket._id}>{ticket.subject}</div>;
        })}
    </div>
  );
};

export default PagePanel;
