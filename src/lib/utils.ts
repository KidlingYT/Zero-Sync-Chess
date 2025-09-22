import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v6 } from "uuid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function makeTimestampedUUID() {
    return v6();
}
