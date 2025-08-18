import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BLANKFEN } from "@/lib/chessGame";
import { useZero } from "@rocicorp/zero/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Schema } from "schema";
import { v4 as uuid } from "uuid";

type Mode = "1" | "5";

const MatchingPage = () => {
    const zero = useZero<Schema>();
    const navigate = useNavigate();
    const [selectedMode, setSelectedMode] = useState<Mode>();
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [timerIntervalId, setTimerIntervalId] = useState();

    function startSearching() {
        // todo api
        setIsSearching(true);
        let timeRemaining = 30;
        const intervalId = setInterval(() => {
            if (timeRemaining <= 0) {
                timeRemaining--;
                clearInterval(intervalId);
                setIsSearching(false);
                // todo go to ai game
            }

            if (timeRemaining < 27) {
                // fake found game
                const gameId = createGame(selectedMode === "1" ? 60 : 300);
                stopSearching();
                clearInterval(intervalId);
                navigate(`/game/${gameId}`);
            }
        }, 1000);

        setTimerIntervalId(timerIntervalId);
    }

    function createGame(timeControl: number): string {
        const gameId = uuid();
        zero.mutate.chess_games.insert({
            id: gameId,
            whitePlayerName: "anon",
            blackPlayerName: "AI",
            is_active: true,
            fen: BLANKFEN,
            whiteTime: timeControl,
            blackTime: timeControl,
        });
        return gameId;
    }
    function stopSearching() {
        setIsSearching(false);
        clearInterval(timerIntervalId);
    }
    function deSelectMode() {
        setSelectedMode(undefined);
        stopSearching();
    }
    function selectMode(mode: Mode) {
        setSelectedMode(mode);
    }
    return (
        <main className="absolute top-0 pt-16 left-0 flex flex-col justify-center items-center bg-neutral-900 w-screen h-screen">
            <Header />
            {/* <p className="m-4">
                Number of people searching for matches: {numPeopleSearching}
            </p> */}
            <div className="p-4 flex gap-4 items-center ">
                <Card
                    className="min-w-24 min-h-24 flex justify-center items-center hover:bg-gray-100 cursor-pointer"
                    style={{
                        backgroundColor:
                            selectedMode === "1" ? "lightblue" : "",
                    }}
                    onClick={() =>
                        selectedMode === "1" ? deSelectMode() : selectMode("1")
                    }
                >
                    <CardContent>
                        <p className="text-xl">{1} Minute Game</p>
                    </CardContent>
                </Card>
                <Card
                    className="min-w-24 min-h-24 flex justify-center items-center hover:bg-gray-100 cursor-pointer"
                    style={{
                        backgroundColor:
                            selectedMode === "5" ? "lightblue" : "",
                    }}
                    onClick={() =>
                        selectedMode === "5" ? deSelectMode() : selectMode("5")
                    }
                >
                    <CardContent>
                        <p className="text-xl">{5} Minute Game</p>
                    </CardContent>
                </Card>{" "}
            </div>
            {selectedMode !== null && (
                <Button
                    className="bg-blue-500! text-white hover:bg-blue-600! mt-4"
                    onClick={() =>
                        isSearching ? stopSearching() : startSearching()
                    }
                    style={{
                        backgroundColor: isSearching ? "lightgrey" : "",
                    }}
                >
                    {isSearching ? "Searching..." : "Search For Match"}
                </Button>
            )}
        </main>
    );
};

export default MatchingPage;
