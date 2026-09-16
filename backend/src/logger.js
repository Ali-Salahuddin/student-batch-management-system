"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggermw = void 0;
const loggermw = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
exports.loggermw = loggermw;
