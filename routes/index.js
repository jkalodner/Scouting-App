var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '4102 Scouting' });
});

/* GET Teamlist page. */
router.get('/teamlist', function(req, res) {
    var db = req.db;
    var collection = db.get('teams');
    collection.find({},{},function(e,docs){
    	docs.sort(function(a,b){
    		return a.team-b.team;
    	});
        res.render('teamlist', {
            "teamlist" : docs
        });
    });
});

router.get('/newteam', function(req, res){
	res.render('newteam', { title: 'Add New Team' });
});

router.get('/:teamId/view', function(req, res){
	var db = req.db;
	var collection = db.get('teams');
	var teamId = req.params.teamId;
	collection.find({_id: teamId}, function(e, docs){
		res.render('view', {
			"view": docs,
			title: docs[0].teamname + ": " + docs[0].team
		})
	});
});

router.get('/:teamId/edit', function(req, res){
	var db = req.db;
	var collection = db.get('teams');
	var teamId = req.params.teamId;
	collection.find({_id: teamId}, function(e, docs){
		var aCap = false;
		var park = false;
		var shoot = false;
		var cap = false;
		var beacons = false;
		var corners = false;
		var mShoot = false;
		var mCap = false;
		var mBeacons = false;
		var mCorners = false;
		if(docs[0].autoncap == "yes"){
			aCap=true;
		}
		if(docs[0].autonpark == "yes"){
			park=true;
		}
		if(docs[0].shoot == "yes"){
			shoot=true;
		}
		if(docs[0].cap == "yes"){
			cap=true;
		}
		if(docs[0].beacons == "yes"){
			beacons=true;
		}
		if(docs[0].corners == "yes"){
			corners=true;
		}
		if(docs[0].focus == "shooting"){
			mShoot=true;
		} else if(docs[0].focus == "capping"){
			mCap=true;
		} else if(docs[0].focus == "beacons"){
			mBeacons=true;
		} else {
			mCorners=true;
		}
		res.render('edit', {
			"edit": docs,
			title: docs[0].team,
			teamId: teamId,
			aCap : aCap,
			park : park,
			shoot : shoot,
			cap : cap,
			beacons : beacons,
			corners : corners,
			mShoot : mShoot,
			mCap : mCap,
			mBeacons : mBeacons,
			mCorners : mCorners
		})
	});
})
router.post('/:teamId/updateteam', function(req,res){
	var db = req.db;

	var teamNo = req.body.teamno;
	var teamName = req.body.teamname;

	var autonBalls = req.body.autonballs;
	var autonBallsConsist = req.body.autonballs100;
	var autonBeacons = req.body.autonbeacons;
	var autonBeaconsConsist = req.body.autonbeacons100;
	var autonCap = req.body.autoncap;
	var autonPark = req.body.autonpark;
	var autonAvg = req.body.autonavg;
	var autonConsist = req.body.auton100;

	var shoot = req.body.shoot;
	var cap = req.body.cap;
	var beacons = req.body.beacons;
	var corners = req.body.corners;
	var focus = req.body.main;
	var avgBalls = req.body.ballsteleop;
	var capConsist = req.body.cap100;
	var avg = req.body.avg;

	var autonRate = req.body.autonrate;
	var teleopRate = req.body.teleoprate;
	var shotRate = req.body.shotrate;
	var capRate = req.body.caprate;
	var ballNo = req.body.scoreballs;
	var comments = req.body.comments;

	var collection = db.get('teams');
	var teamId = req.params.teamId;
	collection.update({
		_id: teamId
	},{
		$set:{
			"team" : teamNo,
			"teamname" :teamName,
			"autonballs" : autonBalls,
			"autonballs100" : autonBallsConsist,
			"autonbeacons" : autonBeacons,
			"autonbeacons100" : autonBeaconsConsist,
			"autoncap" : autonCap,
			"autonpark" : autonPark,
			"autonavg" : autonAvg,
			"auton100" : autonConsist,
			"shoot" : shoot,
			"cap" : cap,
			"beacons" : beacons,
			"corners" : corners,
			"focus" :focus,
			"avgballs" : avgBalls,
			"cap100" : capConsist,
			"avg" : avg,
			"autonrate" : autonRate,
			"teleoprate" : teleopRate,
			"shotrate" : shotRate,
			"caprate" : capRate,
			"ballno" : ballNo,
			"comments" : comments
		}
	}, function(err, doc) {
		if(err){
			res.send("There was a problem adding the information to the database.");
		} else {
			res.redirect("../teamlist");
		}
	});
});
router.post('/addteam', function(req, res) {
	var db = req.db;

	var teamNo = req.body.teamno;
	var teamName = req.body.teamname;

	var autonBalls = req.body.autonballs;
	var autonBallsConsist = req.body.autonballs100;
	var autonBeacons = req.body.autonbeacons;
	var autonBeaconsConsist = req.body.autonbeacons100;
	var autonCap = req.body.autoncap;
	var autonPark = req.body.autonpark;
	var autonAvg = req.body.autonavg;
	var autonConsist = req.body.auton100;

	var shoot = req.body.shoot;
	var cap = req.body.cap;
	var beacons = req.body.beacons;
	var corners = req.body.corners;
	var focus = req.body.main;
	var avgBalls = req.body.ballsteleop;
	var capConsist = req.body.cap100;
	var avg = req.body.avg;

	var autonRate = req.body.autonrate;
	var teleopRate = req.body.teleoprate;
	var shotRate = req.body.shotrate;
	var capRate = req.body.caprate;
	var ballNo = req.body.scoreballs;
	var comments = req.body.comments;

	var collection = db.get('teams');

	collection.insert({
		"team" : teamNo,
		"teamname" :teamName,
		"autonballs" : autonBalls,
		"autonballs100" : autonBallsConsist,
		"autonbeacons" : autonBeacons,
		"autonbeacons100" : autonBeaconsConsist,
		"autoncap" : autonCap,
		"autonpark" : autonPark,
		"autonavg" : autonAvg,
		"auton100" : autonConsist,
		"shoot" : shoot,
		"cap" : cap,
		"beacons" : beacons,
		"corners" : corners,
		"focus" :focus,
		"avgballs" : avgBalls,
		"cap100" : capConsist,
		"avg" : avg,
		"autonrate" : autonRate,
		"teleoprate" : teleopRate,
		"shotrate" : shotRate,
		"caprate" : capRate,
		"ballno" : ballNo,
		"comments" : comments
	}, function(err, doc) {
		if(err){
			res.send("There was a problem adding the information to the database.");
		} else {
			res.redirect("teamlist");
		}
	});
});

module.exports = router;