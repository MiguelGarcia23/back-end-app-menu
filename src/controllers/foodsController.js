const fs = require('fs');
const path = require('path');

const foodsFilePath = path.join(__dirname, '../data/foods.json');

/* Configuramos el controlador */
const foodsController = {

    allFoods: ( req, res ) => {

        const foods = JSON.parse( fs.readFileSync( foodsFilePath, 'utf-8' ) );

        res.status(200).json({
            foods,
            status: 200,
        });
    },

    allFoodsAvailables: ( req, res ) => {

        const foods = JSON.parse( fs.readFileSync( foodsFilePath, 'utf-8' ) );

        const foodsAvailables = foods.filter( food => food.available === true );

        res.status(200).json({
            foods: foodsAvailables,
            status: 200,
        });
    },

    foodDetail: ( req, res ) => {

        const param = JSON.parse( req.params.id );

        const foods = JSON.parse( fs.readFileSync( foodsFilePath, 'utf-8' ) );

        const food = foods.find( foodJSON => foodJSON.id === param );

        res.status(200).json({
            food,
            status: 200,
        });
        
    },

    create: ( req, res ) => {

        const foodsFile = JSON.parse( fs.readFileSync( foodsFilePath, 'utf-8' ) );

        let food = {
            id: foodsFile[ foodsFile.length - 1 ].id + 1,
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            price: JSON.parse( req.body.price ),
            image: req.file.filename,
            available: true
        }

        let foods;

        if ( foodsFile === '' ) {
            foods = [];
        } else {
            foods = foodsFile;
        }

        foods.push( food );

        let foodsJSON = JSON.stringify( foods );

        fs.writeFileSync( foodsFilePath, foodsJSON );

        res.send('Éxito')
        
    },

    edit: ( req, res ) => {

        const param = JSON.parse( req.params.id );

        const foodsFile = JSON.parse( fs.readFileSync( foodsFilePath, 'utf-8' ) );

        let food = foodsFile.find( foodJSON => foodJSON.id === param );

        let newFood = {
            id: food.id,
            title: req.body.title ? req.body.title : food.title,
            category: food.category,
            description: req.body.description ? req.body.description : food.description,
            price: req.body.price ? JSON.parse( req.body.price ) : food.price,
            image: req.file ? req.file.filename : food.image,
            available: true
        }

        let foods = foodsFile.filter( foodFile => foodFile.id !== param );

        foods.push( newFood );

        let foodsJSON = JSON.stringify( foods );

        fs.writeFileSync( foodsFilePath, foodsJSON );

    },

    unavailable: ( req, res ) => {

        const param = JSON.parse( req.params.id );

        const foodsFile = JSON.parse( fs.readFileSync( foodsFilePath, 'utf-8' ) );

        let food = foodsFile.find( foodJSON => foodJSON.id === param );

        let newFood = {
            ...food,
            available: false
        }

        let foods = foodsFile.filter( foodFile => foodFile.id !== param );

        foods.push( newFood );

        foods = foods.sort( ( a, b ) => a.id - b.id );

        let foodsJSON = JSON.stringify( foods );

        console.log( foodsJSON );

        fs.writeFileSync( foodsFilePath, foodsJSON );

    },

    available: ( req, res ) => {

        const param = JSON.parse( req.params.id );

        const foodsFile = JSON.parse( fs.readFileSync( foodsFilePath, 'utf-8' ) );

        let food = foodsFile.find( foodJSON => foodJSON.id === param );

        let newFood = {
            ...food,
            available: true
        }

        let foods = foodsFile.filter( foodFile => foodFile.id !== param );

        foods.push( newFood );

        foods = foods.sort( ( a, b ) => a.id - b.id );

        let foodsJSON = JSON.stringify( foods );

        fs.writeFileSync( foodsFilePath, foodsJSON );

    }

}

/* Exportamos el controlador */
module.exports = foodsController;