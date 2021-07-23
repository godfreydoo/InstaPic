import nextConnect from 'next-connect';
import { getPosts } from '../../lib/db';

const handler = nextConnect();

handler
  .get(async (req, res) => {

    let response;
    if (req.query.username !== 'undefined') {
      response = await getPosts(req.query.username);
    } else {
      response = await getPosts();
    }

    res.setHeader(
      'Cache-Control',
      's-maxage=86400'
    );
    res.status(201).json(response);
  });

export default handler;