"use strict";
var rx = require("rx");
var http = require("http");
var xhr = require("xhr2");
var Startup = (function () {
    function Startup() {
    }
    Startup.main = function () {
        var s = new Startup();
        s.observer4();
        //s.getHttp();
        console.log("Done..");
        return 0;
    };
    Startup.prototype.logValue = function (val) {
        console.log(val);
    };
    Startup.prototype.observer1 = function () {
        rx.Observable.just("Hello world").subscribe(function (value) {
            console.log("Hello world " + value);
        });
        var arr = new Array("Brian", "Hans", "Jens", "Brian");
        rx.Observable.from(arr).distinct().subscribe(function (value) {
            console.log(value);
        });
    };
    Startup.prototype.observer2 = function () {
        var o = rx.Observable.create(function (observer) {
            observer.onNext("Brian");
            observer.onNext("Jens");
            observer.onNext("Hans");
            observer.onCompleted();
        });
        var observer = rx.Observer.create(function (x) { console.log(x); }, function (err) { console.log("Error" + err); }, function () { console.log("Completed"); });
        o.subscribe(observer);
    };
    Startup.prototype.observer3 = function () {
        var src = rx.Observable.range(1, 5);
        var sum = src.reduce(function (acc, x) { return acc + x; });
        sum.subscribe(this.logValue);
        var s = src.reduce(function (prev, cur) {
            return {
                sum: prev.sum + cur,
                count: prev.count + 1
            };
        }, { sum: 0, count: 0 }).map(function (o) { return o.sum / o.count; });
        s.subscribe(function (x) { return console.log("Average is" + x); });
    };
    Startup.prototype.observer4 = function () {
        var x = new xhr();
        x.open("GET", "http://127.0.0.1:8080/Member/GetAll");
        x.onload = function (e) {
            var o = JSON.parse(x.responseText);
            o.forEach(function (element) {
                console.log(element.GM_EMAIL);
            });
        };
        x.send(null);
        // new p.Promise((resolve, reject) => {
        //     http.get("http://127.0.0.1:8080/Member/Get/2111600379", (res) => {
        //         console.log(`Got response: ${res.statusCode}`);
        //         resolve(res.read());
        //     }).on("error", (e) => {
        //         reject(`Got error ${e.message}`);
        //     });
        // }).then((val) => {
        //     console.log("Success ");
        //     console.log(val);        
        // });
    };
    Startup.prototype.getHttp = function () {
        http.get("http://www.google.com/index.html", function (res) {
            console.log("Got response: " + res.statusCode);
            res.resume();
        }).on("error", function (e) {
            console.log("Got error " + e.message);
        });
    };
    return Startup;
}());
/**
 *
 */
Startup.main();
