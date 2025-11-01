// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";

const App = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#161616] font-inter">
      <Header />
      <main className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
