import axios from 'axios';

export default class AdminServices {
    static DB = axios.create({ baseURL: 'http://localhost:3001/' });

    static async GetAllOrders(token) {
        try {
            const response = await this.DB.get('/Order/GetAllOrders', {
                headers: {
                    Authorization: token
                }
            });
            return { message: '', data: response.data };
        } catch (err) {
            console.error('Error fetching Orders:', err);
            return { message: 'No Data to Display, check logs', data: [] };
        }
    }

    static async GetAllProducts(token) {
        try {
            const response = await this.DB.get('/Product/FetchAll', {
                headers: {
                    Authorization: token
                }
            });
            return { message: '', data: response.data };
        } catch (err) {
            console.error('Error fetching Product(s):', err);
            return { message: 'No Data to Display, check logs', data: [] };
        }
    }

    static async EditProduct(token, product) {
        try {
            const response = await this.DB.post('/Admin/UpdateProduct', 
                {
                    product_id: product._id,
                    update: product
                }
                , {
                headers: {
                    Authorization: token
                }
            })
            return true
        } catch (err) {
            console.log(err)
        }
        return false
    }

    static async AddProduct(token, product) {
        try {
            await this.DB.post('/Admin/AddProduct', product, {
                headers: {
                    Authorization: token
                }
            })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    static async RemoveProduct(token, product_id) {
        try {
            await this.DB.post('/Admin/RemoveProduct', {product_id: product_id}, {
                headers: {
                    Authorization: token
                }
            })
            return true
        } catch(err) {
            console.log(err)
            return false
        }
    }
}
