// src/components/ExperienceList.tsx
import ExperienceCard from "./ExperienceCard";
import type { Experience } from "../types";

const ExperienceList = ({
    items,
    onView,
}: {
    items: Experience[];
    onView: (id: number) => void;
}) => (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] justify-items-center">
        {items.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} onView={onView} />
        ))}
    </section>
);

export default ExperienceList;
