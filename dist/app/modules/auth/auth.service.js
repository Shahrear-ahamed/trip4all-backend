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
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const bcryptPass_1 = require("../../../utils/bcryptPass");
const token_1 = require("../../../utils/token");
const config_1 = __importDefault(require("../../../config"));
// Your service code here
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role, password } = payload;
    const hashPass = yield bcryptPass_1.BcryptPassword.hashedPassword(password);
    // use transaction to create user, profile and cart table
    const result = yield prisma_1.default.$transaction((createAccountTrans) => __awaiter(void 0, void 0, void 0, function* () {
        // create profile
        const profile = yield createAccountTrans.profile.create({
            data: {
                email,
            },
        });
        // check profile created or not
        if (!profile)
            throw new ApiError_1.default(http_status_1.default.UNPROCESSABLE_ENTITY, 'Unable to create profile');
        // create cart table for each user to book any service
        yield createAccountTrans.cart.create({
            data: {
                profileId: profile.id,
            },
        });
        // create user with user profileId
        const user = yield createAccountTrans.user.create({
            data: {
                email,
                password: hashPass,
                role,
                profileId: profile.id,
            },
        });
        // return user only
        return user;
    }));
    // if result is null, throw error
    if (!result)
        throw new ApiError_1.default(http_status_1.default.UNPROCESSABLE_ENTITY, 'Unable to create profile');
    const returnResult = {
        id: result.id,
        email: result.email,
        role: result.role,
        profileId: result.profileId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
    };
    // return user
    return returnResult;
});
// login with email and password
const signIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // find user by email
    const result = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    // if result is null, throw error ()
    if (!result)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password or email is incorrect');
    // now check password
    const isMatch = yield bcryptPass_1.BcryptPassword.comparePassword(password, result.password);
    // if password is not match, throw error
    if (!isMatch)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password or email is incorrect');
    // create token for user
    const tokenPayload = {
        id: result.profileId,
        email: result.email,
        role: result.role,
    };
    const accessToken = yield token_1.TokenServices.generateToken(tokenPayload);
    const refreshToken = yield token_1.TokenServices.generateRefreshToken(tokenPayload);
    // return access token and refresh token for direct login after sign up
    return {
        accessToken,
        refreshToken,
    };
});
// get access token from refresh token
const getAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // verify refresh token
    const result = yield token_1.TokenServices.verifyToken(token, config_1.default.jwt.refresh_token_secret);
    // if result is null, throw error
    if (!result)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
    // find user by profileId for check user exist or not
    const user = yield prisma_1.default.profile.findUnique({
        where: {
            id: result.id,
        },
    });
    // if user is null, throw error
    if (!user)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
    // create token for user
    const tokenPayload = {
        id: result.id,
        email: result.email,
        role: result.role,
    };
    const accessToken = yield token_1.TokenServices.generateToken(tokenPayload);
    // return access token
    return { accessToken };
});
// change password of user, if user is logged in
const changePassword = (profileId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // find user by profileId for user existence
    const user = yield prisma_1.default.user.findUnique({
        where: {
            profileId,
        },
    });
    // if user is null, throw error
    if (!user)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    // check old password is correct or not
    const isMatch = yield bcryptPass_1.BcryptPassword.comparePassword(oldPassword, user.password);
    // if password is not match, throw error
    if (!isMatch)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Your old password is incorrect');
    // hash new password
    const hashPass = yield bcryptPass_1.BcryptPassword.hashedPassword(newPassword);
    // update password
    const result = yield prisma_1.default.user.update({
        where: {
            profileId,
        },
        data: {
            password: hashPass,
        },
    });
    // is anything wrong, throw error
    if (!result)
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Something went wrong');
});
exports.AuthService = {
    signUp,
    signIn,
    getAccessToken,
    changePassword,
};
