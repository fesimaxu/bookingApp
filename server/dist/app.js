"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const DoctorRouter_1 = __importDefault(require("./routes/DoctorRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/doctor', DoctorRouter_1.default);
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.log('MongoDB connection Error:', error);
});
app.listen(process.env.PORT, () => {
    console.log(`This application is listening at ${process.env.PORT}`);
});
exports.default = app;
