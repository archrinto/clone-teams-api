import mongoose, { Schema, model } from "mongoose";
import timestampOptions from "./utils/timestampOptions.js";
import MessageType from "./enums/MessageType.js";

const ChatEmbeddedSchema = { 
    _id: Schema.Types.ObjectId, 
}

export const ChatMessageSchema = Schema(
    {
        chat: {
            type: ChatEmbeddedSchema,
            default: null
        },
        sender: {
            type: { 
                _id: Schema.Types.ObjectId, 
                name: {
                    type: String,
                    default: null
                },
                avatar: {
                    type: String,
                    default: null
                }
            },

        },
        messageType: {
            type: String,
            default: MessageType.text
        },
        content: {
            type: String,
            default: null
        },
        isPinned: {
            type: Boolean,
            default: false
        },
        isEdited: {
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