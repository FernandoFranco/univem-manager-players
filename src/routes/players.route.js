const { Router } = require('express');
const PlayersController = require('../controllers/players.controller');

const router = Router();
const controller = new PlayersController();

router.post('/', controller.create);
router.get('/', controller.findMany);

module.exports = router;
