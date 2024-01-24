const router = require('express').Router

// EndPoint : /api/auth
router.use('/auth', require('./auth'));
// EndPoint : /api/users
router.use('/users', require('./user'));
// EndPoint: /api/passengers
router.use('/passengers', require('./passenger'));
// EndPoint: /api/flights
router.use('/flights', require('./flight'));
// EndPoint: /api/reservations
router.use('/reservations', require('./reservations'));
// EndPoint /api/documents
router.use('/documents', require('./document'));



module.exports = router;