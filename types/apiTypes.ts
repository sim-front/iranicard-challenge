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
  messages: ModelMessage[];
  created_ago: string;
  created_at: string;
};

export type Media = {
  orginal_name: string;
  mime: string;
  url: string;
  thumbnail_url: string;
};

export type ModelMessage = {
  content: string;
  media_ids: string[];
  ip_address: string;
  medias: Media[];
  created_at: string;
  created_ago: string;
  send_type: "user-to-operator" | "operator-to-user";
  score: number | null;
  deleted_at: string | null;
  deleted_by: string | null;
};
