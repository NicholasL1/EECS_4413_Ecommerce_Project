import axios from 'axios';
import { api, headers } from "./config";
axios.defaults.withCredentials = true

export default class AdminServices {
    static DB = axios.create({ baseURL: `${api}`, withCredentials: true  });

    static async GetAllOrders(token) {
        try {

            const response = await this.DB.get('/Order/GetAllOrders', {
                headers: {
                    Authorization: token,
                    ...headers,
                }
            });

            if (response.data?.length === 0)
                return { message: 'No Orders Have Been Placed', data: [] };
            return { message: '', data: response.data };

        } catch (err) {
            console.error('Token Expired')
            return { message: 'Your session has expired, please log back in', data: [] };
        }
    }

    static async GetAllProducts(token) {
        try {
            const response = await this.DB.get('/Product/FetchAll', {
                headers: {
                    Authorization: token,
                    ...headers
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
                    Authorization: token,
                    ...headers
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
                    Authorization: token,
                    ...headers
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
                    Authorization: token,
                    ...headers
                }
            })
            return true
        } catch(err) {
            console.log(err)
            return false
        }
    }

    static async GetAllCustomers (token) {
        try {
            const response = await this.DB.get('/Admin/GetAllCustomers', {
                headers: {
                    Authorization: token,
                    ...headers
                }
            })

            return response.data
        } catch(err) {
            console.error('Error fetching Product(s):', err);
            throw new Error('Your session has expired, please log back in')
        }
    }

    static async RemoveUser(token, user_id) {
        try {
            await this.DB.post('/Admin/RemoveUser', {user_id: user_id}, {
                headers: {
                    Authorization: token,
                    ...headers
                }
            })
            return true
        } catch(err) {
            console.log(err)
            return false
        }
    }

    static async EditCustomer(token, changes, prev_email) {
        try {
            await this.DB.post('/Admin/UpdateCustInfo', {
                email: prev_email,
                update: {
                    email: changes.email,
                    first_name: changes.first_name,
                    last_name: changes.last_name,
                    address: changes.address,
                }
            }, 
            {
                headers: {
                    Authorization: token,
                    ...headers
                }
            })
            return true
        } catch(err) {
            console.log(err)
            return false
        }
    }

    static async GetTotals(token) {
        try {
            const response = await this.DB.get('/Order/GetSales', {
                headers: {
                    Authorization: token,
                    ...headers
                }
            })

            const totals = response.data.totals

            const totals_output = []
            for (const [key, value] of Object.entries(totals)) {
                const title = key.split('_').map(w => {return w.charAt(0).toUpperCase() + w.substring(1, w.length)}).join(' ')
                totals_output.push({title: title, value: value})
            }

            return {message: '', data: {
                totals: totals_output,
                shoes: response.data.shoes,
                dates: response.data.dates
            }}

        } catch (err) {
            console.error(err)
            throw new Error('Your session has expired, please log back in')
        }
    }


}
