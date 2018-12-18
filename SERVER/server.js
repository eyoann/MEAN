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

    // // Liste de tous les biens
    // app.get("/biens", (req, res) => {
    //     console.log("route: /biens/");
    //     db.collection("biens").find().toArray((err, documents)=> {
    //     // la création de json ne sert à rien ici
    //     // on pourrait directement renvoyer documents
    //     console.log(documents);
    //     res.setHeader("Content-type", "application/json");
    //     res.end(JSON.stringify(documents));
    //     });
    
    // });

    // app.get("/biens/:nom/:type/:descriptif/:prixNeuf", (req, res) => {
    // console.log("route: /biens/:nom/:type/:descriptif/:prixNeuf");
    //     let filterObject = {};
    //     if(req.params.nom != "undefined") { filterObject.nom = req.params.nom; }
    //     if(req.params.type != "undefined") { filterObject.type = req.params.type; }
    //     if(req.params.descriptif != "undefined") { filterObject.descriptif = req.params.descriptif; }
    //     if(req.params.prixNeuf != "undefined") { filterObject.prixNeuf = req.params.prixNeuf; }
    //     console.log(filterObject);
    //     db.collection("biens").find(filterObject).toArray((err, documents)=> {
    //     // la création de json ne sert à rien ici
    //     // on pourrait directement renvoyer documents
    //     console.log(err);
    //     console.log(JSON.stringify(documents));
    //     res.setHeader("Content-type", "application/json");
    //     res.end(JSON.stringify(documents));
    //     });

    // });

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

    app.get("/services/:nom/:type/:descriptif/:prixNeuf", (req, res) => {
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

    app.get("/biens/biens-disponibles", (req, res) => {
    console.log("route: /biens/test");
        db.collection("disponibilites").find().toArray((err, documents)=> {
            let collectionBienDispo = [];
        res.setHeader("Content-type", "application/json");
        let nbResultats = documents.length;
        let numResultats = 0;
            for (let doc of documents) {
               db.collection("biens").find({"_id":doc.idBienOuServ}).toArray((err, documents)=> {
               collectionBienDispo.push(documents[0]);
           numResultats++;
            if (numResultats == nbResultats) res.end(JSON.stringify(collectionBienDispo));
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

    // Liste de tous les biens
    app.get("/services", (req, res) => {
        console.log("route: /services/");
        db.collection("services").find().toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });
    
    });

    app.get("/services/:nom/:type/:descriptif/:prixNeuf", (req, res) => {
    console.log("route: /services/:nom/:type/:descriptif/:prixNeuf");
        let filterObject = {};
        if(req.params.nom != "undefined") { filterObject.nom = req.params.nom; }
        if(req.params.type != "undefined") { filterObject.type = req.params.type; }
        if(req.params.descriptif != "undefined") { filterObject.descriptif = req.params.descriptif; }
        if(req.params.prixNeuf != "undefined") { filterObject.prixNeuf = req.params.prixNeuf; }
        console.log(filterObject);
        db.collection("services").find(filterObject).toArray((err, documents)=> {
        // la création de json ne sert à rien ici
        // on pourrait directement renvoyer documents
        console.log(err);
        console.log(JSON.stringify(documents));
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(documents));
        });

    });

    //************************** EMPRUNTS BIENS OU SERVICES ********************************

    // Emprunt bien
    app.get("/biens-location/membre=:membre",(req,res) =>{

        db.collection("utilisations").find({"email":req.params.membre}).toArray((err, documents)=> {
            console.log(JSON.stringify(documents));
            let biens = [];
            let nbResultats = documents.length;
            let numResultats = 0;
            for(let doc of documents) {
                db.collection("biens").find({"_id": doc.idBienOuServ}).toArray((err, documents)=> {
                    if(documents[0] != null) biens.push(documents[0]);
                    numResultats++;
                    if (numResultats == nbResultats) res.end(JSON.stringify(biens));
               });
            }
        });

    });

    //Rendre bien
    app.get("/biens-rendre/:id",(req,res) =>{
        db.collection("utilisations").deleteOne({"_id": ObjectId(req.params.id)});
        db.collection("disponibilites").insertOne({"bienOuServ": "bien", "idBienOuServ": ObjectId(req.params.id)});
    });

    // Emprunt service
    app.get("/services-location/membre=:membre",(req,res) =>{

        db.collection("utilisations").find({"email":req.params.membre}).toArray((err, documents)=> {
            console.log(JSON.stringify(documents));
            let biens = [];
            let nbResultats = documents.length;
            let numResultats = 0;
            for(let doc of documents) {
                db.collection("services").find({"_id": doc.idBienOuServ}).toArray((err, documents)=> {
                    if(documents[0] != null) biens.push(documents[0]);
                    numResultats++;
                    if (numResultats == nbResultats) res.end(JSON.stringify(biens));
               });
            }
        });

    });

    //Rendre service
    app.get("/services-rendre/:id",(req,res) =>{
        db.collection("utilisations").deleteOne({"_id": ObjectId(req.params.id)});
        db.collection("disponibilites").insertOne({"bienOuServ": "bien", "idBienOuServ": ObjectId(req.params.id)});
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

    app.get("/disponibilites", (req, res) => {
    console.log("route: /disponibilites");
    db.collection("disponibilites").find().toArray((err, documents)=> {
    // la création de json ne sert à rien ici
    // on pourrait directement renvoyer documents
    console.log(err);
    console.log(JSON.stringify(documents));
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(documents));
    });

    });



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