import { Button } from "@/components/ui/button";
import { FaChessKnight } from "react-icons/fa";

const Header = () => {
  const isLoggedIn = false; // TODO: Replace with actual authentication logic
  return (
    <header className="w-full border-b-2 border-gray-100 z-10 fixed top-0 left-0">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2">
          <FaChessKnight className="text-2xl" />
          <span className="text-xl font-bold">ZChess</span>
        </div>
        <div className="text-xl">
          {isLoggedIn ? (
            <span className="text-green-500">Logged in ✔</span>
          ) : (
            <span className="text-red-500">Unauthenticated</span>
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
