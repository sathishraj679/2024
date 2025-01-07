class car{
    constructor (name,brand,model){
        this.name=name;
        this.brand=brand;
        this.model=model;
    }
    showDetails(){
        console.log(`The car's name is ${this.name} and the brand is ${this.brand} and the model is ${this.model}`);
    }
    
}
let city= new car("City","Honda",2022);
let ciaz=new car("Ciaz","Suzuki",2018);
let beat=new car("Beat","Chevrolet",2010);
city.showDetails();
ciaz.showDetails();
beat.showDetails();