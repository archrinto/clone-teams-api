import mongoose, { Schema, model } from "mongoose";
import timestampOptions from "./utils/timestampOptions.js";
import MessageType from "./enums/MessageType.js";

const ChatEmbeddedSchema = { 
    _id: Schema.Types.ObjectId, 
}

const SenderEmbeddedShcema = {
    _id: Schema.Types.ObjectId, 
    name: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: null
    }
}

const MessageReplySchema = {
    _id: Schema.Types.ObjectId, 
    sender: {
        type: SenderEmbeddedShcema
    },
    messageType: {
        type: String,
        default: MessageType.text
    },
    content: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: null,
    }
}


export const ChatMessageSchema = Schema(
    {
        chat: {
            type: ChatEmbeddedSchema,
            default: null
        },
        sender: {
            type: SenderEmbeddedShcema,
        },
        messageType: {
            type: String,
            default: MessageType.text
        },
        content: {
            type: String,
            default: null
        },
        isEdited: {
            type: Boolean,
            default: false
        },
        replyTo: {
            type: MessageReplySchema,
            default: null
        }
    }, 
    {
        collection: 'chat_messages',
        timestamps: timestampOptions
    }
)

export default model('ChatMessage', ChatMessageSchema)