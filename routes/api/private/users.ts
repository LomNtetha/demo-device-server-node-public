const express = require('express');
const router = express.Router();
const path = require("path");
const createSocket =require(path.join(process.cwd(),"/services/socket"));
// 获取用户信息
router.get("/subscribe",
	// 参数验证
	function(req: any, res: any, next: () => void) {
		/*if(!req.params.id) {
			return res.sendResult(null,400,"用户ID不能为空");
		}
		if(isNaN(parseInt(req.params.id))) return res.sendResult(null,400,"用户ID必须是数字");*/
		next();
	},
	function(req: any, res: any, next: any) {
		createSocket(res,next)
	}
);
module.exports = router;
export {};