import mongoose from "mongoose";

interface IUser {
    username: string;
    password: string;
    salt: string;
    email: string;
    role: string;
    internships: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    internships: { type: [String], required: true },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

function createUser(attr: IUser) {
    return new User(attr);
}

export { User, IUser, createUser };