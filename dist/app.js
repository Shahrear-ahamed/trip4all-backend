"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
// Enable CORS
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://trip4all.vercel.app'],
    credentials: true,
}));
// app.use(cors({ origin: 'https://trip4all.vercel.app', credentials: true }))
// Parse JSON bodies
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Parse URL-encoded bodies
app.use(express_1.default.urlencoded({ extended: true }));
// home route
app.get('/', (req, res) => {
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Welcome to the API',
    });
});
// rest of the routes
app.use('/api/v1', routes_1.default);
// 404 handler
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
// global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
