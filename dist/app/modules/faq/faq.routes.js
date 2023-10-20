"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faq_controller_1 = require("./faq.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faq_validation_1 = require("./faq.validation");
const userRole_1 = require("../../../enum/userRole");
// Define your routes here
const router = express_1.default.Router();
// this routes for all user and public, because this will be shown in the frontend and home or faq page
// get faqs for home page
router.get('/home', faq_controller_1.FaqController.homeFaq);
// this routes for only super admin and admin because of using this routes they can find or update and delete
// get faqs with pagination (need this for admin panel)
router.get('/', 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
faq_controller_1.FaqController.getFaqs);
// create faq
router.post('/', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.SUPER_ADMIN, userRole_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(faq_validation_1.FaqValidation.createFaqZodSchema), faq_controller_1.FaqController.createFaq);
// get single faq
router.get('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.SUPER_ADMIN, userRole_1.ENUM_USER_ROLE.ADMIN), faq_controller_1.FaqController.getSingleFaq);
// update faq
router.put('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.SUPER_ADMIN, userRole_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(faq_validation_1.FaqValidation.createFaqZodSchema), faq_controller_1.FaqController.updateFaq);
// delete faq
router.delete('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.SUPER_ADMIN, userRole_1.ENUM_USER_ROLE.ADMIN), faq_controller_1.FaqController.deleteFaq);
exports.FaqRoutes = router;
