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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var Employee_model_1 = require("../models/Employee.model");
var connect_1 = require("../database/connect");
connect_1["default"]();
var employeesApi = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var method, _a, _b, firstName, lastName, telephoneNumber, emailAddress, employeeManager, status, newEmployee, saltRounds, hashedPassword, savedEmployee, token, error_1, employees, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                method = req.method;
                _a = method;
                switch (_a) {
                    case 'POST': return [3 /*break*/, 1];
                    case 'GET': return [3 /*break*/, 6];
                }
                return [3 /*break*/, 10];
            case 1:
                _c.trys.push([1, 4, , 5]);
                _b = req.body, firstName = _b.firstName, lastName = _b.lastName, telephoneNumber = _b.telephoneNumber, emailAddress = _b.emailAddress, employeeManager = _b.employeeManager, status = _b.status;
                newEmployee = new Employee_model_1["default"]({
                    firstName: firstName,
                    lastName: lastName,
                    telephoneNumber: telephoneNumber,
                    emailAddress: emailAddress,
                    employeeManager: employeeManager,
                    status: status
                });
                saltRounds = 10;
                return [4 /*yield*/, bcryptjs_1["default"].hash('Password123#', saltRounds)];
            case 2:
                hashedPassword = _c.sent();
                newEmployee.password = hashedPassword;
                return [4 /*yield*/, newEmployee.save()];
            case 3:
                savedEmployee = _c.sent();
                token = jsonwebtoken_1["default"].sign({ userId: savedEmployee._id }, 'your-secret-key', { expiresIn: '1h' } // Adjust expiration as needed
                );
                res.status(201).json(savedEmployee);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                res.status(500).json({ message: 'Error creating employee', error: error_1.message });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 11];
            case 6:
                _c.trys.push([6, 8, , 9]);
                return [4 /*yield*/, Employee_model_1["default"].find()];
            case 7:
                employees = _c.sent();
                res.status(200).json(employees);
                return [3 /*break*/, 9];
            case 8:
                error_2 = _c.sent();
                res.status(500).json({ message: 'Error fetching employees', error: error_2.message });
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                res.status(405).json({ message: 'Method Not Allowed' });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports["default"] = employeesApi;
