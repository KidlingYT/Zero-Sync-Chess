"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NoAuthPage = () => {
    const [username, setUsername] = useState<string>(
        localStorage.getItem("username") ?? ""
    );
    const navigate = useNavigate();
    useEffect(() => {
        if (username.length > 0) localStorage.setItem("username", username);
        else toast.info("Set username to begin playing");
    }, [username]);
    return (
        <main className="flex flex-col items-center">
            <Header />
            <div>Enter Username</div>
            <Input
                id="name"
                type="name"
                placeholder="Enter your username"
                className="mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={() => navigate("/matching")} className="mt-4">
                Start
            </Button>
        </main>
    );
};

export default NoAuthPage;
