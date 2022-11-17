import Rx = require("rx");
import "rx-dom";
/*import http = require("http");*/
import xhr = require("xhr2");
import { Promise } from "es6-promise";

import { Observable, Observer } from "rx";

class Startup {

    public static main() : number {
        
        var s = new Startup();

        s.observer4();

        //s.observer5();
        //s.getHttp();
              
        var obs = Observable.create((observer: any) => {
            observer.onNext(1);
            observer.onNext(2);
            observer.onNext(3);
            observer.onNext(4);
            observer.onCompleted();
        });

        obs.subscribe(Observer.create((value) => {
                console.log(value);
        }));

        

        console.log("Done..");


        return 0;
    }

    public logValue(val : any) {
        console.log(val);
    }

    public observer1(){
        Rx.Observable.just("Hello world").subscribe((value) => {
            console.log("Hello world " + value);
        });

        var arr = new Array("Brian", "Hans", "Jens", "Brian");

        Rx.Observable.from(arr).distinct().subscribe(value => {
            console.log(value);            
        });
    }

    public observer2(){

        var o = Rx.Observable.create((observer) => {
            observer.onNext("Brian");
            observer.onNext("Jens");
            observer.onNext("Hans");
            observer.onCompleted();
        });

        var observer = Rx.Observer.create(
            (x) => { console.log(x); },
            (err) => { console.log("Error" + err)},
            () => { console.log("Completed" )}
        )

        o.subscribe(observer);
        
    }

    public observer3() {
        var src = Rx.Observable.range(1,5);
        var sum = src.reduce((acc,x) => acc + x);
        

        sum.subscribe(this.logValue);

        var s = src.reduce((prev, cur) => {
            return {
                sum: prev.sum + cur,
                count: prev.count + 1
            }
        }, {sum: 0, count:0 }).map(o => o.sum / o.count);

        s.subscribe(x => console.log("Average is" + x));
    }

    public observer4() {

        var x = new xhr();
        x.open("GET", "http://127.0.0.1:8080/Member/SearchByName/Hans A");

        x.onload = (e) => {
            var o = JSON.parse(x.responseText) as Array<Models.GM_MEDLE>;
            
            o.map(element => element.GM_PNAVN).forEach(elm => console.log(elm));
        };

        x.send(null);

        

        /*new Promise((resolve, reject) => {

            http.get("http://127.0.0.1:8080/Member/Get/2111600379", (res) => {
                console.log(`Got response: ${res.statusCode}`);

                res.on("readable", () => {
                    console.log(1);
                    resolve(res.read());
                });

                
            }).on("error", (e) => {
                reject(`Got error ${e.message}`);
            });
        }).then((val) => {
            console.log("Success ");
            console.log(val);        
        });*/
        
    }

    public observer5() {
        Rx.DOM.get("http://127.0.0.1:8080/Member/GetAll").subscribe((value) => { console.log(value)}, (err) => { console.log(err)})
        
    }

    public getHttp(){
        
        /*http.get("http://www.google.com/index.html", (res) => {
            console.log(`Got response: ${res.statusCode}`);
            res.resume();
        }).on("error", (e) => {
            console.log(`Got error ${e.message}`);
        });*/
    }
}
/**
 * 
 */
Startup.main();