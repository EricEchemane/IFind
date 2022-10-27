import { Schema, InferSchemaType } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    picture: {
        type: String,
        required: [true, "Image is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
});

export type IUser = InferSchemaType<typeof userSchema>;
export default userSchema;