import { useAppContext } from "@/helpers/_AppContext";
import { useEffect, useState } from "react";
import Button from "../_shared/Button";

type Props = {};

const PagePanel = (p: Props) => {
  const { tickets, refetchTicket, logout } = useAppContext();

  const [show, setShow] = useState(false);

  useEffect(() => {
    refetchTicket();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {
        // * Header
      }
      <div className="flex items-center gap-2">
        <p className="text-3xl flex-1">پنل تیکت ها</p>
        <Button className="">تیکت جدید</Button>
        <Button onClick={logout} className="">
          خروج از جساب
        </Button>
      </div>

      {
        // * Cards
      }
      {tickets &&
        tickets.map((ticket) => {
          return <div key={ticket._id}>{ticket.subject}</div>;
        })}
    </div>
  );
};

export default PagePanel;
