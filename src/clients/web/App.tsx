"use client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "../../app/signin/page";
import SignUpPage from "./pages/SignUpPage";
import ChessBoardPage from "../../app/game/[id]/page";
import AccountPage from "./pages/Account";
import MatchingPage from "../../app/matching/page";
import NoAuthPage from "./pages/NoAuthPage";

function DesktopApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignInPage />}></Route>
                <Route path="/matching" element={<MatchingPage />} />
                <Route path="/" element={<SignUpPage />}></Route>
                <Route path="/signup" element={<SignUpPage />}></Route>
                <Route
                    path="/game/:gameId"
                    element={<ChessBoardPage />}
                ></Route>
                <Route path="/account" element={<AccountPage />}></Route>
                <Route path="/username" element={<NoAuthPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default DesktopApp;
