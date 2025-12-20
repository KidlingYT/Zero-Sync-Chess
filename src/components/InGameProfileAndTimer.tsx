import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { mutators } from "@/mutators";

interface ChessProfileProps {
    playerName: string;
    rating: number;
    isTimerActive: boolean;
    gameId: string;
    time: number;
    setTime: Dispatch<SetStateAction<number>>;
}

export default function ChessProfile({
    playerName = "Magnus Carlsen",
    rating = 2850,
    isTimerActive = false,
    gameId = "",
    time = 600,
    setTime,
}: ChessProfileProps) {
    const initialTime = time;
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }

        if (isTimerActive && time > 0) {
            const id = setInterval(() => {
                const newTime = time > 0 ? time - 1 : 0;

                setTime(newTime);

                return newTime;
            }, 100);

            return () => clearInterval(id);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [gameId, intervalId, isTimerActive, time, setTime]);

    useEffect(() => {
        if (time <= 0) {
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
            toast("Timeout!");
            mutators.chess_games.update({ id: gameId, is_active: false });
        }
    }, [time, intervalId, gameId]);

    const formatTime = () => {
        const minutes = Math.floor(time / 600);
        const seconds = Math.floor(time % 600);
        const tenths = Math.floor(time % 10);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().slice(0, 2).padStart(2, "0")}:${tenths.toString().padStart(1, "0")}`;
    };

    return (
        <Card className="w-full max-w-md border shadow-md min-w-96">
            <CardContent>
                <div className="flex items-center justify-between p-1">
                    <div className="flex items-center gap-4">
                        <div>
                            <h3 className="text-lg font-medium mr-4">
                                {playerName}
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge
                            variant="outline"
                            className="text-lg font-mono bg-background"
                        >
                            {rating}
                        </Badge>
                        <span className="text-xs text-muted-foreground mt-1">
                            ELO Rating
                        </span>
                    </div>
                </div>
                <Separator className="mb-2" />
                <div className="text-4xl font-mono font-semibold tracking-widest">
                    {formatTime()}
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 mb-1">
                    <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
                        style={{
                            width: `${(time / initialTime) * 100}%`, // Adjusted for actual game duration
                        }}
                    ></div>
                </div>
            </CardContent>
        </Card>
    );
}
