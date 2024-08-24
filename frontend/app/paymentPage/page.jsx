"use client";
import React, { useState, useEffect } from 'react';
import PaymentService from "../../components/paymentsPage/paymentService";
import { toast } from "react-toastify";
import {isUserLoggedIn} from '../../lib/utils'
import AccessDenied from '@/components/AccessDenied';

const PaymentsPage = () => {
    
    if (!isUserLoggedIn())
        return <AccessDenied/>

    const [userPayments, setUserPayments] = useState([]);
    const [form, setForm] = useState({ card_number: '', cvc: '', expiry_date: '', payment_id: '' });

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const expiry_date_regex = /^\d{2}\/\d{2}$/
        const card_number_regex = /^\d{16}$/
        const cvc_regex = /^\d{3}$/

        const {card_number, cvc, expiry_date} = form

        if (!expiry_date_regex.test(expiry_date))
            return toast.error('Please enter the Date in MM/YY format')

        if (!card_number_regex.test(card_number))
            return toast.error('Please enter your Card Number (16 digits)')

        if (!cvc_regex.test(cvc)) 
            return toast.error('Please enter your CVC Number (3 digits)')

        if (form.payment_id) {
            updatePayment()
        } else {
            addPayment()
        }
    }

    useEffect(() => {
        const fetchUserPayments = async () => {
            try {
                const result = await PaymentService.GetAllPayments();
                console.log("Fetch payments result:", result);
                if (result.success && Array.isArray(result.data)) {
                    setUserPayments(result.data);
                } else {
                    console.error("Failed to fetch payments", result);
                    setUserPayments([]);
                }
            } catch (error) {
                console.error("Error fetching payments:", error);
                setUserPayments([]);
            }
        };

        fetchUserPayments();
    }, []);




    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const updatePayment = async () => {
        console.log("Updating payment with form data:", form);
        try {
            const paymentResult = await PaymentService.UpdatePaymentMethod({
                payment_id: form.payment_id,
                card_number: form.card_number,
                cvc: form.cvc,
                expiry_date: form.expiry_date
            });

            if (paymentResult === undefined) {
                throw new Error("Failed to Update payment method");
            }

            if (paymentResult && paymentResult.success) {
                const refreshedPayments = await PaymentService.GetAllPayments();
                if (refreshedPayments.success) {
                    setUserPayments(refreshedPayments.data);
                }
                setForm({ card_number: '', cvc: '', expiry_date: '', payment_id: '' });
            } else {
                console.error("Error updating payment:", paymentResult ? paymentResult.message : "Unknown error");
            }
        } catch (error) {
            console.error('Error updating Payment', error);
        }
    };
    const addPayment = async () => {
        try {
            const paymentResult = await PaymentService.AddPayment({
                card_number: form.card_number,
                cvc: form.cvc,
                expiry_date: form.expiry_date,
            });
            console.log("Add payment result:", paymentResult);
            if (paymentResult.success) {
                // Refresh the payments list after adding
                const refreshedPayments = await PaymentService.GetAllPayments();
                if (refreshedPayments.success) {
                    setUserPayments(refreshedPayments.data);
                }
                setForm({ card_number: '', cvc: '', expiry_date: '' });
            } else {
                console.error("Error adding payment:", paymentResult.message);
            }
        } catch (error) {
            console.error('Error adding Payment', error);
        }
    };

    const deletePayment = async (e, payment_id) => {
        e.preventDefault();
        try {
            const paymentResult = await PaymentService.DeletePayment(payment_id);
            if (paymentResult.success) {
                setUserPayments(userPayments.filter(
                    payment => payment._id !== payment_id
                ));
            } else {
                console.error('Error deleting the Payment', result.message);
            }

        } catch (error) {
            console.error('Error deleting the Payment', error);
        }
    };

    const editPayment = (e, payment) => {
        e.preventDefault();
        console.log("Editing payment:", payment);
        setForm({
            payment_id: payment._id, 
            card_number: payment.card_number,
            cvc: payment.cvc,
            expiry_date: payment.expiry_date
        });
    };


    return (
        <div style={cardStyles.container}>
            <h1 style={cardStyles.header}>Your Wallet</h1>
            <div style={cardStyles.section}>
                <h2 style={cardStyles.subHeader}>Cards and Accounts</h2>
                <div style={cardStyles.cardList}>
                    {userPayments.map((payment, index) => (
                        <div key={index} style={cardStyles.card}>
                            <div style={cardStyles.cardDetails}>
                                <h3>**** Credit Card ending with {payment.card_number ? payment.card_number.slice(-4) : 'N/A'}</h3>
                                <p>Expiry Date: {payment.expiry_date}</p>
                                <a href="#" onClick={(e) => editPayment(e, payment)} style={cardStyles.editLink}>Edit</a>
                                <p></p>
                                <a href="#" onClick={(e) => deletePayment(e, payment._id)} style={cardStyles.deleteLink}>Delete</a>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {form && (
                <div styles={formStyles.paymentFormContainer}>
                    <h1 style={cardStyles.subHeader}>Add a New Payment Method</h1>
                    <form onSubmit={handleSubmitForm} style={formStyles.paymentForm}>
                        <div styles={formStyles.formGroup}>
                            <label htmlFor="card_number">Card Number</label>
                            <input
                                style={formStyles.input}
                                type="text"
                                id="card_number"
                                name="card_number"
                                placeholder="4562 4212 6341 5612"
                                value={form.card_number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div styles={formStyles.formRow}>
                            <div styles={formStyles.formGroup}>
                                <label htmlFor="expiry_date">Expiry Date</label>
                                <input
                                    style={formStyles.input}
                                    type="text"
                                    id="expiry_date"
                                    name="expiry_date"
                                    placeholder="MM/YY"
                                    value={form.expiry_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div styles={formStyles.formGroup}>
                                <label htmlFor="cvc">CVC</label>
                                <input
                                    style={formStyles.input}
                                    type="text"
                                    id="cvc"
                                    name="cvc"
                                    placeholder="321"
                                    value={form.cvc}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" style={{ ...formStyles.submitButton, marginTop: '20px' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = formStyles.submitButtonHover.backgroundColor)}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = formStyles.submitButton.backgroundColor)}>Add Payment Method
                        </button>
                    </form>
                </div>
            )}
        </div>


    );
};

const formStyles = {
    paymentFormContainer: {
        backgroundColor: '#f8f8f8',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '400px',
        margin: '20px auto',
    },

    paymentForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    formRow: {
        display: 'flex',
        gap: '15px',
    },

    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    inputFocus: {
        outline: 'none',
        borderColor: '#007bff',
        boxShadow: '0 0 0 2px rgba(0,123,255,.25)',
    },
    submitButton: {
        backgroundColor: '#dd2c2c',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '20px'
    },
    submitButtonHover: {
        backgroundColor: '#0056b3',
    },
};


const cardStyles = {
    container: {
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#f5f7f7',
    },
    header: {
        color: '#dd2c2c',
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    section: {
        marginBottom: '40px',
    },
    subHeader: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    cardList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },

    cardDetails: {
        flexGrow: 2,
    },
    editLink: {
        color: '#0096FF',
        textDecoration: 'none',
        marginTop: '10px',
        display: 'inline-block',
    },
    deleteLink: {
        color: '#0096FF',
        textDecoration: 'none',
        marginTop: '10px',
        display: 'inline-block',
    },
    addCard: {
        backgroundColor: '#f5f7f7',
        padding: '20px',
        borderRadius: '8px',
        border: '2px dashed #0073bb',
        textAlign: 'center',
    },
    link: {
        color: '#dd2c2c',
        fontWeight: 'bold',
        textDecoration: 'none',
        fontSize: '16px',
    }
};

export default PaymentsPage;