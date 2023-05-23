import { Schema, model } from "mongoose";
import timestampOptions from "./utils/timestampOptions.js";

export const ChatParticipantSchema = Schema(
    {
        chat: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: 'Chat'
        },
        user: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: 'User'
        },
        is_admin: {
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