import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  db.connect();
  const categories = await Product.find({}).distinct('category');
  //colocar o await antes do db
  db.disconnect();
  res.send(categories);
});

export default handler;
