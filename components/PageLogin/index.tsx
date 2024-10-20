import {
  apiCapchaVerification,
  apiCapchaVerificationKey,
  apiLogin,
  apiLoginKey,
} from "@/helpers/apiRoutes";
import { ModelUser } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

type LoginState = "phone" | "capcha";

const PageLogin = () => {
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

  const [loginState, setLoginState] = useState<LoginState>("phone");
  const [valPhone, setValPhone] = useState("09176628061");
  const [valPass, setValPass] = useState("qwerty1234");
  const [valCapcha, setValCapcha] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages("");

    if (loginState === "phone") {
      const r = await refetchLogin();
      console.log(11111, r);

      if (r.error?.message) {
        setErrorMessages(r.error.message);
        return;
      }

      setLoginState("capcha");
    } else {
      // TODO
    }
  };

  return (
    <div className="w-full h-screen flex ">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full mx-auto flex flex-col items-center justify-center gap-3 max-w-64 px-4"
      >
        <p className="text-3xl mb-12">خوش آمدید</p>
        <div className="grid place-items-center">
          <div
            className={`row-start-1 col-start-1 w-full flex flex-col gap-3 transition ease duration-300
              ${
                loginState === "phone"
                  ? "opacity-100"
                  : "opacity-0 translate-x-20 pointer-events-none"
              }`}
          >
            <p className="w-full">شماره موبایل</p>

            <input
              className="w-full h-10 rounded bg-slate-800 px-2 text-center border border-slate-600"
              placeholder="شماره موبال خود را وارد کنید"
              value={valPhone}
              onChange={(e) => setValPhone(e.target.value)}
            />

            <p className="w-full mt-2">رمز عبور</p>
            <input
              className="w-full h-10 rounded bg-slate-800 px-2 text-center border border-slate-600 "
              placeholder="رمز عبور را اینجا وارد کنید"
              value={valPass}
              onChange={(e) => setValPass(e.target.value)}
            />
          </div>

          <div
            className={`row-start-1 col-start-1 w-full flex flex-col gap-3 transition ease duration-300
              ${
                loginState === "capcha"
                  ? "opacity-100"
                  : "opacity-0 -translate-x-20 pointer-events-none"
              }`}
          >
            <button
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

        <button
          type="submit"
          className="w-full h-12 bg-slate-700 mt-8 px-8 rounded disabled:bg-gray-500 transition"
          disabled={isLoginLoading || isCapchaLoading}
        >
          {isLoginLoading || isCapchaLoading
            ? "🤚"
            : loginState === "phone"
            ? "ورود"
            : "ادامه"}
        </button>
      </form>
    </div>
  );
};

export default PageLogin;
