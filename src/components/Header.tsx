import { Button } from "@/components/ui/button";
import { useZero } from "@rocicorp/zero/react";
import { FaChessKnight } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const z = useZero();

  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false);

  useEffect(() => {
    if (z.userID === "anon") {
      setIsUserSignedIn(false);
    } else setIsUserSignedIn(true);
  }, [z.userID]);

  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }
  return (
    <header className="w-full border-b-2 border-gray-100 z-10 fixed top-0 left-0">
      <div className="flex items-center justify-between px-4 py-2">
        <div
          className="flex items-center space-x-2"
          onClick={() => handleNavigate("/")}
        >
          <FaChessKnight className="text-2xl" />
          <span className="text-xl font-bold">ZChess</span>
        </div>
        {isUserSignedIn === false && (
          <Button
            variant="ghost"
            className="bg-white!"
            onClick={() => handleNavigate("/signin")}
          >
            Sign In
          </Button>
        )}
        {isUserSignedIn === true && (
          <CgProfile
            onClick={() => navigate("/account")}
            size={30}
            className="cursor-pointer"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
