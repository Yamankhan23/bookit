
import type { Slot } from "../types";

export default function DateSelector({ slots, selectedDate, onSelect }: {
    slots: Slot[],
    selectedDate?: string,
    onSelect: (date: string) => void
}) {
    return (
        <aside className="w-full md:w-56 flex flex-col gap-3">
            {slots.map(s => {
                const label = new Date(s.date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
                const sold = s.seatsLeft <= 0;
                return (
                    <button
                        key={s.id}
                        onClick={() => onSelect(s.date)}
                        className={`w-full text-left rounded-xl p-3 ${selectedDate === s.date ? "ring-2 ring-primary" : "bg-white"} ${sold ? "opacity-60" : ""}`}
                        disabled={sold}
                        aria-pressed={selectedDate === s.date}
                    >
                        <div className="text-[14px] font-medium">{label}</div>
                        <div className="text-[12px] text-muted">{sold ? "Sold out" : `${s.seatsLeft} seats left`}</div>
                    </button>
                );
            })}
        </aside>
    );
}
