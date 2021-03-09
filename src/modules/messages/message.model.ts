import { Schema, model, Document } from 'mongoose'

const MessageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

interface IMessage extends Document {
    from: string | Schema.Types.ObjectId
    to: string | Schema.Types.ObjectId
    body: string
}

MessageSchema.method('toJSON', function () {
    const { __v, _id, ...object } = (this.toObject() as any)
    object.uid = _id
    return object
})

export const Message = model<IMessage>('Message', MessageSchema)