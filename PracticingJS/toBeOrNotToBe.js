const expect =(value)=>{
    return{
        toBe:function(newVal){
            if(newVal!==value){
                return {"error":"Not Equal"};
            }else{
                return {value:true}
            };
        },
    notToBe:function(newVal){
        if(newVal===value){
             return {"error":"Not Equal"};
        }else{
            return  {value:true}
            
        };
  }, 
  
}
}

/*var expect = function(val) {
    return{
        toBe:(n)=>{
            if(val === n)return true;
            else  ("Not Equal");
        },

        notToBe:(n)=>{
            if(val !== n)return true;
            else  ("Equal");
        }
    }
};*/
console.log(expect(5).notToBe(null));