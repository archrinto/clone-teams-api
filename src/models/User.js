import { Schema, model } from "mongoose";
import timestampOptions from "./utils/timestampOptions.js";
import bcrypt from 'bcrypt';

export const UserSchema = Schema(
    {
        name: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            default: null,
        },
        password: {
            type: String,
            default: null,
        },
        profileStatus: {
            type: String,
            default: null,
        },
        avatar: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: timestampOptions
    }
);

UserSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

export default model('User', UserSchema);