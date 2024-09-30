export interface IFileDetails {
    name: string;
    size: Number;
    type: string;
    date: Date;
};

export interface ICar {
    make: string,
    model: string,
    year: Number,
    color: string,
    fuel: string,
    power: Number,
    mileage: string,
    gearType: string,
    price: Number,
    description: string,
    status: string,
    images: IFileDetails[],
    documents: IFileDetails[],
};
