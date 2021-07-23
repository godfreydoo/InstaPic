module.exports = {
  images: {
    domains: ['res.cloudinary.com']
  },
  env: {
    cloudinaryPreset: process.env.CLOUDINARY_PRESET,
    cloudinaryUrl: process.env.CLOUDINARY_URL
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};
