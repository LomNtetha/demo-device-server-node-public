"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (req, res, next) {
    res.sendResult = function (data, code, message) {
        var fmt = req.query.fmt ? req.query.fmt : "rest";
        if (fmt == "rest") {
            res.json({
                "data": data,
                "meta": {
                    "msg": message,
                    "status": code
                }
            });
        }
    };
    next();
};
