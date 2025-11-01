
export default function CheckoutSummary({ subtotal, taxes }: { subtotal: number; taxes: number }) {
    const total = subtotal + taxes;
    return (
        <aside className="bg-white rounded-xl p-6 space-y-3">
            <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between"><span className="text-muted">Taxes</span><span>₹{taxes}</span></div>
            <div className="flex justify-between text-[18px] font-medium"><span>Total</span><span>₹{total}</span></div>
        </aside>
    );
}
