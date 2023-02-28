const fs = require('fs');
const path = require('path');

const drinksFilePath = path.join(__dirname, '../data/drinks.json');

/* Configuramos el controlador */
const drinksController = {

    allDrinks: ( req, res ) => {

        const drinks = JSON.parse( fs.readFileSync( drinksFilePath, 'utf-8' ) );

        res.status(200).json({
            drinks,
            status: 200,
        });

    },

    allDrinksAvailables: ( req, res ) => {

        const drinks = JSON.parse( fs.readFileSync( drinksFilePath, 'utf-8' ) );

        const drinksAvailables = drinks.filter( drink => drink.available === true );

        res.status(200).json({
            drinks: drinksAvailables,
            status: 200,
        });

    },

    drinkDetail: ( req, res ) => {

        const param = JSON.parse( req.params.id );

        const drinks = JSON.parse( fs.readFileSync( drinksFilePath, 'utf-8' ) );

        const drink = drinks.find( drinkJSON => drinkJSON.id === param );

        res.status(200).json({
            drink,
            status: 200,
        });

    },

    create: ( req, res ) => {

        const drinksFile = JSON.parse( fs.readFileSync( drinksFilePath, 'utf-8' ) );

        let drink = {
            id: drinksFile[ drinksFile.length - 1 ].id + 1,
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            price: JSON.parse( req.body.price ),
            image: req.file.filename,
            available: true
        }

        let drinks;

        if ( drinksFile === '' ) {
            drinks = [];
        } else {
            drinks = drinksFile;
        }

        drinks.push( drink );

        let drinksJSON = JSON.stringify( drinks );

        fs.writeFileSync( drinksFilePath, drinksJSON );
        
    },

    edit: ( req, res ) => {

        const param = JSON.parse( req.params.id );

        const drinksFile = JSON.parse( fs.readFileSync( drinksFilePath, 'utf-8' ) );

        let drink = drinksFile.find( drinkJSON => drinkJSON.id === param );

        let newDrink = {
            id: drink.id,
            title: req.body.title ? req.body.title : drink.title,
            category: drink.category,
            description: req.body.description ? req.body.description : drink.description,
            price: req.body.price ? JSON.parse( req.body.price ) : drink.price,
            image: req.file ? req.file.filename : drink.image,
            available: true
        }

        let drinks = drinksFile.filter( drinkFile => drinkFile.id !== param );

        drinks.push( newDrink );

        let drinksJSON = JSON.stringify( drinks );

        fs.writeFileSync( drinksFilePath, drinksJSON );

    },

    unavailable: ( req, res ) => {

        const param = JSON.parse( req.params.id );

        const drinksFile = JSON.parse( fs.readFileSync( drinksFilePath, 'utf-8' ) );

        let drink = drinksFile.find( drinkJSON => drinkJSON.id === param );

        let newDrink = {
            ...drink,
            available: false
        }

        let drinks = drinksFile.filter( drinkFile => drinkFile.id !== param );

        drinks.push( newDrink );

        drinks = drinks.sort( ( a, b ) => a.id - b.id );

        let drinksJSON = JSON.stringify( drinks );

        fs.writeFileSync( drinksFilePath, drinksJSON );

    },

    available: ( req, res ) => {

        const param = JSON.parse( req.params.id );

        const drinksFile = JSON.parse( fs.readFileSync( drinksFilePath, 'utf-8' ) );

        let drink = drinksFile.find( drinkJSON => drinkJSON.id === param );

        let newDrink = {
            ...drink,
            available: true
        }

        let drinks = drinksFile.filter( drinkFile => drinkFile.id !== param );

        drinks.push( newDrink );

        drinks = drinks.sort( ( a, b ) => a.id - b.id );

        let drinksJSON = JSON.stringify( drinks );

        fs.writeFileSync( drinksFilePath, drinksJSON );

    }

}

/* Exportamos el controlador */
module.exports = drinksController;