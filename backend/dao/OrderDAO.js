const Orders = require('../models/OrderModel')
const Shoe = require('../models/ProductModel')
const User = require('../models/UserModel')

class OrderDAO {
    static async GetAllOrders() {
        try {
            const orders = await Orders.find();

            const result = []

            for (const order of orders) {
                
                const order_item = {}
                order_item['order'] = {
                    order_id: order._id,
                    total: order.total,
                    date: order.date
                }

                const user = await User.findOne({_id: order.user_id})
                order_item['user'] = user
                
                order_item['shoes'] = []

                for (const [shoe_id, shoe_order] of order.shoes.entries()) {
                    const shoe = await Shoe.findOne({_id: shoe_id})
                    const {qty, price, obj_id} = shoe_order
                    order_item['shoes'].push({shoe: shoe, qty: qty, total: price * qty})
                }  
                
                result.push(order_item)
            }

            return result
        } catch (err) {
            console.log(err)
            throw new Error('Something went wrong fetching all the orders')
        }
    }



}



module.exports = OrderDAO