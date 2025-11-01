// src/pages/Details.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import type { Experience, Slot } from "../types";
import BackButton from "../components/BackButton";

const Details = () => {
    const { id } = useParams();
    const [experience, setExperience] = useState<Experience | null>(null);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>();
    const [selectedTime, setSelectedTime] = useState<string>();
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/experiences/${id}`)
            .then((res) => {
                setExperience(res.data);
                setSlots(res.data.slots ?? []);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return (
            <div className="text-center py-20 text-gray-500 text-[16px] font-inter">
                Loading details...
            </div>
        );

    if (!experience)
        return (
            <div className="text-center py-20 text-red-600 font-inter">
                Experience not found.
            </div>
        );

    const uniqueDates = Array.from(new Set(slots.map((s) => s.date))).filter(Boolean);
    const availableTimes = slots.filter((s) => s.date === selectedDate);

    const subtotal = experience.price * quantity;
    const taxes = Math.round(subtotal * 0.06);
    const total = subtotal + taxes;

    // ✅ Navigate to Checkout page
    const handleCheckout = () => {
        if (!selectedDate || !selectedTime) {
            alert("Please select date and time.");
            return;
        }

        navigate("/checkout", {
            state: { experience, selectedDate, selectedTime, quantity, total },
        });
    };

    const getRemaining = (slot: Slot) => {
        const maybe =
            (slot as any).remaining ??
            (slot as any).left ??
            (slot as any).seatsLeft;
        if (typeof maybe === "number") return maybe;
        const status: string | undefined = (slot as any).status;
        if (typeof status === "string" && status.toLowerCase().includes("sold"))
            return 0;
        return 1;
    };

    const isSoldOut = (slot: Slot): boolean => {
        const rem = Number(getRemaining(slot)) || 0;
        const status = String((slot as any).status || "").toLowerCase();
        return rem <= 0 || status.includes("sold");
    };

    return (
        <main className="min-h-screen bg-[#FAFAFA] font-inter">
            <div className="max-w-[1440px] mx-auto px-[124px] pt-[68px] pb-20">
                <BackButton />

                <div className="flex flex-col lg:flex-row gap-[32px]">
                    {/* LEFT SIDE */}
                    <div className="flex flex-col gap-[32px] w-[765px]">
                        {/* Image */}
                        <img
                            src={experience.imageUrl}
                            alt={experience.title}
                            className="w-[765px] h-[381px] rounded-[12px] object-cover"
                        />

                        {/* Info Section */}
                        <div className="flex flex-col gap-[32px]">
                            {/* Title + Description */}
                            <div>
                                <h1 className="text-[24px] font-medium leading-[32px] text-[#161616]">
                                    {experience.title}
                                </h1>
                                <p className="text-[16px] leading-[24px] text-[#656565] mt-[4px]">
                                    {experience.description}
                                </p>
                            </div>

                            {/* Choose Date */}
                            <div className="flex flex-col gap-[12px]">
                                <h3 className="text-[16px] font-medium text-[#161616]">
                                    Choose date
                                </h3>
                                <div className="flex flex-wrap gap-[12px] w-[389px]">
                                    {uniqueDates.length === 0 ? (
                                        <p className="text-[14px] text-gray-500">
                                            No dates available
                                        </p>
                                    ) : (
                                        uniqueDates.map((date) => (
                                            <button
                                                key={date}
                                                onClick={() => {
                                                    setSelectedDate(date);
                                                    setSelectedTime(undefined);
                                                }}
                                                className={`w-[69px] h-[34px] rounded-[4px] px-[12px] py-[8px] text-[14px] leading-[18px] border transition ${selectedDate === date
                                                        ? "bg-[#FFD83A] text-[#161616] border-transparent"
                                                        : "bg-[#F2F2F2] text-[#656565] hover:bg-[#EAEAEA]"
                                                    }`}
                                            >
                                                {date}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Choose Time */}
                            <div className="flex flex-col gap-[12px]">
                                <h3 className="text-[16px] font-medium text-[#161616]">
                                    Choose time
                                </h3>

                                {selectedDate ? (
                                    <div className="flex flex-wrap gap-[12px]">
                                        {availableTimes.map((slot, idx) => {
                                            const rem = getRemaining(slot);
                                            const sold = isSoldOut(slot);
                                            const selected = selectedTime === slot.time;

                                            const formattedTime = slot.time
                                                ? slot.time
                                                    .replace("AM", "am")
                                                    .replace("PM", "pm")
                                                : slot.time;

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() =>
                                                        !sold && setSelectedTime(slot.time)
                                                    }
                                                    disabled={Boolean(sold)}
                                                    className={`flex items-center justify-center gap-[6px] w-[117px] h-[34px] rounded-[4px] px-[12px] py-[8px] text-[14px] leading-[18px] border-[0.6px] transition ${sold
                                                            ? "bg-[#EAEAEA] text-[#9E9E9E] cursor-not-allowed"
                                                            : selected
                                                                ? "bg-[#FFD83A] text-[#161616] border-transparent"
                                                                : "border-gray-300 text-[#161616] hover:bg-[#F2F2F2]"
                                                        }`}
                                                >
                                                    <span className="font-[400]">
                                                        {formattedTime}
                                                    </span>
                                                    {!sold && rem > 0 && (
                                                        <span className="text-[#FF4C0A] text-[10px] font-medium leading-[12px] ml-[4px]">
                                                            {rem} left
                                                        </span>
                                                    )}
                                                    {sold && (
                                                        <span className="text-[10px] text-[#656565] ml-[4px]">
                                                            Sold out
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-[14px] text-gray-500">
                                        Please select a date first.
                                    </p>
                                )}
                                <p className="text-[12px] text-gray-400 mt-[8px]">
                                    All times are in IST (GMT +5:30)
                                </p>
                            </div>

                            {/* About Section */}
                            <div className="flex flex-col gap-[12px] w-[765px]">
                                <h3 className="text-[16px] font-medium text-[#161616]">
                                    About
                                </h3>
                                <p className="bg-[#F5F5F5] text-[#656565] text-[14px] leading-[20px] px-[12px] py-[8px] rounded-[4px]">
                                    Scenic routes, trained guides, and safety briefing. Minimum
                                    age 10.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <aside className="w-[387px] h-[303px] bg-[#EFEFEF] rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-[24px] flex flex-col gap-[24px]">
                        <div className="flex flex-col gap-[16px] w-[339px] text-[14px] leading-[20px] text-[#656565]">
                            <div className="flex justify-between">
                                <span>Starts at</span>
                                <span className="text-[#161616]">₹{experience.price}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span>Quantity</span>
                                <div className="flex items-center gap-2 text-[#161616]">
                                    <button
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        className="px-2 py-1 border border-gray-300 rounded"
                                    >
                                        –
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        onClick={() => setQuantity((q) => q + 1)}
                                        className="px-2 py-1 border border-gray-300 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-[#161616]">₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between pb-[8px] border-b border-[#D9D9D9]">
                                <span>Taxes</span>
                                <span className="text-[#161616]">₹{taxes}</span>
                            </div>
                        </div>

                        <div className="flex justify-between font-semibold text-[#161616] text-[14px]">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full py-[12px] bg-[#FFD83A] text-[#161616] rounded-[8px] font-semibold text-[15px] hover:opacity-90 transition"
                        >
                            Confirm
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default Details;
