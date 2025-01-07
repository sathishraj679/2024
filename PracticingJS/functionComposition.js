const compose =(functions)=>{
    if(functions.length===0){
        return function(x){
            return x;
        }
    }else{
        return function(x){
            let result =functions[functions.length-1](x);
            for(let i=functions.length-2;i>=0;i--){
                result = functions[i](result);
            }return result;
        }
    }
}
functions=[(x)=>x+1,(x)=>x*3,(x)=>x-2];
const output = compose(functions);
console.log(output(3));