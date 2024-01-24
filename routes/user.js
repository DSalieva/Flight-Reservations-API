const router = require('express').Router()
const userCtrl = require('../controllers/user')
const permissions = require('../middlewares/permissions');

router.use(permissions.isAdmin)

router.route('/')
.get(userCtrl.list)
.post(userCtrl.create)


router.route('/:id')
.get(userCtrl.read)
.put(userCtrl.update)
.patch(userCtrl.update)
.delete(userCtrl.delete)



module.exports = router;