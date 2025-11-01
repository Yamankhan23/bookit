export type Experience = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    location?: string;
    features?: string[];
};

export type Slot = {
    id: number;
    date: string;
    time: string;
    seatsLeft: number;
};
