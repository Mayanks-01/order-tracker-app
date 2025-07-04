module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  console.log('🔐 Header:', auth);
  console.log('🔐 Env Secret:', process.env.ADMIN_SECRET);

  if (!auth || auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  next();
};
