"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userRole_1 = require("../../../enum/userRole");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validation_1 = require("./service.validation");
// Define your routes here
const router = express_1.default.Router();
// get home service
router.get('/home', service_controller_1.ServiceController.homeService);
// get service by status
router.get('/home/:status', service_controller_1.ServiceController.getServiceByStatus);
// create a new service
router.post('/', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(service_validation_1.ServiceValidation.createServiceZodSchema), service_controller_1.ServiceController.createService);
// update a service
router.patch('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(service_validation_1.ServiceValidation.updateServiceZodSchema), service_controller_1.ServiceController.updateService);
// delete a service
router.delete('/:id', service_controller_1.ServiceController.deleteService);
// get all services
router.get('/', service_controller_1.ServiceController.getAllServices);
// get a service by id
router.get('/:id', service_controller_1.ServiceController.getServiceById);
exports.ServiceRoutes = router;
