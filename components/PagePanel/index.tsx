import { useAppContext } from "@/helpers/_AppContext";
import { useEffect, useState } from "react";
import Button from "../_shared/Button";
import TicketCard from "./TicketCard";
import ModalNewTicket from "../ModalNewTicket";
import { FaTicketAlt } from "react-icons/fa";

type Props = {};

const PagePanel = (p: Props) => {
  const { tickets, refetchTicket, authedIn } = useAppContext();

  const [show, setShow] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  useEffect(() => {
    refetchTicket();
  }, []);

  useEffect(() => {
    if (authedIn !== null) {
      setShow(true);
    }
  }, [authedIn]);

  return (
    <div
      className={`w-full max-w-4xl px-4 mx-auto transition ease duration-300
            ${show ? "opacity-100" : "opacity-0 translate-y-8"}`}
    >
      <Button className="min-w-full h-20" onClick={() => setShowNewModal(true)}>
        تیکت جدید
      </Button>
      {
        // * Cards
      }
      <div className="px-8 py-8 flex flex-wrap justify-center gap-6">
        {tickets &&
          tickets.map((ticket, i) => {
            return <TicketCard key={ticket._id} ticket={ticket} index={i} />;
          })}
      </div>

      {showNewModal && <ModalNewTicket pop={() => setShowNewModal(false)} />}
    </div>
  );
};

export default PagePanel;
