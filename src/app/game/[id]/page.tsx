"use client";
import Header from "@/components/Header";
import ChessProfile from "@/components/InGameProfileAndTimer";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square } from "chess.js";
import { toast, Toaster } from "sonner";
import { useParams } from "react-router-dom";
import { useQuery } from "@rocicorp/zero/react";
import { BLANKFEN } from "@/utilities/lib/chessGame";
import { queries } from "queries";
import { useRouter } from "next/navigation";
import { mutators } from "mutators";

export default function Page() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const [isWhiteTurn, setIsWhiteTurn] = useState<boolean>(false);
    const [isBlackTurn, setIsBlackTurn] = useState<boolean>(false);
    const [blackTime, setBlackTime] = useState<number>(600); // tenths
    const [whiteTime, setWhiteTime] = useState<number>(600); // tenths

    const [chess, setChess] = useState(new Chess(BLANKFEN));
    const [fen, setFen] = useState(chess.fen());

    const [dbGame] = useQuery(queries.chess_games.one({ id: params.id ?? "" }));

    useEffect(() => {
        if (dbGame) {
            console.log({ isBlackTurn, isWhiteTurn });
            if (dbGame.is_active === false) {
                toast("This game has ended.");
                setTimeout(() => {
                    router.push("/matching");
                }, 2000);
            }
            const chessGame = new Chess(dbGame.fen);
            setChess(chessGame);
            setFen(dbGame.fen);
            setWhiteTime(dbGame.white_time);
            setBlackTime(dbGame.black_time);
            if (isWhiteTurn === false && isBlackTurn === false) {
                setIsWhiteTurn(chessGame.turn() === "w");
                setIsBlackTurn(chessGame.turn() === "b");
            }
        }
    }, [dbGame, router, isBlackTurn, isWhiteTurn]);

    if (params.id === undefined) {
        router.push("/matching");
        return;
    }

    function updateGame({ bT, wT }: { bT?: number; wT?: number }) {
        if (!dbGame?.id) return;
        mutators.chess_games.update({
            id: dbGame?.id,
            fen: chess.fen(),
            white_time: wT ?? whiteTime,
            black_time: bT ?? blackTime,
        });
        setIsWhiteTurn(chess.turn() === "w");
        setIsBlackTurn(chess.turn() === "b");
    }

    async function aiMove() {
        const moves = chess.moves();
        if (moves.length > 0) {
            const computerMove =
                moves[Math.floor(Math.random() * moves.length)];
            const move = new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1100);
            });

            move.then(() => {
                chess.move(computerMove);
                updateGame({ bT: blackTime - 11 });
            });
        }
    }

    function handleMove(sourceSquare: Square, targetSquare: Square) {
        let isValidMove = false;
        try {
            chess.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q",
            });
            isValidMove = true;
        } catch (error) {
            console.log(error);
        }

        if (isValidMove) {
            updateGame({});
            if (chess.isCheckmate()) {
                toast.info("Game over, checkmate!");
                endGame();
                return true;
            }
            if (chess.isDraw()) {
                toast.info("Game over, draw!");
                endGame();
                return true;
            }
            aiMove();
            return true;
        }

        return false;
    }

    function endGame() {
        setIsBlackTurn(false);
        setIsWhiteTurn(false);
        mutators.chess_games.update({ id: dbGame!.id, is_active: false });
    }

    if (!dbGame) return <div>Loading...</div>;

    return (
        <main className="absolute top-0 pt-16 left-0 flex flex-col justify-center items-center bg-neutral-900 w-screen h-screen">
            <Toaster />
            <Header />
            <div className="md:flex-row flex flex-col justify-center">
                <div className="h-full max-w-[70vw] min-h-[70vh] aspect-square max-h-[70vh] border-2 border-gray-100 shadow-md ">
                    <Chessboard
                        id={"mainBoard"}
                        position={fen} // onDrop prop tracks everytime a piece is moved.
                        // The rest is handled in the the handleMove function.
                        onPieceDrop={(sourceSquare, targetSquare) =>
                            handleMove(sourceSquare, targetSquare)
                        }
                        onPromotionPieceSelect={() => true}
                        animationDuration={0}
                    />
                </div>
                <div className="flex md:flex-col justify-between ml-4">
                    <div>
                        <ChessProfile
                            time={blackTime}
                            setTime={setBlackTime}
                            playerName={dbGame.black_player_name}
                            rating={1400}
                            isTimerActive={isBlackTurn}
                            gameId={dbGame.id}
                        />
                    </div>
                    <div>
                        <ChessProfile
                            time={whiteTime}
                            setTime={setWhiteTime}
                            gameId={dbGame.id}
                            playerName={dbGame.white_player_name}
                            rating={2000}
                            isTimerActive={isWhiteTurn}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
