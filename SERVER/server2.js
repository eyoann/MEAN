"use strict"
var express = require("express");
var assert = require("assert");
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//var url = "mongodb://localhost:27017/TROC";

mongo.connect(url, {useNewUrlParser:true}, (err, client) =>{
	let db = client.db("test");
	assert.equal(null,err);

	app.get("/biens", (req,res) =>{
		console.log("route: /biens");
		db.collection("biens").find().toArray((err,documents) =>{
			res.setHeader("Content-type", "application/json");
			res.end(JSON.stringify(documents));
		});
	});

	app.get("/biens/:type", (req,res) =>{
		console.log("route: /biens/:type");
		db.collection("biens").find({"type": req.params.type}).toArray((err,documents) =>{
			res.setHeader("Content-type", "application/json");
			res.end(JSON.stringify(documents));
		});
	});

	app.post("/new-client", (req,res) =>{
		db.collection("membres").insertOne(req.body);
		res.end("Insertion reussie");
	});

} );

app.listen(8088);