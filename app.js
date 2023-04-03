const express = require('express');
const ProductManager = require('./ProductManager')

const app = express();
const port = 8080
const product = new ProductManager('./archivoProducto.json')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.status(200).send('<h1>Bienvenido</h1>')
});

app.get('/api/productos', async (req, res) => {
  try {
    const { limit } = req.query
    const products = await product.getProducts()
    if (!limit) {
      return res.send({
        status: 'succes',
        products
      })
    }
    return res.send({
      status: 'succes',
      products: products.slice(0, limit)
    })
  } catch (error) {
    console.log(error);
  }
})

app.get('/api/productos/:pid', async (req, res) => {
  try {
    const { pid } = req.params
    const productBD = await product.getProductById(parseInt(pid))
    if (!productBD) {
      return res.send({status: 'error', error: 'product not found'})
    }
    res.send({productBD})
  } catch (error) {
    console.log(error);
  }
})




app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});