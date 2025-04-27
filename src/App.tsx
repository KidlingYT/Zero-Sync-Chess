import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ChessBoardPage from "./pages/ChessBoardPage";
import AccountPage from "./pages/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/chessboard" element={<ChessBoardPage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
