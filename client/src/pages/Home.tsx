import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../api/axiosClient";

interface Experience {
    id: number;
    title: string;
    description: string;
    location: string;
    price: number;
    imageUrl: string;
}

const Home = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // 🔍 Extract query from URL
    const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

    useEffect(() => {
        axiosClient
            .get("/experiences")
            .then((res) => setExperiences(res.data))
            .catch((err) => console.error("Failed to fetch experiences:", err))
            .finally(() => setLoading(false));
    }, []);

    // 🔎 Filter experiences based on search
    const filteredExperiences = experiences.filter(
        (exp) =>
            exp.title.toLowerCase().includes(query) ||
            exp.description.toLowerCase().includes(query) ||
            exp.location.toLowerCase().includes(query)
    );

    if (loading)
        return (
            <div className="text-center py-10 text-[#656565] text-[16px] font-inter">
                Loading experiences...
            </div>
        );

    return (
        <main className="bg-[#FAFAFA] min-h-screen font-inter">
            {/* Top padding = 48px (with 87px header => 135px total) */}
            <section
                className="
          max-w-[1440px] mx-auto 
          pt-[135px] pb-20 px-[124px]
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-x-[24px] gap-y-[32px]
          justify-items-start
        "
            >
                {filteredExperiences.length === 0 ? (
                    <div className="col-span-full text-center text-[#656565] text-[15px] mt-10">
                        No experiences found matching “{query}”.
                    </div>
                ) : (
                    filteredExperiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="
                w-[280px] h-[312px]
                bg-white rounded-[12px]
                shadow-[0_2px_10px_rgba(0,0,0,0.08)]
                hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]
                cursor-pointer transition-all duration-200
                flex flex-col
              "
                            onClick={() => navigate(`/details/${exp.id}`)}
                        >
                            <img
                                src={exp.imageUrl}
                                alt={exp.title}
                                className="w-full h-[180px] object-cover rounded-t-[12px]"
                            />

                            <div className="p-4 flex flex-col justify-between flex-1">
                                {/* Title + Location */}
                                <div>
                                    <div className="flex items-center justify-between mb-[4px]">
                                        <h2 className="text-[16px] font-semibold text-[#161616] leading-[20px] truncate">
                                            {exp.title.length > 18
                                                ? exp.title.slice(0, 18) + "..."
                                                : exp.title}
                                        </h2>
                                        <span className="bg-[#EAEAEA] text-[#5E5E5E] text-[12px] px-2 py-[2px] rounded-md whitespace-nowrap">
                                            {exp.location}
                                        </span>
                                    </div>

                                    <p className="text-[13px] text-[#6B6B6B] leading-[18px] line-clamp-2">
                                        {exp.description}
                                    </p>
                                </div>

                                {/* Price + Button */}
                                <div className="flex items-center justify-between mt-3">
                                    <p className="text-[15px]">
                                        <span className="text-[#6B6B6B]">From </span>
                                        <span className="font-semibold text-[#161616]">
                                            ₹{exp.price}
                                        </span>
                                    </p>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/details/${exp.id}`);
                                        }}
                                        className="
                      bg-[#FFD643] text-[#161616]
                      text-[14px] font-semibold
                      px-4 py-[6px]
                      rounded-[8px]
                      hover:opacity-90 transition
                    "
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
};

export default Home;
