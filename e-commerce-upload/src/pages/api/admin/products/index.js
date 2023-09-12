import nc from "next-connect";
import Product from "../../../../models/Product";
import db from "../../../../utils/db";
import { isAdmin, isAuth } from "../../../../utils/auth";

const handler = nc();
handler.use(isAdmin, isAuth);

handler.get(async (req, res) => {
    await db.connect();
    const products = await Product.find({});
    await db.disconnect();
    res.send(products);
});

handler.post(async (req, res) => {
    await db.connect();
    const newProduct = new Product({
        name: "Produto-base",
        slug: "Produto-base",
        category: "Produto-base",
        image: "/image 4.png",
        isFeatured: true,
        featuredImage: "/image 4.png",
        price: 80,
        brand: "Produto-base",
        countInStock: 10,
        description: "Produto-base",
    });

    const product = await newProduct.save();
    await db.disconnect();
    res.send({ message: "Produto Criado com sucesso!", product });
});


export default handler;