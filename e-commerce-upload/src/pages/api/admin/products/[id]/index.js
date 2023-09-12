import nc from "next-connect";
import Product from "../../../../../models/Product";
import db from "../../../../../utils/db";
import { isAdmin, isAuth } from "../../../../../utils/auth";

const handler = nc();

handler.use(isAdmin, isAuth);

handler.get(async(req, res) => {
    await db.connect();
    const product = await Product.findById(req.query._id);
    await db.disconnect();
    res.send(product);
});

handler.put(async(req, res) => {
    await db.connect();
    const product = await Product.findById(req.query._id);
    if(product) {
        product.name = req.body.name;
        product.slug = req.body.slug;
        product.category = req.body.category;
        product.image = req.body.image;
        product.isFeatured = req.body.isFeatured;
        product.featuredImage = req.body.featuredImage;
        product.price = req.body.price;
        product.brand = req.body.brand; 
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        await product.seve();
        await db.disconnect();
        res.send({ message: "Produto editado com sucesso!"})
    } else {
        await db.disconnect();
        res.status(404).send({ message: "Produto não encontrado!" });
    }
});

handler.delete(async(req, res) => {
    await db.connect();
    const product = await Product.findById(req.query._id);
    if(product) {
        await product.remove();
        await db.disconnect();
        res.send({ message: "Produto deletado com sucesso!" });
    } else {
        await db.disconnect();
        res.status(404).send({ message: "Produto não encontrado!" });
    }
});

export default handler;