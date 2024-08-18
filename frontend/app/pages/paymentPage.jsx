import React, { useState, useEffect } from 'react';
import PaymentService from "../../components/paymentsPage/paymentService";

// Ensure what is response.data and response.data.message

const PaymentsPage = () => {
    // Manage component state for payment methods and the input form
    const [userPayments, setUserPayments] = useState([]);
    // Managing the payment form, updates form object with new values when editing existing payment
    const [form, setForm] = useState({ card_number: '', cvc: '', expiry_date: '', payment_id: '' });

    useEffect(() => {
        // Fetch all payment methods for the user when the component loads
        const fetchUserPayments = async () => {
            try {
                const paymentsResult = await PaymentService.GetAllPayments();
                if (paymentsResult.message) {
                    console.error(paymentsResult.message)
                } else {
                    setUserPayments(paymentsResult.data)
                }

            } catch (error) {
                console.error('Error fetching payments,', error);
            }

        };

        fetchUserPayments();
    }, []);

    const handleInputChange = (e) => {
        // e.target.name input field being changed
        // e.target.value the new value entered by the user
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const updatePayment = async () => {
        try {
            const paymentResult = await PaymentService.UpdatePayment({
                payment_id: form.payment_id,
                card_number: form.card_number,
                cvc: form.cvc,
                expiry_date: form.expiry_date
            });

            if (paymentResult.message) {
                setUserPayments(
                    userPayments.map(userPayment =>
                        userPayment._id === form.payment_id ? response.data.message : userPayment
                    )
                )
                setForm({ card_number: '', cvc: '', expiry_date: '', payment_id: '' });
            } else {
                console.error(paymentResult.message)
            }

        } catch (error) {
            console.error('Error updating Payment', error);
        }
    };

    const addPayment = async () => {
        try {
            const paymentResult = await PaymentService.AddPayment(
                {
                    card_number: form.card_number,
                    cvc: form.cvc,
                    expiry_date: form.expiry_date,
                }
            );
            if (paymentResult.message) {
                console.error("Error adding in payment")
            } else {
                setUserPayments(
                    [...userPayments, paymentResult.data.message]
                );
                setForm({ card_number: '', cvc: '', expiry_date: '' });
            }


        } catch (error) {
            console.error('Error adding Payment', error);
        }
    };

    const deletePayment = async (payment_id) => {
        try {
            const paymentResult = await PaymentService.DeletePayment(payment_id);
            if (paymentResult.message) {
                setUserPayments(userPayments.filter(
                    payment => payment._id !== payment_id
                ));
            } else {
                console.error(result.message);
            }

        } catch (error) {
            console.error('Error deleting the Payment', error);
        }
    };

    const editPayment = async (payment_id) => {
        try {
            const edittedPayment = userPayments.find(
                payment => payment._id === payment_id
            );

            // If we have found the payment and it exists. We update the form state with details of the payment method
            if (edittedPayment) {
                setForm({
                    card_number: edittedPayment.card_number,
                    cvc: edittedPayment.cvc,
                    payment_id: edittedPayment.payment_id,
                    expiry_date: edittedPayment.expiry_date,
                });
            }


        } catch (error) {
            console.error('Error editing payment', error)
        }
    };

    return (
        <div>
            <h1>Managing Payments</h1>
            <div>
                <h2>{form.payment_id ? 'Edit' : 'Add'} Payment</h2>
            </div>
        </div>
    )

}

