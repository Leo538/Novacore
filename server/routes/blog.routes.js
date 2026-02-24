import express from 'express';
import * as blogController from '../controllers/blog.controller.js';
import { validateId } from '../middleware/validateId.js';

const router = express.Router();

router.get('/', blogController.list);
router.get('/:id', validateId, blogController.getById);
router.post('/', blogController.create);
router.put('/:id', validateId, blogController.update);
router.delete('/:id', validateId, blogController.remove);

export default router;
