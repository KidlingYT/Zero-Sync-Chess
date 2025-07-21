// eventually a real auth
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface Auth {
    complete: boolean;
    isAuthenticated: boolean;
}

export async function useAuth(): Promise<Auth> {
    const auth = supabase.auth;
    const user = await auth.getUser();
    if (user.data.user !== null)
        return { complete: true, isAuthenticated: true };
    else {
        return { complete: true, isAuthenticated: false };
    }
}

export function useUsername() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    if (username !== null && username.length > 0) return { username };
    else navigate("/username");
}
