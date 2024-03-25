# User API Spec

## Register User

Endpoint : POST /api/users

Request Body:

```json
{
  "username": "Adam",
  "password": "secret",
  "name": "Adam loose"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "Adam",
    "name": "Adam loose"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Response Body (Success):

```json
{
  "data": {
    "username": "Adam",
    "name": "Adam loose",
    "token": "uuid"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username or password wrong, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "username": "Adam",
  "password": "secret",
  "name": "Adam loose"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "Adam",
    "name": "Adam loose"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, ..."
}
```

## update User

Endpoint : PATCH /api/users/current

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "password": "secret", // patch -> tidak wajib
  "name": "Adam loose" // patch -> tidak wajib
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "Adam",
    "name": "Adam loose"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, ..."
}
```
