import nextConnect from 'next-connect';
import { getPosts } from '../../lib/db';

const handler = nextConnect();

handler
  .get(async (req, res) => {
    const { username, page, count } = req.query;

    let response;
    if (username === 'undefined') {
      response = await getPosts(undefined, page, count);
    } else {
      response = await getPosts(username, page, count);
    }

    res.setHeader(
      'Cache-Control',
      's-maxage=86400'
    );
    res.status(201).json(response);
  });

export default handler;