"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleClientError = (error) => {
    var _a;
    const errors = [];
    let message = '';
    if (error.code === 'P2025') {
        message = ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) || "Record doesn't exist";
        errors.push({
            path: '',
            message,
        });
    }
    if (error.code === 'P2003' &&
        error.message.includes('delete()` invocation:')) {
        message = 'Delete failed';
        errors.push({
            path: '',
            message,
        });
    }
    const statusCode = 400;
    return {
        statusCode,
        message,
        errorMessages: errors,
    };
};
exports.default = handleClientError;
