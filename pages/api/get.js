import nextConnect from 'next-connect';
import { getPosts } from '../../lib/db';

const handler = nextConnect();

handler
  .get(async (req, res) => {
    const postResponse = await getPosts();
    res.status(201).json(postResponse);
  });

export default handler;