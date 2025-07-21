import { Button } from "@/components/ui/button";
import { useZero } from "@rocicorp/zero/react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiHeavyBullets } from "react-icons/gi";

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
        <header className="w-full shadow-sm z-10 fixed top-0 left-0 bg-linear-to-b from-neutral-800 to-neutral-900 text-white">
            <div className="flex items-center justify-between px-4 py-2">
                <div
                    className="flex items-center space-x-2"
                    onClick={() => handleNavigate("/")}
                >
                    <span className="text-2xl font-bold flex items-center">
                        Bu
                        <GiHeavyBullets />
                        et Chess
                    </span>
                </div>
                <div>
                    <Button
                        onClick={() => navigate("/matching")}
                        className="bg-blue-500! text-white hover:bg-blue-600! mr-4"
                    >
                        New Game
                    </Button>
                    {isUserSignedIn === false && (
                        <Button
                            variant="ghost"
                            className="bg-white! text-black"
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
            </div>
        </header>
    );
};

export default Header;
