mongoimport --db TROC --collection membres --file membres.json --jsonArray --drop
mongoimport --db TROC --collection biens --file biens.json --jsonArray --drop
mongoimport --db TROC --collection services --file services.json --jsonArray --drop
mongoimport --db TROC --collection disponibilites --file disponibilites.json --jsonArray --drop
mongoimport --db TROC --collection utilisations --file utilisations.json --jsonArray --drop
mongoimport --db TROC --collection descriptifBiens --file descriptifBiens.json --jsonArray --drop
mongoimport --db TROC --collection descriptifServices --file descriptifServices.json --jsonArray --drop