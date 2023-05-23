class ProductManager {
    constructor() {
        this.products = [];
    }


    static id = 0;

    addProduct(title, description, price, img, code, stock) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code) {
                console.log(`El código ${code} está repetido`);
                break;
            }
        }
        const newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
        }

        if (!Object.values(newProduct).includes(undefined)) {
            ProductManager.id++
            this.products.push({
                ...newProduct,
                id: ProductManager.id
            });
        } else {
            console.log("Todos los campos son obligatorios")
        }
    }


    getProducts() {
        return this.products;
    }

    exist(id) {
        return this.products.find((producto) => producto.id === id);
    }

    getProductById(id) {
        !this.exist(id) ? console.log("Not Found") : console.log(this.exist(id));
    }
}

const products = new ProductManager;
//Primera llamada arreglo vacío
console.log (products.getProducts());

//Agrega producto
products.addProduct('Case1', 'descripcion1', 1500, "imagen1", "abc123", 10);
products.addProduct('Case2', 'descripcion2', 2000, "imagen2", "abc456", 15);
products.addProduct('Case3', 'descripcion3', 2000, "imagen3", "abc456", 13);


//Busca producto por ID
products.getProductById(2);

//Busca ID no encontrado
products.getProductById(5);

//Busca code repetido
products.addProduct('Case3', 'descripcion3', 2000, "imagen3", "abc456", 13);
