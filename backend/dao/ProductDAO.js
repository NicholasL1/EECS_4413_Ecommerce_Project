const Shoe = require("../models/ProductModel");

class ProductDAO {

    static async fetchShoes(query) {
        //return query;                               // testing to see if query formatting is broken
        const shoes = await Shoe.find(query);
        return shoes;
    }

    static async fetchAll() {
        const shoes = await Shoe.find();
        return shoes;
    }

    static async updateStock({name, size, colour, stock}) {
        // fetch the shoe from the DB, adjust stock based on amount sold, rewrite shoe to DB w adjusted stock

        try {

            const update = await Shoe.updateOne({
                name: name,
                size: size,
                colour: colour
            }, {
                $inc: {stock: -stock}
            });
    
            if (update.modifiedCount > 0) {             // updateOne() returns count of number of entries modified, if unsuccessful then modifiedCount would = 0
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error);
        }

    }

}

module.exports = ProductDAO;