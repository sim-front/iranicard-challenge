import { useAppContext } from "@/helpers/_AppContext";
import Button from "../_shared/Button";
import { useRouter } from "next/router";

export const HEADER_HEIGHT = 84;

type Props = {};

const Header = (p: Props) => {
  const { logout, authedIn } = useAppContext();
  const router = useRouter();

  return (
    <div
      style={{
        height: HEADER_HEIGHT,
      }}
      className={`items-center gap-2 px-4 bg-slate-900/75
         ${authedIn === null || authedIn === false ? "hidden" : "flex"}`}
    >
      <p
        onClick={() => router.push("/panel")}
        className="text-3xl flex-1 cursor-pointer select-none "
      >
        پنل تیکت ها
      </p>
      <Button className="min-w-32" onClick={logout}>
        خروج از حساب
      </Button>
    </div>
  );
};

export default Header;
