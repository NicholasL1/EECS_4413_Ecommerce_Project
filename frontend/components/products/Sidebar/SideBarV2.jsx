import { PanelMenu } from 'primereact/panelmenu';
import { useState } from 'react';

export default function SideBarV2({addFilter, filters}) {
    
    const brands = ["Nike", "Adidas", "Reebok", "Skechers", "Jordan", "Brooks", "Puma", "Under Armour", "Timberland", "Adidas Originals", "Converse", "Vans", "New Balance"];
    const categories = ["Running", "Casual", "Training", "Skateboarding", "Boots", "Walking", "Basketball", "Luxury", "Casual Basketball Sneakers", "Casual Running Sneakers"];
    const colours = ["Black", "White", "Green", "Red", "Blue", "Silver", "Brown", "Grey", "Pink"];
    const genders = ["Men\'s", "Women\'s"]
    
    const updateStyle = (filterParam, filterValue) => {  
        if (filters[filterParam] === filterValue)
            return {backgroundColor: '#dd2c2c', color: 'white'};        // this doesn't change the font colour to white, no idea why
    };

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

    const menuItems = [
        {
            label: 'Brand',
            items: brands.map(brand => {
                return {label: brand, command: () => {addFilter('brand', brand); handleFilterSelect('brand', brand)}, style: updateStyle('brand', brand)}
            })
        },
        {
            label: 'Category',
            items: categories.map(cat => {
                return {label: cat, command: () => {addFilter('category', cat); handleFilterSelect('category', cat)}, style: updateStyle('category', cat)}
            })
        },
        {
            label: 'Colour',
            items: colours.map(col => {
                return {label: col, command: () => {addFilter('colour', col); handleFilterSelect('colour', col)}, style: updateStyle('colour', col)}
            })
        },
        {
            label: 'Gender',
            items: genders.map(g => {
                return {label: g, command: () => {addFilter('gender', g); handleFilterSelect('gender', g)}, style: updateStyle('gender', g)}
            })
        },
    ]

    return (
        <div id="sidebar" className="align-middle items-center h-fit mb-4 bg-white p-4 rounded-md shadow-md">
            <h4 className="text-xl font-semibold mb-4">Refine your Search</h4>
            <PanelMenu model={menuItems} style={{width: '100%'}} />
        </div>
    )
}
