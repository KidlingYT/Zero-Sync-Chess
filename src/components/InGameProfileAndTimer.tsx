import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";

interface ChessProfileProps {
  playerName: string;
  rating: number;
  isTimerActive: boolean;
}

export default function ChessProfile({
  playerName = "Magnus Carlsen",
  rating = 2850,
  isTimerActive = false,
}: ChessProfileProps) {
  const [time, setTime] = useState(60 * 5); // 5 minutes in seconds
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing interval
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    if (isTimerActive && time > 0) {
      // Start the timer
      const id = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 0.1;
          } else {
            return 0;
          }
        });
      }, 100);
      setIntervalId(id);
    }

    // Cleanup: Clear the interval when the component unmounts or when isTimerActive changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isTimerActive, time]);

  useEffect(() => {
    if (time <= 0) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setTime(0);
    }
  }, [time, intervalId]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const centiseconds = Math.floor((time % 1) * 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(1, "0")}`;
  };

  return (
    <Card className="w-full max-w-md border shadow-md min-w-96">
      <CardContent>
        <div className="flex items-center justify-between p-1">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-lg font-medium mr-4">{playerName}</h3>
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
            style={{ width: `${(time / (60 * 5)) * 100}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}
