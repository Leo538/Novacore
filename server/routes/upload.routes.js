import { Router } from 'express';
import { uploadImage as uploadImageController } from '../controllers/upload.controller.js';
import { uploadImage as uploadImageMiddleware } from '../middleware/upload.js';

const router = Router();

router.post('/', uploadImageMiddleware, uploadImageController);

export default router;
