import { ModelUser } from "@/types/apiTypes";
import axios from "axios";

const api = axios.create({
  baseURL: "https://main-api.iranicard.plzdev.ir/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const apiAuthorizedKey = "authentication-status";
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

export const apiNewTicketKey = "ticket";
export const apiNewTicket = async (
  department_id: string,
  subject: string,
  content: string
) => {
  try {
    const res = await api.post<ModelUser>("ticket", {
      department_id,
      subject,
      content,
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
