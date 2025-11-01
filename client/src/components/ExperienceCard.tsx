// src/components/ExperienceCard.tsx
import type { Experience } from "../types";

const ExperienceCard = ({ exp, onView }: { exp: Experience; onView: (id: number) => void }) => (
    <article
        className="bg-[#F9F9F9] shadow-card rounded-xl w-[280px] overflow-hidden hover:shadow-lg transition"
    >
        <img
            src={exp.imageUrl}
            alt={exp.title}
            className="w-full h-[170px] object-cover rounded-t-xl"
        />
        <div className="p-4 flex flex-col justify-between h-[150px]">
            <div>
                <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-medium text-[#161616]">{exp.title}</h3>
                    {exp.location && (
                        <span className="bg-[#EFEFEF] text-[12px] px-2 py-[2px] rounded-md text-[#727272]">
                            {exp.location}
                        </span>
                    )}
                </div>
                <p className="text-[#727272] text-[13px] mt-1">
                    Curated small-group experience. Certified guide. Safety gear included.
                </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <p className="text-[14px] font-medium text-[#161616]">
                    From ₹{exp.price}
                </p>
                <button
                    onClick={() => onView(exp.id)}
                    className="bg-[#FFD643] px-4 py-[6px] text-[14px] font-medium rounded-md hover:opacity-90"
                >
                    View Details
                </button>
            </div>
        </div>
    </article>
);

export default ExperienceCard;
