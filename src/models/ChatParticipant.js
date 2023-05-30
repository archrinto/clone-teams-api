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
        }
    },
    {
        collection: 'chat_participants',
        timestamps: timestampOptions
    }
);

export default model('ChatParticipant', ChatParticipantSchema);