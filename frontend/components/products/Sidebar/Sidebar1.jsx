import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import './Sidebar.css';
import {useState} from 'react';

const Sidebar1 = ({ handleMenuClick }) => {

    const [selectedFilters, setSelectedFilters] = useState({});

    const handleFilterSelect = (filterParam, filterValue) => {          // used to highlight sidebar items (query filters) that have been selected

        setSelectedFilters((prevFilters) => {

            const newFilters = {...prevFilters};

            if (newFilters[filterParam]) {                          // does the param (brand, category, etc.) already have a value?
                if (newFilters[filterParam] === filterValue) {
                    delete newFilters[filterParam];                 // if it's the same value, remove the filter (deselection)
                } else {
                    newFilters[filterParam] = filterValue;          // else just update the value with the new one
                }
            } else {
                newFilters[filterParam] = filterValue;          // else add the param-value to the list of filters
            }

            return newFilters
            
        });
    };


    const updateStyle = (filterParam, filterValue) => {                             // used to highlight selected filters to the user

        if (selectedFilters[filterParam] === filterValue) {
            return {backgroundColor: 'rgba(221, 44, 44, 0.85)', color: 'white'};        // this doesn't change the font colour to white, no idea why
        } else {
            return;
        }
    };


    const menuItems = [
        {
            label: 'Brand',
            items: [
                {label: 'Nike', command: () => {handleMenuClick('brand', 'Nike'); handleFilterSelect('brand', 'Nike')}, style: updateStyle('brand', 'Nike')},
                {label: 'Adidas', command: () => {handleMenuClick('brand', 'Adidas'); handleFilterSelect('brand', 'Adidas')}, style: updateStyle('brand', 'Adidas')},
                {label: 'Reebok', command: () => {handleMenuClick('brand', 'Reebok'); handleFilterSelect('brand', 'Reebok')}, style: updateStyle('brand', 'Reebok')},
                {label: 'Skechers', command: () => {handleMenuClick('brand', 'Skechers'); handleFilterSelect('brand', 'Skechers')}, style: updateStyle('brand', 'Skechers')},
                {label: 'Jordan', command: () => {handleMenuClick('brand', 'Jordan'); handleFilterSelect('brand', 'Jordan')}, style: updateStyle('brand', 'Jordan')},
                {label: 'Brooks', command: () => {handleMenuClick('brand', 'Brooks'); handleFilterSelect('brand', 'Brooks')}, style: updateStyle('brand', 'Brooks')},
                {label: 'Puma', command: () => {handleMenuClick('brand', 'Puma'); handleFilterSelect('brand', 'Puma')}, style: updateStyle('brand', 'Puma')},
                {label: 'Under Armour', command: () => {handleMenuClick('brand', 'Under Armour'); handleFilterSelect('brand', 'Under Armour')}, style: updateStyle('brand', 'Under Armour')},
                {label: 'Timberland', command: () => {handleMenuClick('brand', 'Timberland'); handleFilterSelect('brand', 'Timberland')}, style: updateStyle('brand', 'Timberland')},
                {label: 'Adidas Originals', command: () => {handleMenuClick('brand', 'Adidas Originals'); handleFilterSelect('brand', 'Adidas Originals')}, style: updateStyle('brand', 'Adidas Originals')},
                {label: 'Converse', command: () => {handleMenuClick('brand', 'Converse'); handleFilterSelect('brand', 'Converse')}, style: updateStyle('brand', 'Converse')},
                {label: 'Vans', command: () => {handleMenuClick('brand', 'Vans'); handleFilterSelect('brand', 'Vans')}, style: updateStyle('brand', 'Vans')},
                {label: 'New Balance', command: () => {handleMenuClick('brand', 'New Balance'); handleFilterSelect('brand', 'New Balance')}, style: updateStyle('brand', 'New Balance')}
            ]
        },
        {
            label: 'Category',
            items: [
                {label: 'Running', command: () => {handleMenuClick('category', 'Running'); handleFilterSelect('category', 'Running')}, style: updateStyle('category', 'Running')},
                {label: 'Casual', command: () => {handleMenuClick('category', 'Casual'); handleFilterSelect('category', 'Casual')}, style: updateStyle('category', 'Casual')},
                {label: 'Training', command: () => {handleMenuClick('category', 'Training'); handleFilterSelect('category', 'Training')}, style: updateStyle('category', 'Training')},
                {label: 'Skateboarding', command: () => {handleMenuClick('category', 'Skateboarding'); handleFilterSelect('category', 'Skateboarding')}, style: updateStyle('category', 'Skateboarding')},
                {label: 'Boots', command: () => {handleMenuClick('category', 'Boots'); handleFilterSelect('category', 'Boots')}, style: updateStyle('category', 'Boots')},
                {label: 'Walking', command: () => {handleMenuClick('category', 'Walking'); handleFilterSelect('category', 'Walking')}, style: updateStyle('category', 'Walking')},
                {label: 'Basketball', command: () => {handleMenuClick('category', 'Basketball'); handleFilterSelect('category', 'Basketball')}, style: updateStyle('category', 'Basketball')},
                {label: 'Luxury', command: () => {handleMenuClick('category', 'Luxury'); handleFilterSelect('category', 'Luxury')}, style: updateStyle('category', 'Luxury')},
                {label: 'Casual Basketball Sneakers', command: () => {handleMenuClick('category', 'Casual Basketball Sneakers'); handleFilterSelect('category', 'Casual Basketball Sneakers')}, style: updateStyle('category', 'Casual Basketball Sneakers')},
                {label: 'Casual Running Sneakers', command: () => {handleMenuClick('category', 'Casual Running Sneakers'); handleFilterSelect('category', 'Casual Running Sneakers')}, style: updateStyle('category', 'Casual Running Sneakers')}
            ]
        },
        {
            label: 'Colour',
            items: [
                {label: 'Black', command: () => {handleMenuClick('colour', 'Black'); handleFilterSelect('colour', 'Black')}, style: updateStyle('colour', 'Black')},
                {label: 'White', command: () => {handleMenuClick('colour', 'White'); handleFilterSelect('colour', 'White')}, style: updateStyle('colour', 'White')},
                {label: 'Green', command: () => {handleMenuClick('colour', 'Green'); handleFilterSelect('colour', 'Green')}, style: updateStyle('colour', 'Green')},
                {label: 'Red', command: () => {handleMenuClick('colour', 'Red'); handleFilterSelect('colour', 'Red')}, style: updateStyle('colour', 'Red')},
                {label: 'Blue', command: () => {handleMenuClick('colour', 'Blue'); handleFilterSelect('colour', 'Blue')}, style: updateStyle('colour', 'Blue')},
                {label: 'Silver', command: () => {handleMenuClick('colour', 'Silver'); handleFilterSelect('colour', 'Silver')}, style: updateStyle('colour', 'Silver')},
                {label: 'Brown', command: () => {handleMenuClick('colour', 'Brown'); handleFilterSelect('colour', 'Brown')}, style: updateStyle('colour', 'Brown')},
                {label: 'Grey', command: () => {handleMenuClick('colour', 'Grey'); handleFilterSelect('colour', 'Grey')}, style: updateStyle('colour', 'Grey')},
                {label: 'Pink', command: () => {handleMenuClick('colour', 'Pink'); handleFilterSelect('colour', 'Pink')}, style: updateStyle('colour', 'Pink')}
            ]
        },
        {
            label: 'Gender',
            items: [
                {label: 'Men\'s', command: () => {handleMenuClick('gender', 'Men\'s'); handleFilterSelect('gender', 'Men\'s')}, style: updateStyle('gender', 'Men\'s')},
                {label: 'Women\'s', command: () => {handleMenuClick('gender', 'Women\'s'); handleFilterSelect('gender', 'Women\'s')}, style: updateStyle('gender', 'Women\'s')}
            ]
        }
    ];

    return (
        <div className='sidebar'>
            <h4>Refine your Search</h4>
            <PanelMenu model={menuItems} style={{width: '100%'}} />
        </div>
    );

};

export default Sidebar1;