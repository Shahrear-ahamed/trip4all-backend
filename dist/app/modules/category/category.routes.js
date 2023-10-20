"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_validation_1 = require("./category.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userRole_1 = require("../../../enum/userRole");
// Define your routes here
const router = express_1.default.Router();
// create category
router.post('/', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategoryZodSchema), category_controller_1.CategoryController.createCategory);
// get all categories
router.get('/', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.getAllCategories);
// get category by id
router.get('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.getCategoryById);
// update category
router.put('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategoryZodSchema), category_controller_1.CategoryController.updateCategory);
// delete category
router.delete('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
