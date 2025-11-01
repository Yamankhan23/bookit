// src/pages/Confirmation.tsx
import { useLocation, useNavigate } from "react-router-dom";

const generateRef = () => {
    // Example format: HUF56&SO (keeps similar style length)
    const a = Math.random().toString(36).substring(2, 5).toUpperCase();
    const b = Math.floor(100 + Math.random() * 900).toString();
    const c = Math.random().toString(36).substring(2, 4).toUpperCase();
    return `${a}${b}&${c}`;
};

const Confirmation = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { total } = (state as any) || {};

    // If a ref id exists in state you can use it, otherwise generate one
    const refId = (state as any)?.refId ?? generateRef();

    return (
        <main className="bg-[#F9F9F9] min-h-screen font-inter pt-[80px]">
            {/* Keep content vertically near top like the Figma screenshot */}
            <div className="max-w-[920px] mx-auto px-[124px]">
                <div className="flex flex-col items-center mt-8">
                    {/* Success icon */}
                    <div className="w-[80px] h-[80px] rounded-full bg-[#2ECC71] flex items-center justify-center">
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 26 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 9.5L7.5 15.5L25 1"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>



                    {/* Heading */}
                    <h1 className="text-[28px] font-medium text-[#161616] mt-6">
                        Booking Confirmed
                    </h1>

                    {/* Ref ID line (matches Figma sizing & color) */}
                    <p className="text-[20px] text-[#656565] mt-2">
                        Ref ID: <span className="font-medium text-[#656565]">{refId}</span>
                    </p>

                    {/* Optional total — keep hidden if not needed; shown only if total provided */}
                    {typeof total !== "undefined" && (
                        <p className="text-[14px] text-[#656565] mt-2">
                            Paid: <span className="font-semibold text-[#161616]">₹{total}</span>
                        </p>
                    )}

                    {/* small 'Back to Home' button as in screenshot */}
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 bg-[#EDEDED] text-[#585858] px-4 py-2 rounded-md text-[14px] hover:opacity-95 transition"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Confirmation;
