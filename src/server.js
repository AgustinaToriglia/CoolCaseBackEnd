import express from "express"
import ProductManager from "./components/fileSystem.js"

const app = express ()
app.use(express.urlencoded({extended : true}));

const products = new ProductManager();
const readProducts = products.readProducts()

app.get("/products", async (req,res) =>{
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await readProducts)
    let AllProducts = await readProducts
    let productLimit = AllProducts.slice(0, limit)
    res.send(productLimit);
});

app.get("/products/:id", async (req,res) =>{
    let id = parseInt(req.params.id)
    let AllProducts = await readProducts
    let productById = AllProducts.find(product => product.id === id)
    res.send(productById)
});


const PORT= 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Express por localhost ${server.address().port}`)
})

server.on("error", (error) => console.log(`Error del servidor ${error}`))