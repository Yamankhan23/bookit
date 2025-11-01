// src/pages/Checkout.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../api/axiosClient";
import BackButton from "../components/BackButton";

const Checkout = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { experience, selectedDate, selectedTime, quantity } = state || {};

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        promo: "",
    });
    const [promoApplied, setPromoApplied] = useState(false);
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);


    if (!experience)
        return (
            <div className="text-center py-20 text-[#656565] font-inter">
                No booking data found.
            </div>
        );

    const subtotal = experience.price * quantity;
    const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
    const taxes = Math.round(subtotal * 0.06);
    const total = subtotal - discount + taxes;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const applyPromo = () => {
        if (formData.promo.trim().toUpperCase() === "SAVE10") {
            setPromoApplied(true);
            alert("Promo applied");
        } else {
            alert("Invalid promo");
        }
    };

    const handlePayment = async () => {
        if (!formData.name || !formData.email) {
            alert("Please fill required fields");
            return;
        }
        if (!agree) {
            alert("Please agree to terms and safety policy");
            return;
        }

        try {
            await axiosClient.post("/bookings", {
                name: formData.name,
                email: formData.email,
                date: selectedDate,
                time: selectedTime,
                totalPrice: total,
                experienceId: experience.id,
                quantity,
            });

            navigate("/confirmation", {
                state: { experience, selectedDate, selectedTime, total },
            });
        } catch (err) {
            alert("Error processing booking. Try again.");
        }
    };

    return (
        <main className="bg-[#FAFAFA] min-h-screen font-inter">
            {/* Full-width wrapper, aligned with header search bar */}
            <div className="max-w-[1440px] mx-auto px-[150px] pt-[68px] pb-20">
                <BackButton />

                {/* Flex layout for form + summary */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-[40px] mt-[24px]">
                    {/* LEFT FORM SECTION */}
                    <div className="w-[739px] bg-[#F5F5F5] rounded-[12px] pt-[20px] pr-[24px] pb-[20px] pl-[24px] flex flex-col gap-[16px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                            <div>
                                <label className="block text-[14px] text-[#161616] mb-[4px] font-medium">
                                    Full name
                                </label>
                                <input
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full h-[42px] px-[12px] rounded-[6px] bg-[#EAEAEA] text-[#161616] text-[14px] focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[14px] text-[#161616] mb-[4px] font-medium">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full h-[42px] px-[12px] rounded-[6px] bg-[#EAEAEA] text-[#161616] text-[14px] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="block text-[14px] text-[#161616] font-medium">
                                Promo code
                            </label>
                            <div className="flex gap-[8px]">
                                <input
                                    name="promo"
                                    placeholder="Promo code"
                                    value={formData.promo}
                                    onChange={handleChange}
                                    className="flex-1 h-[42px] px-[12px] rounded-[6px] bg-[#EAEAEA] text-[14px] focus:outline-none"
                                />
                                <button
                                    onClick={applyPromo}
                                    className="px-[16px] bg-[#161616] text-white text-[14px] rounded-[6px] hover:opacity-90"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        <label className="flex items-start gap-[8px] text-[14px] text-[#656565] mt-[8px]">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={() => setAgree((v) => !v)}
                                className="mt-[3px]"
                            />
                            <span>I agree to the terms and safety policy</span>
                        </label>
                    </div>

                    {/* RIGHT SUMMARY CARD */}
                    <aside className="w-[387px] bg-[#EFEFEF] rounded-[12px] p-[24px] flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col gap-[12px] text-[14px] text-[#656565]">
                            <div className="flex justify-between">
                                <span>Experience</span>
                                <span className="text-[#161616]">{experience.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Date</span>
                                <span className="text-[#161616]">{selectedDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Time</span>
                                <span className="text-[#161616]">{selectedTime}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Qty</span>
                                <span className="text-[#161616]">{quantity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-[#161616]">₹{subtotal}</span>
                            </div>

                            {promoApplied && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span>-₹{discount}</span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span>Taxes</span>
                                <span className="text-[#161616]">₹{taxes}</span>
                            </div>

                            <div className="h-[1px] bg-[#DADADA] my-[12px]" />

                            <div className="flex justify-between items-center text-[16px] font-semibold text-[#161616]">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            onClick={handlePayment}
                            className="w-full mt-[12px] py-[12px] bg-[#FFD643] rounded-[8px] font-semibold text-[#161616] hover:opacity-90 transition disabled:opacity-70"
                        >
                            {loading ? "Processing..." : "Pay and Confirm"}
                        </button>
                    </aside>
                </div>
            </div>
        </main>

    );
};

export default Checkout;
