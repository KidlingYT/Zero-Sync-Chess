// Zero Sync Resource provides access to the zero client instance.
"use client";
import { ZeroProvider } from "@rocicorp/zero/react";
import { Zero } from "@rocicorp/zero";
import { schema } from "../../schema.ts";
import { decodeJwt } from "jose";
import Cookie from "js-cookie";

const encodedJwtToken = Cookie.get("jwt");
const decodedJwtToken = encodedJwtToken && decodeJwt(encodedJwtToken);
const userID = decodedJwtToken?.sub ? (decodedJwtToken.sub as string) : "anon";

const z = new Zero({
    userID,
    auth: () => encodedJwtToken,
    server: "http://localhost:4848",
    schema,
    kvStore: "idb",
});

export const ZeroResource = ({ children }: { children: React.ReactNode }) => {
    return <ZeroProvider zero={z}>{children}</ZeroProvider>;
};
