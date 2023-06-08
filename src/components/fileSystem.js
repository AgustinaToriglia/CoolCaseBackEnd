import { promises as fs } from "fs"

export default class ProductManager {
    constructor() {
        this.patch = "./productos.txt"
        this.product = []
    }
    static id = 0

    addProduct = async (title, description, price, image, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
            id: ProductManager.id
        }
        this.product.push(newProduct)
        await fs.writeFile(this.patch,JSON.stringify(this.product));
    };

    readProducts = async () => {
        let answer = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(answer)

    }

    getProducts = async () =>{
        let answer2 = await this.readProducts()
        return console.log(answer2)
    }

    getProductsById = async (id) => {
        let answer3 = await this.readProducts();
        if(!answer3.find(product => product.id === id)){
            console.log("Producto no encontrado");
        }else{
            console.log(answer3.find((product) => product.id === id));
        }
    };

    deleteProductsById = async (id) =>{
        let answer3 = await this.readProducts();
        let productFilter = answer3.filter(products => products.id != id)
        await fs.writeFile(this.patch,JSON.stringify(productFilter));
        console.log("Producto Eliminado")
    };

    updateProducts = async ({id, ...product}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts()
        let modifiedProducts= [{ ... product, id}, ...productOld]
        await fs.writeFile(this.patch,JSON.stringify(modifiedProducts));
    }
}

//const products = new ProductManager();

/* products.addProduct('Case1', 'descripcion1', 1500, "imagen1", "abc121", 5);
products.addProduct('Case2', 'descripcion2', 2000, "imagen2", "abc122", 5);
products.addProduct('Case3', 'descripcion3', 2000, "imagen3", "abc123", 3);
products.addProduct('Case4', 'descripcion4', 2000, "imagen4", "abc124", 6);
products.addProduct('Case5', 'descripcion5', 2500, "imagen5", "abc125", 7);
products.addProduct('Case6', 'descripcion6', 2500, "imagen6", "abc126", 3);
products.addProduct('Case7', 'descripcion7', 2800, "imagen7", "abc127", 8);
products.addProduct('Case8', 'descripcion8', 2800, "imagen8", "abc128", 8);
products.addProduct('Case9', 'descripcion9', 3000, "imagen9", "abc129", 3);
products.addProduct('Case10', 'descripcion10', 3000, "imagen10", "abc130", 4); */


//products.getProducts();

//products.getProductsById(2)

// products.deleteProductsById(2)
/* 
products.updateProducts ({
    title:"Case3",
    description:"descripcion3",
    price:2500,
    image:"imagen3",
    code:"abc456",
    stock:13,
    id:3
}) */