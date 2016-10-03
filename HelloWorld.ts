import rx = require("rx");
import http = require("http");

class Startup {
    public static main() : number {
        
        console.log("Hej smukke Brian");
        rx.Observable.just("Hello world").subscribe((value) => {
            console.log("Hello world " + value);
        });

        var arr = new Array("Brian", "Hans", "Jens", "Brian");

        rx.Observable.from(arr).distinct().subscribe(value => {
            console.log(value);            
        });
        
        http.get("http://www.google.com/index.html", (res) => {
            console.log(`Got response: ${res.statusCode}`);
            res.resume();
        }).on("error", (e) => {
            console.log(`Got error ${e.message}`);
        });

        return 0;
    }
}
/**
 * 
 */
Startup.main();