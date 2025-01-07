async function sleep(millis) {
    let promise = new Promise((resolve,reject)=>{
        setTimeout(() => {
            let fail = false;
            if(fail){
            reject("Error");
            }else{
                resolve("done");
            }
    }, millis);
});

let response = await promise;
    }
     let t = Date.now()
    sleep(100).then(() => console.log(Date.now() - t)) 