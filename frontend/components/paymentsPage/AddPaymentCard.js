import React from 'react';

const AddPaymentCard = ({ opened, closed, submit, form, handleInputChange }) => {
    if (!opened) {
        return null;
    }

    return (
        <div className="main">
            <div className="content">
                <form
                    onSubmit={submit}
                >
                    <input
                        type="text"
                        name="card_number"
                        placeholder="Card Number"
                        value={form.card_number}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        value={form.cvc}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="expiry_date"
                        placeholder="Expiry Date"
                        value={form.expiry_date}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="modal-actions">
                        <button type="submit">Add Payment</button>
                        <button type="button" onClick={closed}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default AddPaymentCard;
