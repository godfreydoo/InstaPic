import nextConnect from 'next-connect';
import auth from '../../middleware/auth';
import { createUser, findUserByUsername } from '../../lib/db';

const handler = nextConnect();

handler
  .use(auth)
  .post(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('There are missing fields');
    }

    const alreadyExists = await findUserByUsername(req, username);
    if (alreadyExists) {
      return res.status(400).send(`This username, ${username} cannot be used`);
    }
    const user = { username, password };

    const userData = await createUser(req, user);
    res.status(201).json({username: userData.username});
  });

export default handler;