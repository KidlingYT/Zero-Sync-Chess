import { ZeroResource } from "@/resources/zeroSyncResource";
import "./globals.css";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ZeroResource>{children}</ZeroResource>
            </body>
        </html>
    );
}
