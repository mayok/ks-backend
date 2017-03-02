import express from 'express';
import { getTitles, getContent } from '../queries';

const router = express.Router();

router.get('/api/titles', getTitles);
router.get('/api/content', getContent);

export default router;
