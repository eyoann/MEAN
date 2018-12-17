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
    
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

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

    // ********************************** BIENS ******************************

    // Liste de tous les biens
    app.get("/biens", (req, res) => {
        console.log("route: /biens/");
        db.collection("biens").find().toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });
    
    });

    // Afficher les biens par type
    app.get("/biens/:type", (req, res) => {
    console.log("route: /biens/:type");
        db.collection("biens").find({"type":req.params.type}).toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });

    });

    // ********************************** MEMBRES ***************************

    // Inscription d'un membre
    app.get("/membre-inscription/:nom/:prenom/:email/:mdp/:sexe/:mobile", (req, res) => {
    console.log("route sur get : /membre-inscription");
    console.log("nom = "+req.params.nom);
    db.collection("membres").insertOne({"nom":req.params.nom,"prenom":req.params.prenom,"email":req.params.email,"mdp":req.params.mdp,"sexe":req.params.sexe,"mobile":req.params.mobile});
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "application/json");
    //res.setHeader("Content-type", "text/raw"); 
    res.end(JSON.stringify("membre ajoute"));
    //res.end("membre ajoute");
    });

    // Liste de tous les membres
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


    // ********************************************* BIENS *****************************

    // Ajouter un bien
    app.get("/biens/ajouter/:nom/:type/:descriptif/:lienPhoto/:prixNeuf", (req,res) => {
    console.log("route sur get : /biens/ajouter");
    
    db.collection("biens").insertOne({"nom":req.params.nom,"type":req.params.type,"descriptif":req.params.descriptif,"lienPhoto":req.params.lienPhoto,"prixNeuf":req.params.prixNeuf});
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "application/json");
    //res.setHeader("Content-type", "text/raw"); 
    res.end(JSON.stringify("bien ajoute"));
    //res.end("membre ajoute");
    });

    // Suppression bien
    app.get("/biens/suppression/:id",(req,res) =>{
    console.log("route sur get : /biens/suppression");
    
    db.collection("biens").deleteOne({"_id":req.params.id});
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "application/json");
    //res.setHeader("Content-type", "text/raw"); 
    res.end(JSON.stringify("bien supprime"));
    });

    // ****************************** SERVICES ********************************************
    // Ajouter un service
    app.get("/services/ajouter/:nom/:type/:descriptif/:prix", (req,res) => {
    console.log("route sur get : /services/ajouter");
    
    db.collection("services").insertOne({"nom":req.params.nom,"type":req.params.type,"descriptif":req.params.descriptif,"prix":req.params.prix});
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "application/json");
    //res.setHeader("Content-type", "text/raw"); 
    res.end(JSON.stringify("bien ajoute"));
    //res.end("membre ajoute");
    });  

    // Suppression services
    app.get("/services/suppression/:id",(req,res) =>{
    console.log("route sur get : /services/suppression");
    
    db.collection("biens").deleteOne({"_id":req.params.id});
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "application/json");
    //res.setHeader("Content-type", "text/raw"); 
    res.end(JSON.stringify("service supprime"));
    });  

    //************************** EMPRUNTS BIENS OU SERVICES ********************************

    // Emprunt bien et service
    app.get("/disponibilites/emprunt/:id",(req,res) =>{
    console.log("route sur get : /disponibilites/suppression");
    
    db.collection("disponibilites").deleteOne({"_id":req.params.id});
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "application/json");
    //res.setHeader("Content-type", "text/raw"); 
    res.end(JSON.stringify("disponibilite spprimer"));
    });

    // Ajouter disponibilité
    app.get("/disponibilites/ajouter/:idDisponibilite/:bienOuService/:idBienOuService/:numSemaine/:numJour",(req,res) =>{
    console.log("route sur get : /disponibilites/ajouter");
    
    db.collection("disponibilites").insertOne({"idDisponibilite":req.params.idDisponibilite,"bienOuService":req.params.bienOuService,"idBienOuService":req.params.idBienOuService,"numSemaine":req.params.numSemaine,"numJour":req.params.numJour});
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "application/json");
    //res.setHeader("Content-type", "text/raw"); 
    res.end(JSON.stringify("disponibilite ajouter"));
    });

    // ************************ DISPONIBILITES ****************************************


    // Afficher les disponibilités par type
    app.get("/disponibles/:type", (req, res) => {
        db.collection("disponibilites").find({"bienOuServ":req.params.type}).toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });
    
    });

    // Afficher disponibilité par type et AMPM
    app.get("/disponibles/:type/:AMPM", (req, res) => {
        db.collection("disponibilites").find({"bienOuServ":req.params.type, "AMPM": req.params.AMPM}).toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });
    
    });



    //*********************************************************************************************
    //*********************************************************************************************
    //****************************************   TEST   *******************************************
    //*********************************************************************************************
    //*********************************************************************************************

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

    app.get("/connexion/login=:login/password=:password", (req,res) => {
        console.log("connexion");
        let login = req.params.login;
        res.setHeader("Content-type", "text/plain; charset=UTF-8");
        db.collection("membres").find({"nom" : login}).toArray((err, documents)=> {
            if(documents !== undefined && documents.length == 1) { 
                console.log("oui");
                res.end("1");
            } else {
                console.log("non");
                res.end("0");
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