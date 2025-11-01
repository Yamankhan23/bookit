import React from "react";

export default function BookingForm({ onSubmit, applyingPromo }: {
    onSubmit: (data: { name: string, email: string, promo?: string, agree: boolean }) => void,
    applyingPromo?: (code: string) => Promise<{ valid: boolean, amount: number }>
}) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [promo, setPromo] = React.useState("");
    const [agree, setAgree] = React.useState(false);
    const [error, setError] = React.useState("");

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid name and email.");
            return;
        }
        if (!agree) { setError("You must agree to the terms and safety policy."); return; }
        setError("");
        onSubmit({ name, email, promo, agree });
    };

    return (
        <form onSubmit={submit} className="bg-white rounded-xl p-6 space-y-4">
            <label className="block">
                <div className="text-[14px] font-medium">Full name</div>
                <input className="mt-2 w-full rounded-md p-3 border" value={name} onChange={e => setName(e.target.value)} />
            </label>

            <label className="block">
                <div className="text-[14px] font-medium">Email</div>
                <input className="mt-2 w-full rounded-md p-3 border" value={email} onChange={e => setEmail(e.target.value)} />
            </label>

            <label className="block">
                <div className="text-[14px] font-medium">Promo code</div>
                <div className="mt-2 flex gap-2">
                    <input className="flex-1 rounded-md p-3 border" value={promo} onChange={e => setPromo(e.target.value)} />
                    <button
                        type="button"
                        onClick={async () => applyingPromo && await applyingPromo(promo)}
                        className="rounded-md px-4 py-2 bg-[#F3F3F3]"
                    >Apply</button>
                </div>
            </label>

            <label className="flex items-start gap-3">
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
                <div className="text-[14px] text-muted">I agree to the terms and safety policy</div>
            </label>

            {error && <div role="alert" className="text-sm text-red-600">{error}</div>}

            <button type="submit" className="w-full rounded-md py-3 text-[16px] font-semibold bg-primary shadow-md">Pay and Confirm</button>
        </form>
    );
}
