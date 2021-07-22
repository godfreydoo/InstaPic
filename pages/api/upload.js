import nextConnect from 'next-connect';
import { savePost } from '../../lib/db';

const handler = nextConnect();

handler
  .post(async (req, res) => {
    const { username, description, url } = req.body;
    if (!username || !description || !url) {
      return res.status(400).send('There are missing fields');
    }

    const postResponse = await savePost(req.body);
    res.status(201).end();
  });

export default handler;