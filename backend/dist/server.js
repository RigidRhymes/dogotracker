"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const scan_route_1 = require("./api/scan.route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use('/api/scan', scan_route_1.scanRouter);
