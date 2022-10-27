import { Schema, InferSchemaType } from "mongoose";

const personSchema = new Schema({
    status: {
        type: String,
        enum: ["missing", "found"],
        default: 'missing',
    },
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'prefer not to say'],
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    eyes: {
        required: true,
        type: {
            color: {
                type: String,
                required: true,
                enum: ['black', 'brown', 'blue']
            },
            accuracy: { type: String, required: true },
        }
    },
    nose: {
        required: true,
        type: {
            isPointed: {
                type: Boolean,
                required: true,
            },
            accuracy: { type: String, required: true },
        }
    },
    skin: {
        required: true,
        type: {
            color: {
                type: String,
                required: true,
                enum: ['black', 'brown', 'white']
            },
            accuracy: { type: String, required: true },
        }
    },
});

export type PersonType = InferSchemaType<typeof personSchema>;
export default personSchema;