/* Importando el módulo Express */
const express = require('express');

/* Ejecutamos la función Router de Express */
const router = express.Router();

/* Importamos el controlador de proyectos */
const drinksController = require ('../controllers/drinksController');

/* Importamos el middleware Multer */
const multerMiddleware = require ('../middlewares/uploadImageDrink');

/* Configuramos el envío de todas las bebidas */
router.get ('/', drinksController.allDrinks);

/* Configuramos el envío de todas las bebidas disponibles */
router.get ('/availables', drinksController.allDrinksAvailables);

/* Configuramos el envío de cada bebida */
router.get ('/:id', drinksController.drinkDetail);

/* Configuramos la ruta de creación de bebida */
router.post ('/create', multerMiddleware.single('image'), drinksController.create);

/* Configuramos la ruta de edición de bebida */
router.post ('/edit/:id', multerMiddleware.single('image'), drinksController.edit);

/* Configuramos la ruta de inhabilitar bebida */
router.post ('/unavailable/:id', drinksController.unavailable);

/* Configuramos la ruta de habilitar bebida */
router.post ('/available/:id', drinksController.available);

/* Exportamos la variable router */
module.exports = router;