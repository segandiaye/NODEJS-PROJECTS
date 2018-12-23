# JSAU-APISERVER

# DEMARAGE DU SERVEUR

Vous avez trois dossiers,il suffit de se placer à l'une et taper `npm start` par lancer une application

- **JSAU-APISERVER**
- **JSAU-DESKTOP** 
- **JSAU-WEBAPP** 
- **JSAU-WEBSERVER** 

# DOCUMENTION DE L'API JSAU-APISERVER

- **Liste de toutes les matières** - [GET http://localhost:8080/api/listAll](http://localhost:8080/api/listAll)
- **Ajouter une matière** - [POST http://localhost:8080/api/add](http://localhost:8080/add)
- **Modifier une matière** - [PUT http://localhost:8080/api/update/:id](http://localhost:8080/update/:id)
- **Suprimer une matière** - [DELETE http://localhost:8080/api/delete/:id](http://localhost:8080/delete/:id)

# TEST AVEC CURL

********************`LISTER LES MATIERES`**********************************************
GET http://localhost:8080/api/api/listAll

test = curl GET http://localhost:8080/api/listAll
# 
********************`AJOUTER UNE MATIERE`**********************************************
POST http://localhost:8080/add

curl -X POST ttp://localhost:8080/api/add -F comment='{"who":"some_one", "desc":"get it"}'

curl -H "Content-Type: application/json" -X POST -d '{"name":"SEGA","id":6}' http://localhost:8080/api/add
# 
********************`DTAIL D'UNE MATIERE`**********************************************
GET http://localhost:8080/api/detail/:id ou id=identifiant de la matiere

test =curl GET http://localhost:8080/api/detail/:id
# 
********************`MODIFIER UNE MATIERE`*********************************************
PUT http://localhost:8080/api/update/:id ou id=identifiant de la matiere

test =curl -X PUT http://localhost:8080/api/update/:id
# 
********************`SUPPRIMER UNE MATIERE`********************************************
DELETE http://localhost:8080/api/delete/:id ou id=identifiant de la matiere

test =curl -X DELETE DELETE http://localhost:8080/delete/id?_method=DELETE

