import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
    email: string
    password: string
    name: string
}

let UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

UserSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = (this.toObject() as any)
    object.uid = _id
    return object
})

export const User = model<IUser>('User', UserSchema)