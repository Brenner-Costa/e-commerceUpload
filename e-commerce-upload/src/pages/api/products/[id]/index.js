import nc from 'next-connect';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  //colocar o await antes de db
  db.connect();
  const product = Product.findById(req.query.id);
  //colocar o await antes de db
  db.disconnect();
  res.send(product);
});

export default handler;
