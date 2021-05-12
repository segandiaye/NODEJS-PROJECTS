# JSAU-APISERVER

`JSAU-APISERVER` is a simple example for Nodejs `REST API server`.

## Installation and starting the server

```sh
npm i
npm start
```

## API Endpoint

- `GET all subjects` - [GET /api/listAll](http://localhost:8080/api/listAll)
- `ADD subject` - [POST /api/add](http://localhost:8080/add)
- `UPDATE subject by ID` - [PUT /api/update/:id](http://localhost:8080/update/:id)
- `DELETE subject` - [DELETE /api/delete/:id](http://localhost:8080/delete/:id)

## Testing with cURL

- `GET all subjects`: curl GET http://localhost:8080/api/listAll
- `ADD subject`: curl -H "Content-Type: application/json" -X POST -d '{"name":"SEGA","id":6}' http://localhost:8080/api/add
- `GET one subject details`: curl GET http://localhost:8080/api/detail/:id, id=identifiant de la matiere
- `UPDATE subject by ID`: curl -X PUT http://localhost:8080/api/update/:id, id=identifiant de la matiere
- `DELETE subject`: curl -X DELETE http://localhost:8080/api/delete/:id, id=identifiant de la matiere
