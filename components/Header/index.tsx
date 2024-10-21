import { useAppContext } from "@/helpers/_AppContext";
import Button from "../_shared/Button";

export const HEADER_HEIGHT = 84;

type Props = {};

const Header = (p: Props) => {
  const { logout } = useAppContext();

  return (
    <div
      style={{
        height: HEADER_HEIGHT,
      }}
      className={`flex items-center gap-2 px-4`}
    >
      <p className="text-3xl flex-1">پنل تیکت ها</p>
      <Button className="min-w-32" onClick={logout}>
        خروج از حساب
      </Button>
    </div>
  );
};

export default Header;
