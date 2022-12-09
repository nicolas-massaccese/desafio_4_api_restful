const express = require('express');

const { Router } = express;

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const products = [];

const productsRouter = Router();


productsRouter.get('/', (req, res) => res.json(products));


productsRouter.post('/', (req, res) => {
    const newID = products.length + 1;
    console.log(newID);

    const productToAdd = req.body;
    const newProduct = {'id':newID, ...productToAdd};
    products.push(newProduct);

    res.status(200).json({ products });
});

productsRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    let selectProduct = products.filter(product => product.id == id);

    if( selectProduct.length == 0 ){
        res.status(400).send({ error : 'producto no encontrado' });
        return;
    }    
    res.json(selectProduct);
});


productsRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    let selectProduct = products.filter(product => product.id == id);

    if( selectProduct.length == 0 ){
        res.status(400).send({ error : 'producto no encontrado' });
    } else{
        selectProduct = req.body;
        const index  = products.findIndex(product => product.id == id);
        products[index].title = selectProduct.title;
        products[index].price = selectProduct.price;
        products[index].thumbnail = selectProduct.thumbnail;

        res.json(selectProduct);
    }
});


productsRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    let selectProduct = products.filter(product => product.id !== id);

    if( selectProduct.length == 0 ){
        res.json({ error : 'producto no encontrado' });
    } else{
        const [removedProduct] = products.splice(id-1, 1);
        res.json({eliminado: removedProduct});
    }
});


app.use('/api/products', productsRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening in port ${PORT}`));





