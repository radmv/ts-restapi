# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "first_name": "Adam",
  "last_name": "loose",
  "email": "a@b.com",
  "phone": "081234567890"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Adam",
    "last_name": "loose",
    "email": "a@b.com",
    "phone": "081234567890"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "first_name or last_name or email or phone must not blank, ..."
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Adam",
    "last_name": "loose",
    "email": "a@b.com",
    "phone": "081234567890"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "contact not found, ..."
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Request Body:

```json
{
  "first_name": "Adam",
  "last_name": "loose",
  "email": "a@b.com",
  "phone": "081234567890"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Adam",
    "last_name": "loose",
    "email": "a@b.com",
    "phone": "081234567890"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "first_name must not blank, ..."
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

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
  "errors": "Contact is not found, ..."
}
```

## Search Contact

Endpoint : GET /api/contacts/search

Query Parameters:

- name: string, contact first name or last name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Response Body (Success):

```json
{
  "data": {
    "contacts": [
      {
        "id": 1,
        "first_name": "Adam",
        "last_name": "loose",
        "email": "a@b.com",
        "phone": "081234567890"
      },
      {
        "id": 2,
        "first_name": "Adam",
        "last_name": "loose",
        "email": "a@b.com",
        "phone": "081234567890"
      }
    ],
    "paging": {
      "current_page": 1,
      "total_page": 10,
      "size": 10
    }
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, ..."
}
```
