// src/components/BackButton.tsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-[#FFD83A] transition mb-6 mt-2"
        >
            <ArrowLeft size={20} />
            <span className="text-[15px] font-medium">Back</span>
        </button>
    );
};

export default BackButton;
