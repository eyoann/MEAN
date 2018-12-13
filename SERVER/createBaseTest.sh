mongoimport --db test --collection membres --file membres.json --jsonArray --drop
mongoimport --db test --collection biens --file biens.json --jsonArray --drop
mongoimport --db test --collection services --file services.json --jsonArray --drop
mongoimport --db test --collection disponibilites --file disponibilites.json --jsonArray --drop
mongoimport --db test --collection utilisations --file utilisations.json --jsonArray --drop
mongoimport --db test --collection descriptifBiens --file descriptifBiens.json --jsonArray --drop
mongoimport --db test --collection descriptifServices --file descriptifServices.json --jsonArray --drop