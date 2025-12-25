"use client";
import Header from "@/components/Header";

const NoAuthPage = () => {
    return (
        <main className="flex flex-col items-center">
            <Header />
            <div>Unauthorized</div>
        </main>
    );
};

export default NoAuthPage;
