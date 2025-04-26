const jwt = require('jsonwebtoken');
const { prisma } = require('../index');

/**
 * Middleware d'authentification JWT
 * Vérifie la validité du token JWT et attache l'utilisateur à la requête
 */
const authenticateJWT = async (req, res, next) => {
  try {
    // Récupération du token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Token d\'authentification manquant ou format invalide',
      });
    }

    // Extraction du token
    const token = authHeader.split(' ')[1];
    
    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Recherche de l'utilisateur en base de données
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        profilePicture: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Utilisateur non trouvé',
      });
    }

    // Attache l'utilisateur à l'objet de requête pour utilisation ultérieure
    req.user = user;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token invalide ou expiré',
      });
    }
    
    next(error);
  }
};

module.exports = { authenticateJWT }; 