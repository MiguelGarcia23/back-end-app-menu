/* Importando el módulo Express */
const express = require('express');

/* Ejecutamos la función Router de Express */
const router = express.Router();

/* Importamos el controlador de proyectos */
const salesController = require ('../controllers/salesController');

/* Importamos el middleware Multer */
const multerMiddleware = require ('../middlewares/uploadImageFood');

/* Configuramos el envío de todas las ventas */
router.get ('/', salesController.allSales);

/* Configuramos el envío de todas las ventas del día */
router.get ('/daily', salesController.salesDaily);

/* Configuramos el envío de todas las ventas de la semana */
router.get ('/weekly', salesController.salesWeekly);

/* Configuramos el envío de todas las ventas del mes */
router.get ('/monthly', salesController.salesMonthly);

/* Configuramos el envío de todas las ventas del año */
router.get ('/annual', salesController.salesAnnual);

/* Configuramos el envío de todos los pedidos pendientes de aprobación */
router.get('/pending', salesController.pending);

/* Configuramos el envío de cada venta */
router.get ('/:id', salesController.saleDetail);

/* Configuramos el guardado de un nuevo pedido */
router.post('/new', multerMiddleware.single('image'), salesController.new);

/* Configuramos el eliminar el pedido que se rechace */
router.post('/pending/decline/:id', salesController.decline);

/* Configuramos el eliminar el pedido que se rechace */
router.post('/pending/approve/:id', salesController.approve);

/* Exportamos la variable router */
module.exports = router;