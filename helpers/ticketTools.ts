const TicketStatuses: { [key: string]: string } = {
  pending: "در حال بررسی",
  // ???
};

/**
 * Get the Persian name of the ticket status.
 *
 * @param {string} status - The status name.
 * @returns {string} The name in Persian, or the original name if not found.
 */
export const getTicketStatus = (status: string) =>
  TicketStatuses[status] ?? status;

/**
 * Check if a ticket was created in the last minute.
 *
 * @param createdAt Ticket creation date
 * @returns if more than a minute has passed
 */
export const isMinutePassed = (createdAt: string): boolean => {
  const createdAtDate = new Date(createdAt);
  const now = new Date();
  const diffInMinutes = (now.getTime() - createdAtDate.getTime()) / 1000 / 60;
  return diffInMinutes >= 1;
};
