import { Router } from 'express'
import JenosizeController from '../controllers/JenosizeController'

const router = Router()

router.get('/restaurants', JenosizeController.searchPlace)
router.get('/game24/play', JenosizeController.playGame24)

export default router