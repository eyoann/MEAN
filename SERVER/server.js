"use strict"
var assert = require("assert");
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
var MongoClient = require("mongodb").MongoClient;
const {ObjectId} = require('mongodb');


var url = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("TROC");
    assert.equal(null, err);

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });


    // ********************************** MEMBRES ***************************

    app.post("/membre-inscription", (req, res) => {
    console.log("route sur post : /membre-inscription");
    console.log(req.body);
    for (let prop in req.body) {
            console.log(prop+" : "+req.body[prop]);
    }
    //res.setHeader("Content-type", "text/raw");
    res.setHeader("Content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    try {
            db.collection("membres").insertOne(req.body);
        console.log("Insertion reussie");
        res.end("Insertion réussie");
    }
    catch(e) {
        console.log("Insertion echouee");
        res.end("Error "+e);
    }
    });

    app.get("/membres", (req, res) => {
        console.log(req.body);
        console.log("Dans le fonction membre du serveur NodeJS");
        db.collection("membres").find().toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        res.setHeader("Access-Control-Allow-Origin", "*");
        //res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });

    });

    app.post("/change-score", (req,res) => {
        console.log(req.body);
        db.collection("membres").updateOne({'email':req.body.email}, {$set:{'score':req.body.score}});
        res.end(JSON.stringify(req.body.score));
    });

    // ********************************** BIENS ******************************

    // Ajouter un bien
    app.post("/biens/add", (req,res) => {
    console.log("route sur get : /biens/ajouter");
        try {
            db.collection("biens").insertOne({"nom":req.body.nom, "type": req.body.type, "prixNeuf": req.body.prix, "membre": req.body.membre}, function(err,docsInserted){
                db.collection("disponibilites").insertOne({"bienOuServ": "bien", "idBienOuServ": docsInserted["ops"][0]["_id"],"numSem" : req.body.semaine, "numJour" : req.body.jour, "AMPM" : req.body.horaire })
            });

            console.log("Insertion reussie");
            res.end("Insertion réussie");
        }
        catch(e) {
            console.log("Insertion echouee");
            res.end("Error "+e);
        }
    });

    //Biens from membre
    app.get("/biens/membre=:membre", (req,res) => {
        db.collection("biens").find({"membre": req.params.membre}).toArray((err, documents)=> {
            res.end(JSON.stringify(documents));
        });
    });

    // Suppression bien
    app.get("/biens-suppression/:id",(req,res) =>{
        console.log(req.params.id);
        db.collection("disponibilites").deleteOne({"idBienOuServ": ObjectId(req.params.id)});
        db.collection("biens").deleteOne({"_id": ObjectId(req.params.id)});
        res.end(JSON.stringify("bien supprime"));
    });


    //Afficher les biens disponibles
    app.get("/biens/:nom/:type/:descriptif/:prixNeuf", (req, res) => {
    console.log("route: /biens/:nom/:type/:descriptif/:prixNeuf");
        let filterObject = {};
        if(req.params.nom != "undefined") { filterObject.nom = req.params.nom; }
        if(req.params.type != "undefined") { filterObject.type = req.params.type; }
        if(req.params.descriptif != "undefined") { filterObject.descriptif = req.params.descriptif; }
        if(req.params.prixNeuf != "undefined") { filterObject.prixNeuf = req.params.prixNeuf; }
        //console.log(filterObject);

        db.collection("disponibilites").find().toArray((err, documents)=> {
            let collectionBienDispo = [];
        res.setHeader("Content-type", "application/json");
        let nbResultats = documents.length;
        let numResultats = 0;
            for (let doc of documents) {
                filterObject._id = doc.idBienOuServ;
               db.collection("biens").find(filterObject).toArray((err, documents)=> {
                if(documents[0]!=null)
               collectionBienDispo.push(documents[0]);
           numResultats++;
            if (numResultats == nbResultats) {
                console.log(JSON.stringify(collectionBienDispo));
                res.end(JSON.stringify(collectionBienDispo));
                }
               });
            }

        }); 

    });



    // ****************************** SERVICES ********************************************
    // Ajouter un service
    app.post("/services/add", (req,res) => {
        console.log("route sur get : /services/ajouter");
        try {
            db.collection("services").insertOne({"nom":req.body.nom, "type": req.body.type, "prixNeuf": req.body.prix, "membre": req.body.membre}, function(err,docsInserted){
                db.collection("disponibilites").insertOne({"bienOuServ": "service", "idBienOuServ": docsInserted["ops"][0]["_id"],"numSem" : req.body.semaine, "numJour" : req.body.jour, "AMPM" : req.body.horaire })
            });

            console.log("Insertion reussie");
            res.end("Insertion réussie");
        }
        catch(e) {
            console.log("Insertion echouee");
            res.end("Error "+e);
        }
    });

    //Services from membre
    app.get("/services/membre=:membre", (req,res) => {
        db.collection("services").find({"membre": req.params.membre}).toArray((err, documents)=> {
            console.log(JSON.stringify(documents));
            res.end(JSON.stringify(documents));
        });
    });

    // Suppression services
    app.get("/services-suppression/:id",(req,res) =>{
        db.collection("disponibilites").deleteOne({"idBienOuServ": ObjectId(req.params.id)});
        db.collection("services").deleteOne({"_id": ObjectId(req.params.id)});
        res.end(JSON.stringify("bien supprime"));
    });

    //Afficher les services disponibles
    app.get("/services/:nom/:type/:descriptif/:prixNeuf", (req, res) => {
    console.log("route: /services/:nom/:type/:descriptif/:prixNeuf");
        let filterObject = {};
        if(req.params.nom != "undefined") { filterObject.nom = req.params.nom; }
        if(req.params.type != "undefined") { filterObject.type = req.params.type; }
        if(req.params.descriptif != "undefined") { filterObject.descriptif = req.params.descriptif; }
        if(req.params.prixNeuf != "undefined") { filterObject.prixNeuf = req.params.prixNeuf; }
        //console.log(filterObject);

        db.collection("disponibilites").find().toArray((err, documents)=> {
            let collectionBienDispo = [];
        res.setHeader("Content-type", "application/json");
        let nbResultats = documents.length;
        let numResultats = 0;
            for (let doc of documents) {
                filterObject._id = doc.idBienOuServ;
               db.collection("services").find(filterObject).toArray((err, documents)=> {
                if(documents[0]!=null)
               collectionBienDispo.push(documents[0]);
           numResultats++;
            if (numResultats == nbResultats) {
                console.log(JSON.stringify(collectionBienDispo));
                res.end(JSON.stringify(collectionBienDispo));
                }
               });
            }

        }); 

    });

    //************************** EMPRUNTS BIENS OU SERVICES ********************************

    //Emprunt d'un bien ou service
    app.get("/emprunt/:email/:bienOuService/:idBienOuService",(req,res) =>{
        console.log("DANS L'EMPRUNT");
        console.log(req.params.email);
        console.log(req.params.bienOuService);
        console.log(req.params.idBienOuService);
        db.collection("disponibilites").deleteOne({"idBienOuServ": ObjectId(req.params.idBienOuService)});
        let filterObject = {};
        filterObject.email = req.params.email;
        filterObject.bienOuServ = req.params.bienOuService;
        filterObject.idBienOuService = req.params.idBienOuService;
        db.collection("utilisations").insertOne(filterObject);
        res.end(JSON.stringify("bien ou service emprunter"));
    });


    // Tous les emprunts biens d'un membre
    app.get("/biens-location/membre=:membre",(req,res) =>{

        db.collection("utilisations").find({"email":req.params.membre}).toArray((err, documents)=> {
            console.log(JSON.stringify(documents));
            let biens = [];
            let nbResultats = documents.length;
            let numResultats = 0;
            for(let doc of documents) {
                db.collection("biens").find({"_id": ObjectId(doc.idBienOuService)}).toArray((err, documents)=> {
                    console.log(JSON.stringify(documents));
                    if(documents[0] != null) biens.push(documents[0]);
                    numResultats++;
                    if (numResultats == nbResultats) res.end(JSON.stringify(biens));
               });
            }
        });

    });

    //Rendre bien
    app.get("/biens-rendre/:id",(req,res) =>{
        console.log(req.params.id);
        db.collection("utilisations").deleteOne({"idBienOuService": req.params.id});
        db.collection("disponibilites").insertOne({"bienOuServ": "bien", "idBienOuServ": ObjectId(req.params.id)});
    });

    // Tous les emprunts services d'un membre
    app.get("/services-location/membre=:membre",(req,res) =>{

        db.collection("utilisations").find({"email":req.params.membre}).toArray((err, documents)=> {
            console.log(JSON.stringify(documents));
            let biens = [];
            let nbResultats = documents.length;
            let numResultats = 0;
            for(let doc of documents) {
                db.collection("services").find({"_id": ObjectId(doc.idBienOuService)}).toArray((err, documents)=> {
                    if(documents[0] != null) biens.push(documents[0]);
                    numResultats++;
                    if (numResultats == nbResultats) res.end(JSON.stringify(biens));
               });
            }
        });

    });

    //Rendre service
    app.get("/services-rendre/:id",(req,res) =>{
        db.collection("utilisations").deleteOne({"idBienOuService": req.params.id});
        db.collection("disponibilites").insertOne({"bienOuServ": "bien", "idBienOuServ": ObjectId(req.params.id)});
    });


    //********************************* CONNEXION *************************************

    app.get("/connexion/login=:login/password=:password", (req,res) => {
        console.log("connexion");
        let login = req.params.login;
        let password = req.params.password;
        res.setHeader("Content-type", "text/plain; charset=UTF-8");
        db.collection("membres").find({"nom" : login, "mdp" : password}).toArray((err, documents)=> {
            if(documents !== undefined && documents.length == 1) { 
                console.log("oui");
                res.end(JSON.stringify(documents));
            } else {
                console.log("non");
                res.end(JSON.stringify(documents));
            }
        });
    });

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