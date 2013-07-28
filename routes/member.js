//mongoDB
var mongoose = require('mongoose'),
	autoinc = require('mongoose-id-autoinc'),
	db;
try{
	db=mongoose.connect("mongodb://blackie1019:1qaz2wsx@ds037758.mongolab.com:37758/favi");
}catch(err){
	console.log(err.message.red);
}
//初始化autoinc
autoinc.init(db,'meber_id');
//建立一個 schema
var Schema = mongoose.Schema;
// Create a schema for our data
var MemberSchema = new Schema({
  name: String,
  account: String,
  email: String,
  password: String,
  create_date: { "type": Date, "default": Date.now },
  isEnable :{ "type": Boolean, "default": true }
});
MemberSchema.plugin(autoinc.plugin, { model: 'member' });
// 用此 schema 建立一個通道
// Use the schema to register a model to the db
mongoose.model('member', MemberSchema);
// 將此通道和database 連通, 連到一個名叫 members 的 collection (類似SQL中的table),db 中mongodb 會自動加 s 在 collection 名後, 但我們依照用 member
// var MemberModel = mongoose.model('member');
var MemberModel=db.model('member',MemberSchema);
//各項action
exports.register = function (req,res){
	if(req.method=='POST') {
		MemberModel.find({account:req.body.email},function(err,docs){
			res.setHeader("Content-Type", "application/json");
			if(err){
				res.send("{'status':'failed','messange':"+err.message+"}");
			}else{
				if(docs.length===0){
					//新增至DB
					new MemberModel({
							name:req.body.name,
							account:req.body.email,
							email:req.body.email,
							password:req.body.password
						}).save();
					res.send("{'status':'ok'}");
				}else{
					res.send("{'status':'failed','messange':'該帳號已存在'}");
				}
			}
		});
	}
};