import { Schema, model } from "mongoose";
import timestampOptions from "./utils/timestampOptions.js";
import ChatType from "./enums/ChatType.js";

const ParticipantEmbeddedSchema = {
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: 'active'
    }
}

const MessageEmbeddedSchema = {
    _id: Schema.Types.ObjectId,
    messageType: {
        type: String,
        default: null
    },
    chat: {
        _id: Schema.Types.ObjectId,
    },
    content: {
        type: String,
        default: null
    },
    sender: {
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
    createdAt: {
        type: Date,
        default: null
    },
    updatedAt: {
        type: Date,
        default: null
    }
}

export const ChatSchema = Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
        },
        name: {
            type: String,
            default: null
        },
        chatType: {
            type: String,
            default: ChatType.single
        },
        avatar: {
            type: String,
            default: null
        },
        // change when the number of participants occurs
        participantCount: {
            type: Number,
            default: 0
        },
        // save only 10 participant 
        // if more than that get it from chat participants collection
        participants: [{
            type: ParticipantEmbeddedSchema,
            default: []
        }],
        // save only last messages 
        // if more than that get it from chat messages collection
        messages: [{
            type: MessageEmbeddedSchema,
            default: []
        }]
    },
    {
        timestamps: timestampOptions
    }
);

export default model('Chat', ChatSchema);