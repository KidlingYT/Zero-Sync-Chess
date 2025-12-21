// Zero Sync Resource provides access to the zero client instance.
"use client";
import { ZeroProvider } from "@rocicorp/zero/react";
import { Zero, ZeroOptions } from "@rocicorp/zero";
import { schema } from "../../schema.ts";
import { decodeJwt } from "jose";
import Cookie from "js-cookie";
import { mutators } from "mutators.ts";

const encodedJwtToken = Cookie.get("jwt") ?? "";
const decodedJwtToken = encodedJwtToken && decodeJwt(encodedJwtToken);
const userID = decodedJwtToken?.sub ? (decodedJwtToken.sub as string) : "anon";

const opts: ZeroOptions = {
    userID,
    auth: encodedJwtToken,
    schema,
    mutators,
    cacheURL: "http://localhost:4848",
    mutateURL: "http://localhost:3000/api/zero/mutate",
    queryURL: "http://localhost:3000/api/zero/query",
    kvStore: "idb",
};

const z = new Zero(opts);

export const ZeroResource = ({ children }: { children: React.ReactNode }) => {
    return <ZeroProvider zero={z}>{children}</ZeroProvider>;
};
