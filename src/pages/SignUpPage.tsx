import Header from "@/components/Header";
import SignUp from "@/components/SignUp";

const SignUpPage = () => {
    return (
        <main className="absolute top-0 pt-16 left-0 flex flex-col justify-center items-center bg-neutral-900 w-screen h-screen">
            <Header />
            <SignUp />
        </main>
    );
};

export default SignUpPage;
