"use strict"
var assert = require("assert");
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("TROC");
    assert.equal(null, err);

    app.get("/biens", (req, res) => {
        db.collection("biens").find().toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });
    
    });
    
    app.get("/biens/:type", (req, res) => {
    console.log("route: /biens/:type");
        db.collection("biens").find({"type":req.params.type}).toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });

    });

    app.get("/membres", (req, res) => {
        db.collection("membres").find().toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });
    
    });

    app.get("/disponibles/:type", (req, res) => {
        db.collection("disponibilites").find({"bienOuServ":req.params.type}).toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });
    
    });

    app.get("/disponibles/:type/:AMPM", (req, res) => {
        db.collection("disponibilites").find({"bienOuServ":req.params.type, "AMPM": req.params.AMPM}).toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });
    
    });
    

    app.post("/membre-inscription", (req, res) => {
    console.log("route sur post : /membre-inscription");
    console.log(req.body);
    for (let prop in req.body) {
            console.log(prop+" : "+req.body[prop]);
    }
    res.setHeader("Content-type", "text/raw");    
    try {
            db.collection("membres").insertOne(req.body);
        res.end("Insertion réussie");        
    }
    catch(e) {
        res.end("Error "+e);
    }
    });

    app.post("/new-client", (req,res) =>{
        console.log(req.body);
        db.collection("membres").insertOne(req.body);
        res.end("Insertion reussie");
    });

    app.post("/delete-client", (req,res) =>{
        console.log(req.body);
        db.collection("membres").remove(req.body);
        res.end("Suppression reussie");
    });

    /*
    app.post("/update-client", (req,res) =>{
        console.log(req.body);
        var id = ObjectId("5bf0b411ffc1c305d087d773");
        db.collection("membres").update({"_id":id},req.body);
        res.end("Update reussie");
    });
    */

    app.post("/update-client", (req,res) =>{
        //console.log(nom:);
        console.log(req.body.nom);
        console.log(req.body.prénom);
        //var id = ObjectId("5bf0b411ffc1c305d087d773");
        db.collection("membres").update({nom:req.body.nom} ,{$set:{prénom:req.body.prénom}});
        res.end("Update reussie");
        db.close();
    });

    
});

app.listen(8888);