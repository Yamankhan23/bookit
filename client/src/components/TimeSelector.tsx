import type { Slot } from "../types";

export default function TimeSelector({ times, selectedTime, onSelect }: {
    times: Slot[],
    selectedTime?: string,
    onSelect: (time: string) => void
}) {
    return (
        <div className="flex flex-wrap gap-3">
            {times.map(t => {
                const sold = t.seatsLeft <= 0;
                return (
                    <button
                        key={t.id}
                        onClick={() => onSelect(t.time)}
                        disabled={sold}
                        className={`rounded-xl px-4 py-2 min-w-[96px] text-[14px] ${selectedTime === t.time ? "ring-2 ring-primary" : "bg-white"} ${sold ? "opacity-60" : ""}`}
                        aria-pressed={selectedTime === t.time}
                    >
                        <div>{t.time}</div>
                        <div className="text-[12px] text-muted">{sold ? "Sold out" : `${t.seatsLeft} left`}</div>
                    </button>
                );
            })}
        </div>
    );
}
