import rx = require("rx");
import http = require("http");
import xhr = require("xhr2");

class Startup {
    public static main() : number {
        
        var s = new Startup();
        s.observer3();
        //s.getHttp();
        console.log("Done..");
        


        return 0;
    }

    public logValue(val : any) {
        console.log(val);
    }

    public observer1(){
        rx.Observable.just("Hello world").subscribe((value) => {
            console.log("Hello world " + value);
        });

        var arr = new Array("Brian", "Hans", "Jens", "Brian");

        rx.Observable.from(arr).distinct().subscribe(value => {
            console.log(value);            
        });
    }

    public observer2(){

        var o = rx.Observable.create((observer) => {
            observer.onNext("Brian");
            observer.onNext("Jens");
            observer.onNext("Hans");
            observer.onCompleted();
        });

        var observer = rx.Observer.create(
            (x) => { console.log(x); },
            (err) => { console.log("Error" + err)},
            () => { console.log("Completed" )}
        )

        o.subscribe(observer);
        
    }

    public observer3() {
        var src = rx.Observable.range(1,5);
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

    public getHttp(){
        
        http.get("http://www.google.com/index.html", (res) => {
            console.log(`Got response: ${res.statusCode}`);
            res.resume();
        }).on("error", (e) => {
            console.log(`Got error ${e.message}`);
        });
    }
}
/**
 * 
 */
Startup.main();