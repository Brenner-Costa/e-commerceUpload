import nc from 'next-connect';
import db from '../../utils/db';
import data from '../../utils/data';
import Product from '../../models/Product';
import User from '../../models/User';

const handler = nc();

handler.get(async(req, res) => {
    await db.connect();
    // await User.deleteMany();
    // await Product.deleteMany();
    // await User.insertMany(data.users);
    // await Product.insertMany(data.products);
    await db.disconnect();
    res.send({message: 'Seeded com sucesso!'});
});

export default handler;