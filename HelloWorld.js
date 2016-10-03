"use strict";
var rx = require("rx");
var http = require("http");
var Startup = (function () {
    function Startup() {
    }
    Startup.main = function () {
        console.log("Hej smukke Brian");
        rx.Observable.just("Hello world").subscribe(function (value) {
            console.log("Hello world " + value);
        });
        var arr = new Array("Brian", "Hans", "Jens", "Brian");
        rx.Observable.from(arr).distinct().subscribe(function (value) {
            console.log(value);
        });
        http.get("http://www.google.com/index.html", function (res) {
            console.log("Got response: " + res.statusCode);
            res.resume();
        }).on("error", function (e) {
            console.log("Got error " + e.message);
        });
        return 0;
    };
    return Startup;
}());
/**
 *
 */
Startup.main();
