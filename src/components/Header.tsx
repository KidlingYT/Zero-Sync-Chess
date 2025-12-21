"use client";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { GiHeavyBullets } from "react-icons/gi";
import { useSecurityUtilityStore } from "@/utilities/security";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false);
    const { securityUtility } = useSecurityUtilityStore();

    useEffect(() => {
        async function getAndSetUser() {
            const isLoggedIn = await securityUtility?.isLoggedIn();
            setIsUserSignedIn(isLoggedIn ?? false);
        }

        getAndSetUser();
    }, [securityUtility]);

    function handleNavigate(path: string) {
        router.push(path);
    }
    return (
        <header className="w-full shadow-sm z-10 fixed top-0 left-0 bg-linear-to-b bg-none text-white">
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
                        onClick={() => handleNavigate("/matching")}
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
                            onClick={() => handleNavigate("/account")}
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
