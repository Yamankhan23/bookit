import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState("");

    // Keep input value in sync with URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setQuery(params.get("q") || "");
    }, [location.search]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        navigate(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/");
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] z-50 font-inter">
            <div className="max-w-[1440px] h-[87px] mx-auto flex items-center justify-between px-[124px]">
                {/* Logo */}
                <img
                    src="https://www.highwaydelite.com/assets/logo2-B7c2KXHT.webp"
                    alt="highway delite"
                    width={100}
                    height={55}
                    className="object-contain cursor-pointer"
                    onClick={() => navigate("/")}
                />

                {/* Search bar */}
                <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-[10px]"
                >
                    <input
                        type="text"
                        placeholder="Search experiences"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-[320px] h-[42px] rounded-[8px] border border-[#E5E5E5] px-4 text-[15px] text-[#727272] placeholder-[#B3B3B3] focus:outline-none focus:ring-2 focus:ring-[#FFD643]/40 transition-all"
                    />
                    <button
                        type="submit"
                        className="bg-[#FFD643] h-[42px] px-[20px] py-[12px] rounded-[8px] text-[#161616] font-medium hover:bg-[#F4C900] transition-transform duration-200 hover:-translate-y-[1px]"
                    >
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
};

export default Header;
