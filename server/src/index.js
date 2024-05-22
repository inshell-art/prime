"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_functions_1 = require("firebase-functions");
var app_1 = require("./app");
var dotenv_1 = require("dotenv");
dotenv_1.default.config({
    path: ".env.".concat(process.env.NODE_ENV),
});
if (process.env.NODE_ENV === "development") {
    var port_1 = process.env.PORT || 3000;
    app_1.default.listen(port_1, function () {
        console.log("Server is running on http://localhost:".concat(port_1));
    });
}
else {
    exports.api = firebase_functions_1.default.https.onRequest(app_1.default); // For emulators, staging and production
}
