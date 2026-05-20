const router = require('express').Router();
const c = require('../controllers/assetController');
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

router.use(verifyToken, authorizeRoles('admin', 'hr'));
router.get('/summary', c.summary);
router.get('/employee/:employeeId/damages', c.employeeDamages);
router.get('/', c.listAssets);
router.get('/:id', c.getAssetById);
router.post('/', c.createAsset);
router.patch('/:id', c.updateAsset);
router.post('/:id/comment', c.addComment);
router.patch('/:id/damage', c.markDamaged);
router.delete('/:id', c.deleteAsset);

module.exports = router;