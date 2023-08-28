import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  //colocar o await antes de db
  db.connect();
  const products = await Product.find({});
  //colocar o await antes de db
  db.disconnect();
  res.send(products);
});

export default handler;
