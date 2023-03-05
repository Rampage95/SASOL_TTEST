/*
*
    This component contains the product catalog (product list). 
    A search input field is provided in it to filter the product list.
*
*/

import React, { useEffect, useState } from "react";
import '../../App.css';
// import { raw_data } from '../static_data.js';
import ProductTemplate from './ProductTemplate';
import { TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import Empty from "../assets/empty.png";

export default function ProductList() {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [dataImage, setDataImage] = useState();
    const [refresh, setRefresh] = useState(false);

    // useEffect(() => {
    //     // fill the data states with static data (This helps in the static website creation phase). 
    //
    //     setData(raw_data);
    //     setDataImage(raw_data);
    // }, []);

    useEffect(() => {
        // GET api call: get the prduct list from the server.
        /* 
            The received data are stored in 2 states (data and dataImage).
                --> data: serves as a backup copy that contains the full product list
                --> dataImage: contains the filtered product list (i.e the search operation performed by the user)
        */

        fetch('http://127.0.0.1:8000/product')
            .then((response) => response.json())
            .then((data) => {
                const aux_data = data.map(value => {
                    return ({
                        ...value,
                        tags: value.tags ? value.tags.split(',') : [],
                    })
                });
                setData(aux_data);
                setDataImage(aux_data);
            })
            .catch((err) => {
                console.log('Error: couldn\'t GET data.', err.message);
            });
    }, [refresh]);

    const getStatus = bool => bool ? 'active' : 'inactive';

    const handleSearch = (e) => {
        // Triggered when the user search for specific products (through the search bar)

        const keyword = e.target.value;
        const filteredData = data.filter(value => {
            return (
                value.name.toLowerCase().includes(keyword.toLowerCase()) ||
                value.price.toString().toLowerCase().includes(keyword.toLowerCase()) ||
                value.description.toLowerCase().includes(keyword.toLowerCase()) ||
                (value.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))) ||
                getStatus(value.active).includes(keyword.toLowerCase())

            )
        });
        setDataImage(filteredData);
    }

    const handleNewProduct = () => {
        // Triggered when the NEW PRODUCT button is clicked. 
        // This will take the user to the PRODUCT CREATION page.

        navigate("/product/new", {});
    }

    return (
        <React.Fragment>
            <div className='title'>
                <h1>
                    {'PRODUCTS CATALOG'}
                </h1>
            </div>
            <div className='toolbar'>
                <TextField
                    id="search_bar"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    onChange={handleSearch}
                />
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleNewProduct}>
                    {"NEW PRODUCT"}
                </Button>
            </div>
            <div className='content'>
                {(dataImage && dataImage.length > 0) ? (
                    dataImage.map(product => {
                        return (
                            <ProductTemplate key={product.id} data={product} setRefresh={setRefresh} />
                        )
                    })
                ) : (
                    <div className="empty-list">
                        <img src={Empty} alt="empty product list" />
                        <p>No product found!</p>
                    </div>
                )}
            </div>
        </React.Fragment >
    );
}