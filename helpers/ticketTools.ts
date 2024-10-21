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
