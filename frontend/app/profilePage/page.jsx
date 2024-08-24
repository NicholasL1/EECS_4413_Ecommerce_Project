"use client";
import React, { useState, useEffect } from 'react';
import UserService from "../../services/userServices";

const ProfilePage = () => {
    const [userData, setUserData] = useState({});
    const [editField, setEditField] = useState(null);
    const [form, setForm] = useState({});
    const [message, setMessage] = useState('');
    const [hoverIndex, setHoverIndex] = useState(null);

    // Set feed back message to dispappear in 3 seconds
    useEffect(() => {
        if (message) {
            const timeout = setTimeout(() => {
                setMessage('');
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [message]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await UserService.GetUserById();
                if (result.success) {
                    setUserData(result.data);
                    setForm(result.data);
                } else {
                    setMessage('Error fetching user information: ' + result.message);
                }
            } catch (error) {
                setMessage('Error fetching user data: ' + error.message);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = (field) => {
        setEditField(field);
    };

    const handleCancel = () => {
        setEditField(null);
        setForm(userData);
    };

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const handleSubmit = async (field) => {
        try {
            const update = { [field]: form[field] };
            const result = await UserService.UpdateUser(update);
            if (result.success) {
                setUserData({ ...userData, ...update });
                setEditField(null);
                setMessage(`Successfully updated!`);
            } else {
                setMessage('Error updating user: ' + result.message);
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setMessage('Error updating user data: ' + error.message);
        }
    };

    const profilePageStyles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '2rem 1rem',
        },
        titleHeader: {
            color: '#dd2c2c',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        cardProfile: {
            border: '1px solid #272f29',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: '#e8e7ee',
            marginBottom: '15px',
        },
        subheader: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        flexBetween: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        button: {
            marginRight: '10px',
            padding: '8px 12px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #dcdfe6',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        saveButton: {
            padding: '8px 12px',
            backgroundColor: '#dd2c2c',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#dd2c2c',
            borderColor: '#ccc',
        },
        input: {
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            width: '90%',
            marginBottom: '10px',
        },
    };


    // Make into the JSON and then implement the hover event
    const userFields = ['first_name', 'last_name', 'email', 'address'];

    return (
        <div style={profilePageStyles.container}>
            <h1 style={profilePageStyles.titleHeader}>Account Settings & Security</h1>

            {message && <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '10px 15px', borderRadius: '5px', border: '1px solid #ddd', boxShadow: '0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>{<b>{message}</b>}</div>}

            {userFields.map((field, index) => (
                <div style={profilePageStyles.cardProfile} key={field}>
                    <h2 style={profilePageStyles.subheader}>{field.replace('_', ' ').toUpperCase()}</h2>
                    <div style={profilePageStyles.flexBetween}>
                        {editField === field ? (
                            <div style={{ width: '80%' }}>
                                <input
                                    style={profilePageStyles.input}
                                    type="text"
                                    name={field}
                                    value={form[field] || ''}
                                    onChange={handleChange}
                                    required
                                />
                                <button style={profilePageStyles.button} onClick={() => handleSubmit(field)}>Save</button>
                                <button style={profilePageStyles.button} onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <span>{userData[field]}</span>
                                <button
                                    style={{ ...profilePageStyles.button, ...(hoverIndex === index ? profilePageStyles.buttonHover : {}) }}
                                    onClick={() => handleEdit(field)}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}><b>Edit</b>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfilePage;