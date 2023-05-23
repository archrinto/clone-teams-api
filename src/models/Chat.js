import { Schema, model } from "mongoose";
import timestampOptions from "./utils/timestampOptions.js";
import ChatType from "./enums/ChatType.js";

export const ChatSchema = Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: 'User'
        },
        name: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: ChatType.single
        },
        avatar: {
            type: String,
            default: null
        },
        participants: [{
            type: Schema.Types.ObjectId,
            ref: 'ChatParticipant'
        }]
    },
    {
        timestamps: timestampOptions
    }
);

export default model('Chat', ChatSchema);