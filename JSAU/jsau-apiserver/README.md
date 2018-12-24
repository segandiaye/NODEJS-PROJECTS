[![js-standard-style](https://galilee.univ-paris13.fr/wp-content/uploads/logo-Institut-Galilee-UP13.jpg)](https://galilee.univ-paris13.fr/)
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
# 
curl GET http://localhost:8080/api/listAll
# 
********************`AJOUTER UNE MATIERE`**********************************************
# 
curl -X POST ttp://localhost:8080/api/add -F comment='{"who":"some_one", "desc":"get it"}'
# 
curl -H "Content-Type: application/json" -X POST -d '{"name":"SEGA","id":6}' http://localhost:8080/api/add
# 
********************`DTAIL D'UNE MATIERE`**********************************************
# 
curl GET http://localhost:8080/api/detail/:id, id=identifiant de la matiere

# 
********************`MODIFIER UNE MATIERE`*********************************************
# 
curl -X PUT http://localhost:8080/api/update/:id, id=identifiant de la matiere
# 
********************`SUPPRIMER UNE MATIERE`********************************************
# 
curl -X DELETE http://localhost:8080/api/delete/:id, id=identifiant de la matiere


