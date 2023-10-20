"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const generateToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.expires_in,
    });
});
const generateRefreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt.refresh_token_secret, {
        expiresIn: config_1.default.jwt.refresh_token_expires_in,
    });
});
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
const generateResetLink = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.reset_password_expires_in,
    });
};
exports.TokenServices = {
    verifyToken,
    generateToken,
    generateRefreshToken,
    generateResetLink,
};
