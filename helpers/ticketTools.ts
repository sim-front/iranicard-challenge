const TicketStatuses: { [key: string]: string } = {
  pending: "در حال بررسی",
  // ???
};

export const getTicketStatus = (status: string) =>
  TicketStatuses[status] ?? status;
