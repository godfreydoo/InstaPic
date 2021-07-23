import nextConnect from 'next-connect';
import { getTotalPosts } from '../../lib/db';

const handler = nextConnect();

handler
  .get(async (req, res) => {
    const response = await getTotalPosts();
    res.status(201).json(response);
  });

export default handler;