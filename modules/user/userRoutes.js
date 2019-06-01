const path = require("path");
const api = require(path.resolve(".", "modules/user/userController.js"));
const functions = require(path.resolve("./", "utils/functions.js"));
const express = require("express");
const router = express.Router();

/**
 * @api {post} /user/registerUser Register User
 * @apiName registerUser
 * @apiGroup User
 *
 * @apiParam {String} fullName - Full Name
 * @apiParam {String} emailId - Email Id
 * @apiParam {String} password - Password
 *
 * @apiParamExample {json} Request-Example:
 * {
 * 		"fullName": "Pavan Maind",
 * 		"emailId": "pavanm@winjit.com",
 * 		"password": "winjit"
 * }
 *
 * @apiSuccess {Object} User Registered details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Success",
 *     "responseData": {
 *         "emailId": "pavanm@winjit.com",
 *         "userId": 15
 *     }
 * }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
 *  {
 *      "status": 1004,
 *      "message": "Email Already Exists",
 *      "responseData": null
 *  }
 */

// api to register user
router.post("/registerUser", api.registerUser);

/**
 * @api {post} /user/loginUser Login User
 * @apiName loginUser
 * @apiGroup User
 *
 * @apiParam {String} emailId - Email Id
 * @apiParam {String} password - Password
 * @apiParamExample {json} Request-Example:
 * {
 * 		"emailId": "pavanm@winjit.com",
 * 		"password": "winjit"
 * }
 *
 * @apiSuccess {Object} User Login details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Login successful",
 *     "responseData": {
 *         "fullName": "Pavan Maind",
 *         "emailId": "pavanm@winjit.com",
 *         "userId": 10,
 *         "token": "eyJhbGciOiJIUzIrfe5sInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoicGF2YW5tQHdpbmppdC5jb20iLCJmdWxsTmFtZSI6IlBhdmFuIE1haW5kIiwidXNlcklkIjoxMCwiaWF0IjoxNTUxODUyOTA0LCJleHAiOjE1ODMzODg5MDR9.PEZINRsYtCd6RW8kS2fRLSovvh5ZMLh4zngo7rEsqcs"
 *     }
 * }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
 *  {
 *      "status": 1003,
 *      "message": "Please check username or password",
 *      "responseData": null
 *  }
 */

// api to login user
router.post("/loginUser", api.loginUser);

/**
 * @api {get} /user/getUserDataByToken Get User Details By Token
 * @apiName getUserDataByToken
 * @apiGroup User
 *
 * @apiHeader {String} auth Users unique access-token.
 *
 * @apiSuccess {Object} User details
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "status": 200,
 *     "message": "Success",
 *     "responseData": {
 *         "emailId": "pavanm@winjit.com",
 *         "fullName": "Pavan Maind",
 *         "userId": 49,
 *         "imageId": 6,
 *         "imageName": "1553151075035_me.jpg",
 *         "fileType": "image/jpeg",
 *         "imageNameOriginal": "me.jpg"
 *     }
 * }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 UNAUTHORIZED
 *  {
 *      "status": 1003,
 *      "message": "Please check username or password",
 *      "responseData": null
 *  }
 */

// api to get user details by token
router.get(
  "/getUserDataByToken",
  functions.verifyToken,
  api.getUserDataByToken
);

/**
 * @api {post} /user/getPlaceSuggestions Get google places suggestions
 * @apiName getPlaceSuggestions
 * @apiGroup User
 *
 * @apiParam {String} searchString - Place to search
 * @apiParamExample {json} Request-Example:
 * {
 * 		"searchString": "Hotel taj nashik"
 * }
 *
 * @apiSuccess {Object} User Login details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Success",
 *     "responseData": [
 *         {
 *             "description": "Hotel taj, Kolgaon - Rui Road, Rui, Nashik, Maharashtra, India",
 *             "id": "262ba15b67c29d77f8b0608d8e18b8fa53c058c8",
 *             "matched_substrings": [
 *                 {
 *                     "length": 9,
 *                     "offset": 0
 *                 }
 *             ],
 *             "place_id": "ChIJB5GQUFg13DsRVInD8wrSpTw",
 *             "reference": "ChIJB5GQUFg13DsRVInD8wrSpTw",
 *             "structured_formatting": {
 *                 "main_text": "Hotel taj",
 *                 "main_text_matched_substrings": [
 *                     {
 *                         "length": 9,
 *                         "offset": 0
 *                     }
 *                 ],
 *                 "secondary_text": "Kolgaon - Rui Road, Rui, Nashik, Maharashtra, India",
 *                 "secondary_text_matched_substrings": [
 *                     {
 *                         "length": 6,
 *                         "offset": 25
 *                     }
 *                 ]
 *             },
 *             "terms": [
 *                 {
 *                     "offset": 0,
 *                     "value": "Hotel taj"
 *                 }
 *             ],
 *             "types": [
 *                 "restaurant",
 *                 "food",
 *                 "point_of_interest",
 *                 "establishment"
 *             ]
 *         }
 *     ]
 * }
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 1050 UNAUTHORIZED
 * {
 *     "status": 1050,
 *     "message": "Invalid token",
 *     "responseData": null
 * }
 */

// api to get google places suggestions
router.post(
  "/getPlaceSuggestions",
  functions.verifyToken,
  api.getPlaceSuggestions
);

/**
 * @api {get} /user/getPlaceDetails Get place details
 * @apiName getPlaceDetails
 * @apiGroup User
 *
 * @apiParam {String} place_id - Place id received in place suggestions api
 *
 * @apiSuccess {Object} Place details
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *    "status": 200,
 *    "message": "Success",
 *    "responseData": {
 *        "formatted_address": "Old Agra Rd, Golden Nagar, Malegaon, Maharashtra 423203, India",
 *        "formatted_phone_number": "088052 35890",
 *        "geometry": {
 *            "location": {
 *                "lat": 20.556549,
 *                "lng": 74.5433796
 *            },
 *            "viewport": {
 *                "northeast": {
 *                    "lat": 20.5579682802915,
 *                    "lng": 74.5446552802915
 *                },
 *                "southwest": {
 *                    "lat": 20.5552703197085,
 *                    "lng": 74.54195731970849
 *                }
 *            }
 *        },
 *        "name": "Hotel Taj Darbar",
 *        "opening_hours": {
 *            "open_now": true,
 *            "periods": [
 *                {
 *                    "close": {
 *                        "day": 0,
 *                        "time": "2330"
 *                    },
 *                    "open": {
 *                        "day": 0,
 *                        "time": "0600"
 *                    }
 *                },
 *                {
 *                    "close": {
 *                        "day": 1,
 *                        "time": "2330"
 *                    },
 *                    "open": {
 *                        "day": 1,
 *                        "time": "0600"
 *                    }
 *                },
 *                {
 *                    "close": {
 *                        "day": 2,
 *                        "time": "2330"
 *                    },
 *                    "open": {
 *                        "day": 2,
 *                        "time": "0600"
 *                    }
 *                },
 *                {
 *                    "close": {
 *                        "day": 3,
 *                        "time": "2330"
 *                    },
 *                    "open": {
 *                        "day": 3,
 *                        "time": "0600"
 *                    }
 *                },
 *                {
 *                    "close": {
 *                        "day": 4,
 *                        "time": "2330"
 *                    },
 *                    "open": {
 *                        "day": 4,
 *                        "time": "0600"
 *                    }
 *                },
 *                {
 *                    "close": {
 *                        "day": 5,
 *                        "time": "2330"
 *                    },
 *                    "open": {
 *                        "day": 5,
 *                        "time": "0600"
 *                    }
 *                },
 *                {
 *                    "close": {
 *                        "day": 6,
 *                        "time": "2330"
 *                    },
 *                    "open": {
 *                        "day": 6,
 *                        "time": "0600"
 *                    }
 *                }
 *            ],
 *            "weekday_text": [
 *                "Monday: 6:00 AM – 11:30 PM",
 *                "Tuesday: 6:00 AM – 11:30 PM",
 *                "Wednesday: 6:00 AM – 11:30 PM",
 *                "Thursday: 6:00 AM – 11:30 PM",
 *                "Friday: 6:00 AM – 11:30 PM",
 *                "Saturday: 6:00 AM – 11:30 PM",
 *                "Sunday: 6:00 AM – 11:30 PM"
 *            ]
 *        },
 *        "rating": 3.5
 *    }
 *
 *
 * @apiError Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 1050 UNAUTHORIZED
 * {
 *     "status": 1050,
 *     "message": "Invalid token",
 *     "responseData": null
 * }
 */

//  api to get google place details
router.get("/getPlaceDetails", functions.verifyToken, api.getPlaceDetails);

module.exports = router;
