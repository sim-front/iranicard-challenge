import { ModelTicket, ModelUser } from "@/types/apiTypes";
import axios from "axios";

const api = axios.create({
  baseURL: "https://main-api.iranicard.plzdev.ir/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const apiAuthorizedKey = "authentication-status";
/**
 * Checks if user is logged in or not
 *
 * @returns Success if logged in, error if not
 */
export const apiAuthorized = async () => {
  try {
    const res = await api.get("/authentication-status", {
      data: {
        client_type: "web",
      },
    });

    return res;
  } catch (e: any) {
    const err = e?.response?.data;
    throw err ?? e;
  }
};

export const apiLoginKey = "login";
/**
 * Logs in user with mobile and password
 *
 * @param mobile - Mobile number
 * @param password - Password
 * @returns
 */
export const apiLogin = async (mobile: string, password: string) => {
  try {
    const res = await api.post("/login", {
      mobile,
      password,
    });

    return res;
  } catch (e: any) {
    const err = e?.response?.data;
    throw err ?? e;
  }
};

export const apiLogoutKey = "logout";
export const apiLogout = async () => {
  try {
    const res = await api.post("/logout");

    return res;
  } catch (e: any) {
    const err = e?.response?.data;
    throw err ?? e;
  }
};

export const apiCapchaVerificationKey = "capcha";
export const apiCapchaVerification = async (code: string) => {
  try {
    //
    return "";
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const apiMediaKey = "media";
export const apiMedia = async (images: File[]) => {
  try {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`media[${index}]`, image);
    });
    formData.append("access_type", "private");
    formData.append("section_type", "ticket");

    const res = await api.post("media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const apiNewTicketKey = "new-ticket";
export const apiNewTicket = async (
  // department_id: string,
  subject: string,
  content: string,
  media_ids?: string[]
) => {
  try {
    const res = await api.post("ticket", {
      department_id: "60affd86b04e951f303e437b",
      subject,
      content,
      media_ids: media_ids,
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const apiAnswerTicketKey = "answer-ticket";
export const apiAnswerTicket = async (
  ticketId: string,
  content: string,
  media_ids?: string[]
) => {
  try {
    const res = await api.post(`ticket/${ticketId}/answer`, {
      content,
      media_ids: media_ids,
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const apiAllTicketsKey = "all-tickets";
export const apiAllTickets = async (): Promise<ModelTicket[] | undefined> => {
  try {
    const res = await api.get("ticket", {
      data: {
        page: 1,
      },
    });
    return res.data?.data;
  } catch (e: any) {
    console.error(e?.response ?? e);
    throw e;
  }
};

export const apiTicketXKey = "ticket-x";
export const apiTicketX = async (
  ticketId: string
): Promise<ModelTicket | undefined> => {
  try {
    const res = await api.get(`ticket/${ticketId}`, {});
    return res.data?.data;
  } catch (e: any) {
    console.error(e?.response ?? e);
    throw e;
  }
};
