const fs = require('fs')

let productos = []

class ProductManager {
    constructor(ruta){
        this.products = productos
        this.path = ruta
    }

    getProducts = async() => {
        try{
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(contenido)
            return this.products
        }catch(error){
            if (error.message.includes('ENOENT: no such file or directory')) return []
            console.log(`este error ${error}`)
        }
    }

    addProduct = async(newProduct) => {
        try{
            if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.stock ||
                !newProduct.code) return 'Todos los campos son necesarios'
            let codeProd = this.products.find(prod => prod.code === newProduct.code)
            if (codeProd) return 'Un producto con este code ya fue ingresado' 
            if(this.products.length === 0){
                this.products.push({id: 1, ...newProduct})
            }else{
                this.products.push({id: this.products[this.products.length -1].id + 1, ...newProduct})
            }        
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,'utf-8','\t'))
            return 'Producto cargado exitosamente'   
        }catch (error){
            return(error)
        }
    }

    getProductById = async (id) => {
        this.getProducts();
        let product = this.products.find(prod => prod.id === id)
        if(!product) return 'Not found'
        return product
    }


    updateProduct = async (id, updProdCompleto) => {
        try{
            let producto = this.products.find(prod => prod.id === id)
            if (!producto) return 'Not found'
            producto.title = updProdCompleto.title
            producto.description = updProdCompleto.description
            producto.price = updProdCompleto.price
            producto.thumbnail = updProdCompleto.thumbnail
            producto.stock = updProdCompleto.stock
            producto.code= updProdCompleto.code
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,'utf-8','\t'))
            return 'Producto actualizado correctamente'
        }catch (error){
            return(error)
        }
    }

    deleteProduct  = async (idDelete) => {
        try{
            const remove = this.products.filter(prod => prod.id !== idDelete)
            if (remove.length === this.products.length) return 'Id no encontrado'
            this.products = remove
            await fs.promises.writeFile(this.path, JSON.stringify(remove,'utf-8','\t'))
            return 'Producto eliminado'
        }catch (error){
            return(error)
        }
    }
}

const product = new ProductManager('./archivoProducto.json');

const fileTest = async() => {
    // console.log(await product.getProducts())

    // // ----------  Prueba para añadir productos ----------------

    //     console.log(await product.addProduct({
    //         title: 'Camiseta Argentina', 
    //         description: 'Camiseta Argentina Pre Match 2022', 
    //         price: 3000, 
    //         thumbnail: 'https://res.cloudinary.com/dt0wab3c0/image/upload/v1666807793/FAG%20-%20Tienda%20futbolera/Camiseta_Argentina_Pre_Match_2022_ppphja.jpg', 
    //         stock: 25, 
    //         code: 'abc123'
    //     }))

    //      console.log(await product.addProduct({
    //         title: 'Buzo Boca', 
    //         description: 'Buzo Boca Algodon 2022',          
    //         price: 7000, 
    //         thumbnail: 'https://res.cloudinary.com/dt0wab3c0/image/upload/v1666808044/FAG%20-%20Tienda%20futbolera/Buzo_Boca_Algodon_2022_ojeudp.jpg', 
    //         stock: 10,          
    //         code: 'abc124'
    //      }))

    //      console.log(await product.addProduct({
    //         title: 'Short Estudiantes', 
    //         description: 'Short Estudiantes Blanco 2022', 
    //         price: 2500, 
    //         thumbnail: 'https://res.cloudinary.com/dt0wab3c0/image/upload/v1666808201/FAG%20-%20Tienda%20futbolera/Short_Estudiantes_Blanco_2022_thm6vs.jpg', 
    //         stock: 20, 
    //         code: 'abc125'
    //      }))

    //      console.log(await product.addProduct({
    //         title: 'Camiseta Boca Retro', 
    //         description: 'Camiseta Boca Retro Original adidas', 
    //         price: 5500, 
    //         thumbnail: 'https://res.cloudinary.com/dt0wab3c0/image/upload/v1666976248/FAG%20-%20Tienda%20futbolera/Camise_Boca_Retro_kriveu.jpg', 
    //         stock: 30, 
    //         code: 'abc126'
    //      }))

    //      console.log(await product.addProduct({
    //         title: 'Camiseta River Titular', 
    //         description: 'Camiseta River Titular 2022', 
    //         price: 4500, 
    //         thumbnail: 'https://res.cloudinary.com/dt0wab3c0/image/upload/v1666976355/FAG%20-%20Tienda%20futbolera/Camise_River_Titular_2022_pmsvs1.jpg', 
    //         stock: 8, 
    //         code: 'abc127'
    //      }))

    //      console.log(await product.getProducts())


    // ----------  Prueba para actualizar productos ----------------

        //  console.log(await product.updateProduct(1, {
        //     title: 'producto modificado', 
        //     description: 'Este es un producto prueba', 
        //     price: 200, 
        //     thumbnail: 'sin imagen', 
        //     stock: 200, 
        //     code: 'abc123'
        //  }))


    // ----------  Prueba para eliminar productos ----------------

        //  console.log(await product.deleteProduct(2))

        // console.log(await product.getProducts())


    // ----------  Prueba para mostrar el producto con el id ingresado ----------------
    // console.table(await product.getProductById(3))
}

fileTest();

module.exports = ProductManager;
