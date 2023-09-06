import nc from "next-connect";
import db from "../../../../utils/db";
import Order from "../../../../models/Order";
import onError from "../../../../utils/error";
import { isAuth } from "../../../../utils/auth";
import { DefaultSerializer } from "v8";

const handler = nc({
    onError,
});

handler.use(isAuth);

handler.put(async(req, res) => {
    await db.connect();
    const order = await Order.findById(req.query._id);
    if(order === true) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const deliveredOrder = await order.save();
        await db.disconnect();
        res.send({ message: 'Produto enviado', order: deliveredOrder}); 
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'Produto não encontrado'});
    };
});

export default handler;