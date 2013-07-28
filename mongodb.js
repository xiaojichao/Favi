
//使用
targerDB.dbconnector.open(function(err,db) {
	if(!err){
		db.authenticate(targerDB.mongoDB_user, targerDB.mongoDB_pass, function(err, success) {
		// do stuff here
		if(success){
			db.collection('member', function(err, collection) {
				// consolesole.log(collection.db.databaseName);
				collection.find({},function(err,cursor){
					cursor.toArray(function(err,docs){
						console.log("found "+docs.length+ " documents");
						for(var i=0;i<docs.length;i++){
							console.log(JSON.stringify(docs[i]));
						}
					});
				});
			});
			// console.log(member);
		}else{
			console.log(success+","+err);
		}
		});
	}else{
		console.log("connection error");
	}
});
