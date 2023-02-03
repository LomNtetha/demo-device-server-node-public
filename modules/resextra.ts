// 添加统一的返回结果方法
module.exports = function(req:any, res:any, next:any){
	res.sendResult = function(data: any, code: any, message: any) {
		var fmt = req.query.fmt ? req.query.fmt : "rest";
		if(fmt == "rest") {
			res.json(
			{
				"data" : data, 
				"meta" : {
					"msg" 		: message,
					"status" 	: code
				}
			});
		}
	};
	next();
}
export {};