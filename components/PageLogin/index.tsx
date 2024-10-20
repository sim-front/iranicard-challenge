import {
  apiCapchaVerification,
  apiCapchaVerificationKey,
  apiLogin,
  apiLoginKey,
} from "@/helpers/apiRoutes";
import { ModelUser } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";

type LoginState = "phone" | "capcha";
const ASK_FOR_CAPCHA = false;
const SHOW_DURATION = 2000;
const HIDE_DURATION = 700;

const PageLogin = () => {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [loginState, setLoginState] = useState<LoginState>("phone");
  const [valPhone, setValPhone] = useState("09176628061");
  const [valPass, setValPass] = useState("qwerty1234");
  const [valCapcha, setValCapcha] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const refTimeoutMoveToPanel = useRef<NodeJS.Timeout>();

  const duration = show ? SHOW_DURATION : HIDE_DURATION;

  const {
    data: loginData,
    error: loginError,
    isLoading: isLoginLoading,
    refetch: refetchLogin,
  } = useQuery({
    queryKey: [apiLoginKey],
    queryFn: () => apiLogin(valPhone, valPass),
    retry: 0,
  });

  const {
    data: capchaData,
    error: capchaError,
    isLoading: isCapchaLoading,
    refetch: refetchCapcha,
  } = useQuery({
    queryKey: [apiCapchaVerificationKey],
    queryFn: () => apiCapchaVerification(valCapcha),
    retry: 0,
  });

  const moveToPanel = () => {
    setShow(false);
    refTimeoutMoveToPanel.current = setTimeout(() => {
      router.push("/panel");
    }, HIDE_DURATION);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages("");

    if (ASK_FOR_CAPCHA && loginState === "phone") {
      setLoginState("capcha");
      return;
    }

    if (loginState === "phone") {
      const r = await refetchLogin();

      if (r.error?.message) {
        setErrorMessages(r.error.message);
        return;
      }

      moveToPanel();
    }
  };

  useEffect(() => {
    setShow(true);

    return () => {
      clearTimeout(refTimeoutMoveToPanel.current);
    };
  }, []);

  return (
    <div className="w-full h-screen flex ">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full mx-auto flex flex-col items-center justify-center gap-3 max-w-64 px-4"
      >
        <p
          className={`text-3xl mb-12 
          ${show ? "opacity-100" : "opacity-0 translate-y-20"}`}
          style={{
            transition: `opacity ${duration * 0.6}ms ease, 
            transform ${duration * 0.5}ms ease ${duration * 0.6}ms`,
          }}
        >
          خوش آمدید
        </p>

        {
          // * User pass stuff
        }
        <div className="grid place-items-center">
          <div
            className={`row-start-1 col-start-1 w-full flex flex-col gap-3 transition ease duration-300
              ${
                loginState === "phone"
                  ? "opacity-100"
                  : "opacity-0 translate-x-20 pointer-events-none"
              }`}
          >
            <div
              className={`transition ease ${
                show ? "opacity-100" : "opacity-0 translate-y-20"
              }`}
              style={{
                transitionDuration: duration * 0.2 + "ms",
                transitionDelay: duration * 0.6 + "ms",
              }}
            >
              <p className="w-full mb-2">شماره موبایل</p>
              <input
                className="w-full h-10 rounded bg-slate-800 px-2 text-center border border-slate-600"
                placeholder="شماره موبال خود را وارد کنید"
                value={valPhone}
                onChange={(e) => setValPhone(e.target.value)}
              />
            </div>

            <div
              className={`transition ease ${
                show ? "opacity-100" : "opacity-0 translate-y-20"
              }`}
              style={{
                transitionDuration: duration * 0.2 + "ms",
                transitionDelay: duration * 0.7 + "ms",
              }}
            >
              <p className="w-full mt-2">رمز عبور</p>
              <input
                className="w-full h-10 rounded bg-slate-800 px-2 text-center border border-slate-600 "
                placeholder="رمز عبور را اینجا وارد کنید"
                value={valPass}
                onChange={(e) => setValPass(e.target.value)}
              />
            </div>
          </div>

          {
            // * Capcha stuff
          }
          <div
            className={`row-start-1 col-start-1 w-full flex flex-col gap-3 transition ease duration-300
              ${
                loginState === "capcha"
                  ? "opacity-100"
                  : "opacity-0 -translate-x-20 pointer-events-none"
              }`}
          >
            <button
              type="button"
              className="self-start mb-4"
              onClick={() => setLoginState("phone")}
            >
              {"<"} تغییر شماره
            </button>
            <p className="w-full mt-2">تست انسان</p>
            <input
              className="w-full h-10 rounded bg-slate-800 px-2 text-center border border-slate-600 "
              placeholder="عدد در تصویر بالا را اینجا وارد کنید"
              value={valCapcha}
              onChange={(e) => setValCapcha(e.target.value)}
            />
          </div>
        </div>

        {errorMessages && (
          <p className="text-red-500 w-full px-4 mt-2 border border-red-900 rounded p-2 bg-red-900/25 ">
            {errorMessages}
          </p>
        )}

        {
          // * Submit button
        }
        <div
          className={`w-full transition ease ${
            show ? "opacity-100" : "opacity-0 translate-y-20"
          }`}
          style={{
            transitionDuration: duration * 0.2 + "ms",
            transitionDelay: duration * 0.8 + "ms",
          }}
        >
          <button
            type="submit"
            className="w-full h-12 bg-slate-700 mt-8 px-8 rounded disabled:bg-gray-500 transition ease duration-300 hover:bg-slate-600"
            disabled={isLoginLoading || isCapchaLoading}
          >
            {isLoginLoading || isCapchaLoading
              ? "🤚"
              : loginState === "phone"
              ? "ورود"
              : "ادامه"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageLogin;
