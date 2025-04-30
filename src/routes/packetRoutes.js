import express from 'express';
import { savePacket } from '../controllers/packetController.js';

const router = express.Router();

router.post('/packets', savePacket);

export default router;