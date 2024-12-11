const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    cart: { type: Array, default: [] } // Thêm dòng này
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;