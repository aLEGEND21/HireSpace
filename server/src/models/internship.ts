import mongoose from "mongoose";

interface IInternship {
    title: string;
    description: string;
    companyName: string;
    tags: string[];
    location: string;
    startDate: Date;
    endDate: Date;
    hoursPerWeek: number;
    hourlyRate: number;
    applicationUrl: string;
    approved: boolean;
    creator: mongoose.Types.ObjectId;
}

const internshipSchema = new mongoose.Schema<IInternship>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    companyName: { type: String, required: true },
    tags: { type: [String], required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    hoursPerWeek: { type: Number, required: true },
    hourlyRate: { type: Number, required: true },
    applicationUrl: { type: String, required: true },
    approved: { type: Boolean, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, required: true },
}, { timestamps: true });

const Internship = mongoose.model<IInternship>('Internship', internshipSchema);

function createInternship(attr: IInternship) {
    return new Internship(attr);
}

export { Internship, IInternship, createInternship };