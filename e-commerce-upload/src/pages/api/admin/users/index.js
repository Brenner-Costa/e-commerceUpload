import nc from 'next-connect';
import db from '../../../../utils/db';
import User from '../../../../models/User';
import { isAdmin, isAuth } from '../../../../utils/auth';

const handler = nc();
handler.use(isAdmin, isAuth);

handler.get(async(req, res) => {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    res.send(users);
});

export default handler;