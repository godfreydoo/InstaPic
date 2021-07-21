import Iron from '@hapi/iron';

export const createLoginSession = async (session, secret) => {
  try {
    const createdAt = Date.now();
    const obj = { ...session, createdAt };
    const token = await Iron.seal(obj, secret, Iron.defaults);

    return token;
  } catch (err) {
    console.log(err);
    console.log('Something went wrong in lib/auth.js createLoginSession');
  }

};

export const getLoginSession = async (token, secret) => {
  try {
    const session = await Iron.unseal(token, secret, Iron.defaults);
    const expiresAt = session.createdAt + session.maxAge * 1000;

    if (session.maxAge && Date.now() > expiresAt) {
      throw new Error('Session expired');
    }

    return session;
  } catch (err) {
    console.log(err);
    console.log('Something went wrong in lib/auth.js getLoginSession');
  }
};