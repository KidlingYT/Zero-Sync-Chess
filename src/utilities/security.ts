// Security Utility encapsulates authentication volatility.
"use client";
import { createClient } from "@supabase/supabase-js";
import { create } from "zustand";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ""
);

export class SecurityUtility {
    constructor() {}

    async loginWithEmailAndPassword(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data.user;
    }

    async signUpNewUser(email: string, password: string, redirectUrl?: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: redirectUrl },
        });
        if (error) throw error;
        return data.user;
    }

    async getSession() {
        return supabase.auth.getSession();
    }

    logout() {
        return supabase.auth.signOut();
    }

    async isLoggedIn() {
        return supabase.auth
            .getSession()
            .then((session) => session.data.session !== null);
    }
}

interface SecurityUtilityStore {
    securityUtility: SecurityUtility | undefined;
    setSecurityUtility: (securityUtility: SecurityUtility | undefined) => void;
}

export const useSecurityUtilityStore = create<SecurityUtilityStore>((set) => ({
    securityUtility: undefined,
    setSecurityUtility: (securityUtility) => set({ securityUtility }),
}));
