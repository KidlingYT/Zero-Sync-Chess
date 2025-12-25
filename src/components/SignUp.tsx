import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { mutators } from "mutators";

export function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        signUpNewUser();
        mutators.users.create({ email: email, password: password, name: name });

        setIsLoading(false);
    };

    async function signUpNewUser() {
        const supabase = createClient(
            import.meta.env.VITE_SUPABASE_URL,
            import.meta.env.VITE_SUPABASE_ANON_KEY
        );
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: import.meta.env.DEV
                    ? "http://localhost:5173/chessboard"
                    : "http://localhost:5173/chessboard",
            },
        });

        if (error)
            toast.error("Error", {
                description: error.code + "." + error.message,
            });
        else
            toast.success("Success", {
                description: "Account Created Successfully",
            });
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter your email to create your bulletchess account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <a
                        href="/signin"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Sign In
                    </a>
                </p>
            </CardFooter>
        </Card>
    );
}

export default SignUp;
