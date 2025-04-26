/**
 * Middleware de gestion d'erreurs centralisé
 */
const errorHandler = (err, req, res, next) => {
  console.error('Erreur :', err.stack);

  // Erreurs Prisma
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      status: 'error',
      message: 'Erreur de base de données',
      error: err.message,
    });
  }

  // Erreurs d'authentification
  if (err.name === 'UnauthorizedError' || err.message.includes('unauthorized')) {
    return res.status(401).json({
      status: 'error',
      message: 'Non autorisé',
    });
  }

  // Erreurs de validation
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Données invalides',
      errors: err.errors,
    });
  }

  // Erreur par défaut
  return res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Erreur serveur interne',
  });
};

module.exports = errorHandler; 