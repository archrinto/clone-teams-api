import { Schema, model } from "mongoose";
import timestampOptions from "./utils/timestampOptions.js";

export const ChatParticipantSchema = Schema(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: 'Chat'
        },
        userId: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: 'User'
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: 'active'
        },
        joinAt: {
            type: Date,
            default: null,
        },
        leaveAt: {
            type: Date,
            default: null,
        }
    },
    {
        collection: 'chat_participants',
        timestamps: timestampOptions
    }
);

export default model('ChatParticipant', ChatParticipantSchema);