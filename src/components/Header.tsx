import { Button } from "@/components/ui/button";
import { useZero } from "@rocicorp/zero/react";
import { useEffect, useState } from "react";
import { FaChessKnight } from "react-icons/fa";

const Header = () => {
  const z = useZero();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    if (z.userID !== "anon") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="w-full border-b-2 border-gray-100 z-10 fixed top-0 left-0">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2">
          <FaChessKnight className="text-2xl" />
          <span className="text-xl font-bold">ZChess</span>
        </div>
        <div className="text-xl">
          {isLoggedIn ? (
            <span className="text-green-500">Logged in ✔ as {z.userID}</span>
          ) : (
            <span className="text-red-500">Unauthenticated {z.userID}</span>
          )}
        </div>
        <Button variant="ghost" className="bg-white!">
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;
