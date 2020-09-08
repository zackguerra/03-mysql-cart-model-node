const fs = require('fs');
const path = require('path');

const Cart = requite('./cart.model');

//path to products.json
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = cb =>{
    fs.readFile(p, (err, fileContent)=>{
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Products = {
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    //save
    save(){
        getProductsFromFile(products =>{
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this; //overwrite the element
                fs.wrireFile(p, JSON.stringify(updatedProducts), err=>{
                    console.log(err);
                })
            }else{
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err=>{
                    console.log(err);
                })
            }
        })
    }

    //delete by id
    static deleteById(id){
        getProductsFromFile(products =>{
            const productToDelete = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err=>{
                console.log(err);
                if(!err){
                    Cart.deleteProduct(id, productToDelete.price);
                }
            });
        });
        
    }
    //fetch all data
    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    //find by id
    static findById(id, cb){
        getProductsFromFile(products =>{
            const product = products.find(prod => prod.id === id);
            cb(product);
        })
    }
}