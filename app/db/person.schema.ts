import { Schema, InferSchemaType } from "mongoose";

const personSchema = new Schema({
    status: {
        type: String,
        enum: ["missing", "found"],
        required: true,
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
            type: {
                type: String,
                required: true,
                enum: ['pointed', 'flat']
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