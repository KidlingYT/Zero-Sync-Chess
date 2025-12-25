"use client";
import Header from "@/components/Header";
import SignIn from "../../components/SignIn";

const SignInPage = () => {
    return (
        <main className="absolute top-0 left-0 flex flex-col justify-center items-center bg-[url('/chess.jpg')] bg-no-repeat bg-cover bg-center bg-fixed w-screen">
            <Header />
            <div className="h-screen flex flex-col justify-center items-center w-full">
                <p className="text-white text-3xl py-12">
                    Built using Rocicorp's
                    <a
                        href="https://zero.rocicorp.dev/"
                        className="pl-2 hover:text-blue-600 text-blue-500"
                    >
                        Zero
                    </a>
                    :{" "}
                </p>
                <SignIn />
            </div>
        </main>
    );
};

export default SignInPage;
