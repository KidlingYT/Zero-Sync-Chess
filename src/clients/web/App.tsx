"use client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "../../app/signin/page";
import SignUpPage from "../../app/signup/page";
import ChessBoardPage from "../../app/game/[id]/page";
import AccountPage from "../../app/account/page";
import MatchingPage from "../../app/matching/page";
import NoAuthPage from "../../app/noauth/page";

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
