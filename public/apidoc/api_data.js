define({ "api": [
  {
    "type": "get",
    "url": "/user/getPlaceDetails",
    "title": "Get place details",
    "name": "getPlaceDetails",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "place_id",
            "description": "<ul> <li>Place id received in place suggestions api</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Place",
            "description": "<p>details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"status\": 200,\n   \"message\": \"Success\",\n   \"responseData\": {\n       \"formatted_address\": \"Old Agra Rd, Golden Nagar, Malegaon, Maharashtra 423203, India\",\n       \"formatted_phone_number\": \"088052 35890\",\n       \"geometry\": {\n           \"location\": {\n               \"lat\": 20.556549,\n               \"lng\": 74.5433796\n           },\n           \"viewport\": {\n               \"northeast\": {\n                   \"lat\": 20.5579682802915,\n                   \"lng\": 74.5446552802915\n               },\n               \"southwest\": {\n                   \"lat\": 20.5552703197085,\n                   \"lng\": 74.54195731970849\n               }\n           }\n       },\n       \"name\": \"Hotel Taj Darbar\",\n       \"opening_hours\": {\n           \"open_now\": true,\n           \"periods\": [\n               {\n                   \"close\": {\n                       \"day\": 0,\n                       \"time\": \"2330\"\n                   },\n                   \"open\": {\n                       \"day\": 0,\n                       \"time\": \"0600\"\n                   }\n               },\n               {\n                   \"close\": {\n                       \"day\": 1,\n                       \"time\": \"2330\"\n                   },\n                   \"open\": {\n                       \"day\": 1,\n                       \"time\": \"0600\"\n                   }\n               },\n               {\n                   \"close\": {\n                       \"day\": 2,\n                       \"time\": \"2330\"\n                   },\n                   \"open\": {\n                       \"day\": 2,\n                       \"time\": \"0600\"\n                   }\n               },\n               {\n                   \"close\": {\n                       \"day\": 3,\n                       \"time\": \"2330\"\n                   },\n                   \"open\": {\n                       \"day\": 3,\n                       \"time\": \"0600\"\n                   }\n               },\n               {\n                   \"close\": {\n                       \"day\": 4,\n                       \"time\": \"2330\"\n                   },\n                   \"open\": {\n                       \"day\": 4,\n                       \"time\": \"0600\"\n                   }\n               },\n               {\n                   \"close\": {\n                       \"day\": 5,\n                       \"time\": \"2330\"\n                   },\n                   \"open\": {\n                       \"day\": 5,\n                       \"time\": \"0600\"\n                   }\n               },\n               {\n                   \"close\": {\n                       \"day\": 6,\n                       \"time\": \"2330\"\n                   },\n                   \"open\": {\n                       \"day\": 6,\n                       \"time\": \"0600\"\n                   }\n               }\n           ],\n           \"weekday_text\": [\n               \"Monday: 6:00 AM – 11:30 PM\",\n               \"Tuesday: 6:00 AM – 11:30 PM\",\n               \"Wednesday: 6:00 AM – 11:30 PM\",\n               \"Thursday: 6:00 AM – 11:30 PM\",\n               \"Friday: 6:00 AM – 11:30 PM\",\n               \"Saturday: 6:00 AM – 11:30 PM\",\n               \"Sunday: 6:00 AM – 11:30 PM\"\n           ]\n       },\n       \"rating\": 3.5\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 1050 UNAUTHORIZED\n{\n    \"status\": 1050,\n    \"message\": \"Invalid token\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/getPlaceSuggestions",
    "title": "Get google places suggestions",
    "name": "getPlaceSuggestions",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searchString",
            "description": "<ul> <li>Place to search</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\t\"searchString\": \"Hotel taj nashik\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>Login details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Success\",\n    \"responseData\": [\n        {\n            \"description\": \"Hotel taj, Kolgaon - Rui Road, Rui, Nashik, Maharashtra, India\",\n            \"id\": \"262ba15b67c29d77f8b0608d8e18b8fa53c058c8\",\n            \"matched_substrings\": [\n                {\n                    \"length\": 9,\n                    \"offset\": 0\n                }\n            ],\n            \"place_id\": \"ChIJB5GQUFg13DsRVInD8wrSpTw\",\n            \"reference\": \"ChIJB5GQUFg13DsRVInD8wrSpTw\",\n            \"structured_formatting\": {\n                \"main_text\": \"Hotel taj\",\n                \"main_text_matched_substrings\": [\n                    {\n                        \"length\": 9,\n                        \"offset\": 0\n                    }\n                ],\n                \"secondary_text\": \"Kolgaon - Rui Road, Rui, Nashik, Maharashtra, India\",\n                \"secondary_text_matched_substrings\": [\n                    {\n                        \"length\": 6,\n                        \"offset\": 25\n                    }\n                ]\n            },\n            \"terms\": [\n                {\n                    \"offset\": 0,\n                    \"value\": \"Hotel taj\"\n                }\n            ],\n            \"types\": [\n                \"restaurant\",\n                \"food\",\n                \"point_of_interest\",\n                \"establishment\"\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 1050 UNAUTHORIZED\n{\n    \"status\": 1050,\n    \"message\": \"Invalid token\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/getUserDataByToken",
    "title": "Get User Details By Token",
    "name": "getUserDataByToken",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Users unique access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"message\": \"Success\",\n    \"responseData\": {\n        \"emailId\": \"pavanm@winjit.com\",\n        \"fullName\": \"Pavan Maind\",\n        \"userId\": 49,\n        \"imageId\": 6,\n        \"imageName\": \"1553151075035_me.jpg\",\n        \"fileType\": \"image/jpeg\",\n        \"imageNameOriginal\": \"me.jpg\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1003,\n    \"message\": \"Please check username or password\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/loginUser",
    "title": "Login User",
    "name": "loginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<ul> <li>Email Id</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<ul> <li>Password</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\t\"emailId\": \"pavanm@winjit.com\",\n\t\t\"password\": \"winjit\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>Login details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Login successful\",\n    \"responseData\": {\n        \"fullName\": \"Pavan Maind\",\n        \"emailId\": \"pavanm@winjit.com\",\n        \"userId\": 10,\n        \"token\": \"eyJhbGciOiJIUzIrfe5sInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoicGF2YW5tQHdpbmppdC5jb20iLCJmdWxsTmFtZSI6IlBhdmFuIE1haW5kIiwidXNlcklkIjoxMCwiaWF0IjoxNTUxODUyOTA0LCJleHAiOjE1ODMzODg5MDR9.PEZINRsYtCd6RW8kS2fRLSovvh5ZMLh4zngo7rEsqcs\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1003,\n    \"message\": \"Please check username or password\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/registerUser",
    "title": "Register User",
    "name": "registerUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<ul> <li>Full Name</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<ul> <li>Email Id</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<ul> <li>Password</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\t\"fullName\": \"Pavan Maind\",\n\t\t\"emailId\": \"pavanm@winjit.com\",\n\t\t\"password\": \"winjit\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>Registered details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Success\",\n    \"responseData\": {\n        \"emailId\": \"pavanm@winjit.com\",\n        \"userId\": 15\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1004,\n    \"message\": \"Email Already Exists\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  }
] });
