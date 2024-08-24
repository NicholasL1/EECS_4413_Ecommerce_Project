const express = require('express')
const router = express.Router()

const OrderService = require('../services/OrderService')
const verifyToken = require('../config/verifyToken')
const verifyAdmin = require('../config/verifyAdmin')

//#region POST requests
router.post('/CancelOrder/:orderID', verifyToken, async (req, res) => {    
    const order_id = req.params.orderID
    try {
        const result = await OrderService.CancelOrder(order_id)
        res.send(result)
    } catch (err) {
        res.send(err.message)
    }
})
//#endregion

//#region GET requests
router.get('/UserOrderHistory/', verifyToken, async (req, res) => {    
    const user_id = req.user['userData'][0]
    const result = await OrderService.UserOrderHistory(user_id)
    res.send(result)
})

router.get('/StoreOrderHistory', verifyToken, async (req, res) => {
    const user_id = req.user['userData'][0]

    try {
        const result = await OrderService.StoreOrderHistory(user_id)
        res.send(result)
    } catch (err) {
        res.send(err.message)
    }

})

router.get('/GetSales', verifyToken, async(req, res) => {
    try {
        const result = await OrderService.GetSalesStats()
        res.send(result)
    } catch (err) {
        res.send(err.message)
    }
})

router.get('/GetAllOrders', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const result = await OrderService.GetAllOrders()
        res.json(result)
    } catch (err) {
        res.send(err.message)
    }
})

//#endregion

module.exports = router