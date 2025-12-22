"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { BLANKFEN } from "@/utilities/lib/chessGame";
import { useZero } from "@rocicorp/zero/react";
import { mutators } from "mutators";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const BulletButton = ({
    seconds,
    selected,
    onClick,
}: {
    seconds: number;
    selected: boolean;
    onClick: () => void;
}) => {
    return (
        <svg
            onClick={onClick}
            width="120"
            height="50"
            viewBox="0 0 120 50"
            className="cursor-pointer transition-transform hover:scale-105"
        >
            {/* Capsule body */}
            <rect
                x="20"
                y="10"
                width="80"
                height="30"
                rx="15"
                fill={selected ? "#2563eb" : "#27272a"}
                stroke={selected ? "#3b82f6" : "#3f3f46"}
                strokeWidth="2"
            />
            {/* Pointed tip */}
            <polygon
                points="100,10 120,25 100,40"
                fill={selected ? "#2563eb" : "#27272a"}
                stroke={selected ? "#3b82f6" : "#3f3f46"}
                strokeWidth="2"
            />
            {/* Text label */}
            <text
                x="60"
                y="30"
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="white"
                fontSize="16"
                fontWeight="bold"
                pointerEvents="none"
            >
                {seconds}s
            </text>
        </svg>
    );
};

const MatchingPage = () => {
    const router = useRouter();
    const z = useZero();
    const [selectedMode, setSelectedMode] = useState<number | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const toggleMode = (mode: number) =>
        setSelectedMode((prev) => (prev === mode ? null : mode));

    function stopSearching() {
        setIsSearching(false);
    }

    async function startSearching() {
        // todo api
        const gameId = await createGame(selectedMode ?? 60);
        stopSearching();
        router.push(`/game/${gameId}`);
    }

    async function createGame(timeControl: number) {
        const id = uuid();
        await z.mutate(
            mutators.chess_games.create({
                id: id,
                white_player_name: "You",
                black_player_name: "AI",
                is_active: true,
                fen: BLANKFEN,
                white_time: timeControl * 10,
                black_time: timeControl * 10, // tenths
            })
        );
        return id;
    }

    const bulletModes = [15, 30, 60];

    return (
        <main className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center bg-[url('/chess.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
            <Header />
            <div className="my-auto">
                <h2 className=" text-3xl font-bold text-white">
                    Choose Your Bullet Mode
                </h2>

                <div className="flex gap-6 mt-8">
                    {bulletModes.map((mode) => (
                        <BulletButton
                            key={mode}
                            seconds={mode}
                            selected={selectedMode === mode}
                            onClick={() => toggleMode(mode)}
                        />
                    ))}
                </div>

                {selectedMode && (
                    <Button
                        className={`mt-10 px-10 py-4 text-lg font-medium transition-colors rounded-full
            ${isSearching ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}
          `}
                        onClick={() =>
                            isSearching ? stopSearching() : startSearching()
                        }
                    >
                        {isSearching ? "Searching..." : "Find Bullet Match"}
                    </Button>
                )}
            </div>
        </main>
    );
};

export default MatchingPage;
