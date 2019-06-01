const path = require("path");
var jwt = require("jsonwebtoken");
const db = require(path.resolve(".", "modules/database/databaseConnector.js"));
const msg = require(path.resolve("./", "utils/errorMessages.js"));
const functions = require(path.resolve("./", "utils/functions.js"));
const logger = require(path.resolve("./logger"));
const config = require(path.resolve("./config"));
const request = require("request");

// Create container
const userModel = {};

// add user registration data into database
userModel.addUser = req => {
  return new Promise(async (resolve, reject) => {
    if (typeof req.body == "object") {
      let user = validateUserData(req.body);
      if (user) {
        user.secretKey = functions.createRandomString(20);
        user.passwordHash = functions.hashPassword(
          user.password,
          user.secretKey
        );
        const params = [
          user.fullName,
          user.emailId,
          user.passwordHash,
          user.secretKey,
          null
        ];
        db.query("call SignupUser(?,?,?,?,?)", params, (error, results) => {
          if (!error) {
            //check for email already exists in DB
            if (results[0][0].IsOldRecord == 1) {
              logger.warn("Email Already Exists");
              return reject({
                code: 1004,
                message: "Email Already Exists",
                data: null
              });
              // res.send(responseGenerator.getResponse(1004, "Email Already Exists", null));
            } else {
              logger.info(
                "Registration successfull for user : " + results[0][0].name
              );
              return resolve({
                code: 200,
                message: "Success",
                data: {
                  name: results[0][0].name,
                  emailId: results[0][0].emailId,
                  userId: results[0][0].userId
                }
              });
            }
          } else {
            logger.error("Error while processing your request", error);
            return reject({ code: 1005, message: msg.dbError, data: null });
          }
        });
      } else {
        return reject({ code: 400, message: msg.invalidInput });
      }
    } else {
      return reject({ code: 400, message: msg.invalidInput, data: null });
    }
  });
};

userModel.loginUser = req => {
  return new Promise(async (resolve, reject) => {
    if (typeof req.body == "object") {
      // validate user credentials
      let userCredentials = validateUserCredentials(req.body);
      if (userCredentials) {
        let strQuery = {
          sql:
            "select u.userId, u.fullName, u.emailId, u.secretKey, u.passwordHash from users u where u.emailId = ? and u.isDeleted = ?",
          values: [userCredentials.emailId, 0]
        };

        db.query(strQuery, (error, results, fields) => {
          if (error) {
            logger.error("Error while processing your request", error);
            return reject({ code: 1005, message: msg.dbError, data: null });
            // res.send(responseGenerator.getResponse(1005, msg.dbError, null))
          } else {
            if (results && results.length > 0) {
              const hash = functions.hashPassword(
                userCredentials.password,
                results[0].secretKey
              );
              if (hash == results[0].passwordHash) {
                //generation of jwt token
                const token = jwt.sign(
                  {
                    emailId: results[0].emailId,
                    fullName: results[0].fullName,
                    userId: results[0].userId
                  },
                  config.privateKey,
                  {
                    expiresIn: "365d"
                    // expiresIn: '1m'
                  }
                );

                logger.info("Login successfull - " + results[0].userId);
                return resolve({
                  code: 200,
                  message: "Login successful",
                  data: {
                    fullName: results[0].fullName,
                    emailId: results[0].emailId,
                    userId: results[0].userId,
                    token: token
                  }
                });
              } else {
                return reject({
                  code: 1003,
                  message: "Please check username or password",
                  data: null
                });
              }
            } else {
              return reject({
                code: 1003,
                message: "Please check username or password",
                data: null
              });
            }
          }
        });
      } else {
        return reject({ code: 400, message: msg.invalidInput, data: null });
      }
    } else {
      return reject({ code: 400, message: msg.invalidInput, data: null });
    }
  });
};

userModel.getUserDataByToken = req => {
  delete req.result.iat;
  delete req.result.exp;
  return { code: 200, message: "Success", data: req.result };
};

userModel.getPlaceSuggestions = req => {
  return new Promise(async (resolve, reject) => {
    let dataInput = validatePlaceSuggestionInput(req.body);
    if (dataInput) {
      request(
        {
          url:
            config.apiUrl +
            "maps/api/place/autocomplete/json?input=" +
            dataInput.searchString +
            "&inputtype=textquery&key=" +
            config.googleApiKey,
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          json: true
        },
        function(err, res) {
          if (res.body.status == "OK") {
            if (res.body.predictions.length > 0) {
              try {
                res.body.predictions.forEach(element => {
                  insertOrUpdatePrediction(element, req.body.searchString);
                });
                logger.info(
                  "Get place suggestions, success - " + req.body.searchString
                );
                return resolve({
                  code: 200,
                  message: "Success",
                  data: res.body.predictions
                });
              } catch (e) {
                logger.error("Error while processing your request", e);
                return reject({ code: 1005, message: msg.dbError, data: null });
              }
            } else {
              logger.info(
                "No place suggestions found - " + req.body.searchString
              );
              return resolve({
                code: 201,
                message: "No data exists",
                data: null
              });
            }
          } else {
            logger.error("Service not available currently");
            return reject({ code: 1021, message: msg.serverError, data: null });
          }
        }
      );
    } else {
      return reject({ code: 400, message: msg.invalidInput, data: null });
    }
  });
};

userModel.getPlaceDetails = req => {
  return new Promise(async (resolve, reject) => {
    if (req.query.place_id) {
      request(
        {
          url:
            config.apiUrl +
            "maps/api/place/details/json?placeid=" +
            req.query.place_id +
            "&fields=formatted_address,name,rating,opening_hours,geometry,formatted_phone_number&key=" +
            config.googleApiKey,
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          json: true
        },
        function(err, res) {
          if (res.body.status == "OK") {
            insertOrUpdatePlaceDetails(res.body.result, req.query.place_id);
            logger.info("Get place details success - " + req.query.place_id);
            return resolve({
              code: 200,
              message: "Success",
              data: res.body.result
            });
          } else {
            logger.error("Service not available currently");
            return reject({ code: 1021, message: msg.serverError, data: null });
          }
        }
      );
    } else {
      return reject({ code: 400, message: msg.invalidInput, data: null });
    }
  });
};

module.exports = userModel;

// function to validate userdata
const validateUserData = userData => {
  let dataToReturn = {};
  dataToReturn.fullName =
    typeof userData.fullName == "string" && userData.fullName.trim().length > 0
      ? userData.fullName.trim()
      : false;
  dataToReturn.emailId =
    typeof userData.emailId == "string" && userData.emailId.trim().length > 0
      ? userData.emailId.trim()
      : false;
  dataToReturn.password =
    typeof userData.password == "string" && userData.password.trim().length > 0
      ? userData.password.trim()
      : false;

  for (let key in dataToReturn) {
    if (!dataToReturn[key]) {
      return false;
    }
  }

  return dataToReturn;
};

// function to validate user credentials
const validateUserCredentials = userCredentials => {
  userCredentials.emailId =
    typeof userCredentials.emailId == "string" &&
    userCredentials.emailId.trim().length > 0
      ? userCredentials.emailId.trim().toLowerCase()
      : false;
  userCredentials.password =
    typeof userCredentials.password == "string" &&
    userCredentials.password.length > 0
      ? userCredentials.password
      : false;

  if (!userCredentials.emailId || !userCredentials.password) {
    return false;
  } else {
    return userCredentials;
  }
};

// function to validate place suggestion data
const validatePlaceSuggestionInput = data => {
  if (!typeof data == "object") {
    return false;
  }

  data.searchString =
    typeof data.searchString == "string" && data.searchString.trim().length > 0
      ? data.searchString.trim().toLowerCase()
      : false;
  data.userName =
    data.userName &&
    typeof data.userName == "string" &&
    data.userName.length > 0
      ? data.userName
      : null;
  data.userLocation =
    data.userLocation &&
    typeof data.userLocation == "string" &&
    data.userLocation.length > 0
      ? data.userLocation
      : null;

  if (!data.searchString) {
    return false;
  } else {
    return data;
  }
};

const insertOrUpdatePrediction = (prediction, searchString) => {
  let dataToInsert = {
    place_id: prediction.place_id ? prediction.place_id : null,
    id: prediction.id ? prediction.id : null,
    description: prediction.description ? prediction.description : null,
    main_text: prediction.structured_formatting.main_text
      ? prediction.structured_formatting.main_text
      : null,
    secondary_text: prediction.structured_formatting.secondary_text
      ? prediction.structured_formatting.secondary_text
      : null,
    types: prediction.types ? JSON.stringify(prediction.types) : null,
    searchString: searchString ? searchString : null
  };
  let strQuery = {
    sql: `INSERT INTO places_data (place_id, id, description, main_text, secondary_text, types, searchString) 
        VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE searchedCount = searchedCount+1, updatedAt = ?,
        id = ?, description = ?, main_text = ?, secondary_text = ?, types = ?, searchString = ?;`,
    values: [
      dataToInsert.place_id,
      dataToInsert.id,
      dataToInsert.description,
      dataToInsert.main_text,
      dataToInsert.secondary_text,
      dataToInsert.types,
      dataToInsert.searchString,
      new Date(Date.now()),
      dataToInsert.id,
      dataToInsert.description,
      dataToInsert.main_text,
      dataToInsert.secondary_text,
      dataToInsert.types,
      dataToInsert.searchString
    ]
  };

  db.query(strQuery, (error, results, fields) => {
    if (error) {
      return error;
    } else {
    }
  });
};

const insertOrUpdatePlaceDetails = (placeDetails, place_id) => {
  let dataToInsert = {
    place_id: place_id ? place_id : null,
    formatted_address: placeDetails.formatted_address
      ? placeDetails.formatted_address
      : null,
    formatted_phone_number: placeDetails.formatted_phone_number
      ? placeDetails.formatted_phone_number
      : null,
    lat: placeDetails.geometry.location.lat
      ? JSON.stringify(placeDetails.geometry.location.lat)
      : null,
    lng: placeDetails.geometry.location.lng
      ? JSON.stringify(placeDetails.geometry.location.lng)
      : null,
    name: placeDetails.name ? placeDetails.name : null,
    rating: placeDetails.rating ? placeDetails.rating : null
  };
  let strQuery = {
    sql: `INSERT INTO places_data (place_id, formatted_address, formatted_phone_number, lat, lng, name, rating, preferredCount) 
        VALUES (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE preferredCount = preferredCount+1, updatedAt = ?, 
        formatted_address =?, formatted_phone_number=?, lat=?, lng=?, name=?, rating=?;`,
    values: [
      dataToInsert.place_id,
      dataToInsert.formatted_address,
      dataToInsert.formatted_phone_number,
      dataToInsert.lat,
      dataToInsert.lng,
      dataToInsert.name,
      dataToInsert.rating,
      1,
      new Date(Date.now()),
      dataToInsert.formatted_address,
      dataToInsert.formatted_phone_number,
      dataToInsert.lat,
      dataToInsert.lng,
      dataToInsert.name,
      dataToInsert.rating
    ]
  };

  db.query(strQuery, (error, results, fields) => {
    if (error) {
      return error;
    } else {
      return true;
    }
  });
};
