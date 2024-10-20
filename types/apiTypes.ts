export type ModelUser = {
  _id: number;
  number: string;
};

export type ModelTicket = {
  _id: number;
  subject: string;
  display_id: string;
  department: string;
  status: string;
  operator_status: string;
  user: {
    first_name: string;
    last_name: string;
  };
  created_ago: string;
  created_at: string;
};
