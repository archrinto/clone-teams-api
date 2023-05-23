import mongoose, { Schema, model } from "mongoose";
import timestampOptions from "./utils/timestampOptions.js";
import MessageType from "./enums/MessageType.js";

export const ChatMessageSchema = Schema(
    {
        chat: {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
            default: null
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        type: {
            type: String,
            default: MessageType.text
        },
        content: {
            type: String,
            default: null
        },
        is_pinned: {
            type: Boolean,
            default: false
        },
        is_edited: {
            type: Boolean,
            default: false
        }
    }, 
    {
        collection: 'chat_messages',
        timestamps: timestampOptions
    }
)

export default model('ChatMessage', ChatMessageSchema)