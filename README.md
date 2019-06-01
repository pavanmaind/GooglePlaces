# GooglePlacesSearch

Application to google places

This is a google places app developed using Node.js, Express, MySQL and some other packages.

Application allows user to search for google places using suggestions api. Once getting suggestions,
the user can get the details for particular place using place details api and place id received in suggestions api.

In the backend we store the searched places. We have maintained the count for search as well as preferred places, When user uses the suggestions api we increase the count for search parameter, however if user uses the
place details api, we increase the count for preferred parameter in database, which can be helpful in future for analytics. Also if the record already exists for particular place_id we update the data for that record and update respective count (i.e. search/preferred count) as well as modified date.

Version: 1.0.0

## MySQL

Install mysql server

https://dev.mysql.com/doc/mysql-installer/en/

## Import Database

```
From file 'db.sql'
```

## Import postman collection

```
From file 'Google places.postman_collection.json'
```

## Add config file

```
config.js file (From email)
```

## Usage

```
$ npm install

$ npm start

apidoc will be available at http://localhost:3000/apidoc
```

## APIs

- [Login API](http://localhost:3000/apidoc/#api-User-Login_User)
- [Register API](http://localhost:3000/apidoc/#api-User-Register_User)
- [Places Suggestions](http://localhost:3000/apidoc/#api-User-getPlaceSuggestions)
- [Place details](http://localhost:3000/apidoc/#api-User-getPlaceDetails)
- [Get User data by token](http://localhost:3000/apidoc/#api-User-getUserDataByToken)
