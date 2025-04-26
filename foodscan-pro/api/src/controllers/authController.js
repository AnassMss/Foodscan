const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../index');

/**
 * Inscription d'un nouvel utilisateur
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction middleware suivante
 */
exports.register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Cet email est déjà utilisé',
      });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Génération du token JWT
    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Réponse
    res.status(201).json({
      status: 'success',
      message: 'Inscription réussie',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Connexion d'un utilisateur
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction middleware suivante
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Vérification de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(401).json({
        status: 'error',
        message: 'Email ou mot de passe incorrect',
      });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Email ou mot de passe incorrect',
      });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Réponse
    res.status(200).json({
      status: 'success',
      message: 'Connexion réussie',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Authentification via Google
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction middleware suivante
 */
exports.googleAuth = async (req, res, next) => {
  try {
    const { googleId, email, name, profilePicture } = req.body;

    // Recherche d'un utilisateur existant avec ce googleId ou email
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId },
          { email },
        ],
      },
    });

    if (user) {
      // Mise à jour des informations si nécessaire
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId,
          name: name || user.name,
          profilePicture: profilePicture || user.profilePicture,
        },
      });
    } else {
      // Création d'un nouvel utilisateur
      user = await prisma.user.create({
        data: {
          email,
          googleId,
          name,
          profilePicture,
        },
      });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Réponse
    res.status(200).json({
      status: 'success',
      message: 'Authentification Google réussie',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Authentification via Apple
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction middleware suivante
 */
exports.appleAuth = async (req, res, next) => {
  try {
    const { appleId, email, name } = req.body;

    // Recherche d'un utilisateur existant avec ce appleId ou email
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { appleId },
          { email },
        ],
      },
    });

    if (user) {
      // Mise à jour des informations si nécessaire
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          appleId,
          name: name || user.name,
        },
      });
    } else {
      // Création d'un nouvel utilisateur
      user = await prisma.user.create({
        data: {
          email,
          appleId,
          name,
        },
      });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Réponse
    res.status(200).json({
      status: 'success',
      message: 'Authentification Apple réussie',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Rafraîchissement du token
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction middleware suivante
 */
exports.refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        status: 'error',
        message: 'Token manquant',
      });
    }

    // Vérification du token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Token invalide ou expiré',
      });
    }

    // Recherche de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Utilisateur non trouvé',
      });
    }

    // Génération d'un nouveau token
    const newToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Réponse
    res.status(200).json({
      status: 'success',
      message: 'Token rafraîchi avec succès',
      data: {
        token: newToken,
      },
    });
  } catch (error) {
    next(error);
  }
}; 