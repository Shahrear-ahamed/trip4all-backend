"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userRole_1 = require("../../../enum/userRole");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_validation_1 = require("./review.validation");
// Define your routes here
const router = express_1.default.Router();
// create a new review
router.post('/', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(review_validation_1.ReviewValidation.createReviewZodSchema), review_controller_1.ReviewController.createReview);
// get all reviews for admin, super admin but for user only get his/her reviews
router.get('/', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.SUPER_ADMIN, userRole_1.ENUM_USER_ROLE.ADMIN, userRole_1.ENUM_USER_ROLE.USER), review_controller_1.ReviewController.getAllReviews);
// get single review
router.get('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.SUPER_ADMIN, userRole_1.ENUM_USER_ROLE.ADMIN, userRole_1.ENUM_USER_ROLE.USER), review_controller_1.ReviewController.getAReview);
// update review
router.patch('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(review_validation_1.ReviewValidation.createReviewZodSchema), review_controller_1.ReviewController.updateReview);
// delete review
router.delete('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.SUPER_ADMIN, userRole_1.ENUM_USER_ROLE.ADMIN), review_controller_1.ReviewController.deleteReview);
exports.ReviewRoutes = router;
