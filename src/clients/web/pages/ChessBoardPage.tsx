import Header from "@/components/Header";
import InGameProfile from "@/components/InGameProfileAndTimer";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square } from "chess.js";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useQuery, useZero } from "@rocicorp/zero/react";
import { Schema } from "schema";
import { useNavigate } from "react-router-dom";
import { BLANKFEN } from "@/lib/chessGame";

const Home = () => {
    const params = useParams();
    const zero = useZero<Schema>();
    const navigate = useNavigate();

    const [isWhiteTurn, setIsWhiteTurn] = useState<boolean>(false);
    const [isBlackTurn, setIsBlackTurn] = useState<boolean>(false);

    const [chess, setChess] = useState(new Chess(BLANKFEN));
    const [fen, setFen] = useState(chess.fen());

    const [dbGame] = useQuery(
        zero.query.chess_games.where("id", params.gameId ?? "").one()
    );

    useEffect(() => {
        if (dbGame) {
            if (dbGame.is_active === false) {
                setTimeout(() => {
                    toast("This game has ended.");
                    navigate("/matching");
                }, 2000);
            }
            setChess(new Chess(dbGame.fen));
            setFen(dbGame.fen);
        }
    }, [dbGame, navigate]);

    if (params.gameId === undefined) {
        navigate("matching");
        return;
    }

    function updateGame() {
        if (!dbGame?.id) return;
        zero.mutate.chess_games.update({ id: dbGame?.id, fen: chess.fen() });
        setIsWhiteTurn(chess.turn() === "w");
        setIsBlackTurn(chess.turn() === "b");
    }

    function aiMove() {
        setTimeout(() => {
            const moves = chess.moves();
            // Computer random move.
            if (moves.length > 0) {
                const computerMove =
                    moves[Math.floor(Math.random() * moves.length)];
                chess.move(computerMove);
                setFen(chess.fen());
                updateGame();
            }
        }, 1100);
    }

    function handleMove(sourceSquare: Square, targetSquare: Square) {
        if (
            chess.move({ from: sourceSquare, to: targetSquare, promotion: "q" })
        ) {
            updateGame();
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
        zero.mutate.chess_games.update({ id: dbGame!.id, is_active: false });
    }

    if (!dbGame) return <div>Loading...</div>;

    return (
        <main className="absolute top-0 pt-16 left-0 flex flex-col justify-center items-center bg-neutral-900 w-screen h-screen">
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
                        <InGameProfile
                            gameDuration={dbGame.black_time > 100 ? 300 : 60}
                            time={dbGame.black_time}
                            playerName={dbGame.black_player_name}
                            rating={1400}
                            isTimerActive={isBlackTurn}
                            color="Black"
                            gameId={dbGame.id}
                        />
                    </div>
                    <div>
                        <InGameProfile
                            gameDuration={dbGame.black_time > 100 ? 300 : 60}
                            time={dbGame.white_time}
                            color="White"
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
};

export default Home;
