import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async(req, res) => {
    db.connect();
    const products = await Product.find({});
    db.disconnect();
    res.send(products);
});

export default handler;