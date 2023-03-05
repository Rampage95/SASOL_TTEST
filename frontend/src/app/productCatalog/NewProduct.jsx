/*
*
    This component contains PRODUCT CREATION page, where the user can add a new product to the product catalog.
*
*/

import React, { useState } from "react";
import '../../App.css';
import { TextField, Button, IconButton, Chip, Switch, Typography, Avatar } from '@mui/material';
import ConfirmIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import BackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import NoImage from "../assets/no_image.jpg";

export default function NewProduct() {
    const [newData, setNewData] = useState({
        name: '',
        price: '',
        description: '',
        tags: [],
        active: false,
        picture: '',
    });
    const [error, setError] = useState({
        name: { status: false, message: '' },
        price: { status: false, message: '' },
        description: { status: false, message: '' },
    });
    const [newTag, setNewTag] = useState('');
    const navigate = useNavigate();

    const isEmpty = (str) => str.trim() === '';

    const isFloat = (str) => /^\d+(?:\.\d+)?$/.test(str);

    const handleError = (field, value) => {
        // handleError() manages the error status and message for the mandatory product field (Name, Price and Description).
        // Briefly, this function will run validation tests on the provided field and update its error status based on the results of those tests.

        switch (field) {
            case 'name': {
                const not_valid = isEmpty(value);
                if (not_valid) {
                    setError(prev => {
                        return ({
                            ...prev,
                            name: { status: true, message: 'required field' },
                        });
                    });
                } else {
                    setError(prev => {
                        return ({
                            ...prev,
                            name: { status: false, message: '' },
                        });
                    });
                }
                break;
            }
            case 'price': {
                const test_1 = isEmpty(value);
                const test_2 = !isFloat(value);
                const not_valid = test_1 || test_2;
                if (not_valid) {
                    setError(prev => {
                        return ({
                            ...prev,
                            price: { status: true, message: test_1 ? 'required field' : test_2 ? 'price should be a number (ex: 120, 120.99)' : 'test failed' },
                        });
                    });
                } else {
                    setError(prev => {
                        return ({
                            ...prev,
                            price: { status: false, message: '' },
                        });
                    });
                }
                break;
            }
            case 'description': {
                const not_valid = isEmpty(value);
                if (not_valid) {
                    setError(prev => {
                        return ({
                            ...prev,
                            description: { status: true, message: 'required field' },
                        });
                    });
                } else {
                    setError(prev => {
                        return ({
                            ...prev,
                            description: { status: false, message: '' },
                        });
                    });
                }
                break;
            }
            default: throw new Error('Unknown field provided to handleError function.');
        }
    }

    const handleChange = e => {
        // Triggered when the user change one of the product properties (name, price....)

        setNewData(prev => {
            return ({
                ...prev,
                [e.target.name]: e.target.value,
            });
        });
        handleError(e.target.name, e.target.value);
    }

    const handleNewTag = e => {
        // Triggered when the user writes a tag name in the New Tag input field
        setNewTag(e.target.value);
    }

    const handleTagAdd = () => {
        // Triggered when the user adds a tag to the product (+ icon near the New Tag input field)

        let auxTagsArray = newData.tags;
        auxTagsArray.push(newTag);
        setNewData(prev => {
            return ({
                ...prev,
                tags: auxTagsArray,
            });
        });
        setNewTag('');
    }

    const handleTagDelete = index => {
        // Triggered when the user removes a tag from the product

        let auxTagsArray = newData.tags;
        auxTagsArray.splice(index, 1);
        setNewData(prev => {
            return ({
                ...prev,
                tags: auxTagsArray,
            });
        });
    }

    const handleSwitch = e => {
        // Triggered when the product status (active/inactive) switch is manipulated.

        setNewData(prev => {
            return ({
                ...prev,
                active: e.target.checked,
            });
        });
    }

    const handleClear = () => {
        // Triggered when CLEAR button is clicked.
        // clear will empty all the input fields and reset the error state.

        setNewData({
            name: '',
            price: '',
            description: '',
            tags: [],
            active: false,
            picture: '',
        });
        setNewTag('');
        setError({
            name: { status: false, message: '' },
            price: { status: false, message: '' },
            description: { status: false, message: '' },
        });
    }

    // Asynchronous function thats convert files to base64
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleUpload = event => {
        // Triggered when the user upload a photo. 
        // The photo will be converted and stored as base64 string. 

        toBase64(event.target.files[0])
            .then(result => {
                setNewData(prev => {
                    return ({
                        ...prev,
                        picture: result,
                    });
                });
            });
    }

    const handleConfirm = () => {
        // POST API call: sending the new product data to the server

        const body = {
            name: newData.name,
            price: newData.price,
            picture: newData.picture,
            description: newData.description,
            active: newData.active,
            tags: newData.tags.toString(),
        }
        console.log('body:', body);
        fetch('http://127.0.0.1:8000/product', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body),
        })
            .then(() => navigate("/"))
            .catch(err => console.error('Error: Couldn\'t POST the data', err));
    }

    const handleBack = () => {
        // Navigate back to Product Catalog page

        navigate("/");
    }

    const confirm_button_enabled_status = () => {
        // This fuction determines wether the confirm button should be enabled or disabled.
        /*
            The confirm button is enabled only when we have valid values 
            in the mandatory fields (Name, price and description)
        */

        return (
            newData.name && newData.price && newData.description &&
            !error.name.status && !error.price.status && !error.description.status
        );
    }

    return (
        <React.Fragment>
            <div className='title'>
                <h1>
                    {`PRODUCT CREATION`}
                </h1>
            </div>
            <div className='toolbar' style={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" startIcon={<BackIcon />} onClick={handleBack}>
                    {"BACK"}
                </Button>
                <Button variant="contained" startIcon={<ClearIcon />} onClick={handleClear}>
                    {"CLEAR"}
                </Button>
                <Button variant="contained" startIcon={<ConfirmIcon />} onClick={handleConfirm} disabled={!confirm_button_enabled_status()}>
                    {"CONFIRM"}
                </Button>
            </div>
            <div className='edit-content'>
                <div className="grid-item-0">
                    <input
                        id="upload"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={handleUpload}
                    />
                    <IconButton>
                        <label htmlFor="upload">
                            <Avatar id='product-img' alt="product" src={newData.picture ? newData.picture : NoImage} />
                        </label>
                    </IconButton>
                </div>
                <TextField error={error.name.status} helperText={error.name.message} className="grid-item-1" name="name" label="Name *" variant="outlined" size='small' value={newData.name} onChange={handleChange} />
                <TextField error={error.price.status} helperText={error.price.message} className="grid-item-2" name="price" label="Price *" variant="outlined" size='small' value={newData.price} onChange={handleChange} />
                <TextField error={error.description.status} helperText={error.description.message} className="grid-item-3" name="description" label="Description *" multiline rows={4} variant="outlined" size='small' value={newData.description} onChange={handleChange} />
                <div className="grid-item-4">
                    <div>
                        <TextField label="New Tag" size='small' value={newTag} onChange={handleNewTag} />
                        <IconButton id='add-button' onClick={handleTagAdd} disabled={!newTag}>
                            <AddIcon style={!newTag ? { backgroundColor: 'gray' } : { backgroundColor: '#1976d2' }} id='add-icon' />
                        </IconButton>
                    </div>
                    <div>
                        {
                            (newData && newData.tags) && (
                                newData.tags.map((tag, index) => <Chip key={index} label={tag} color='primary' onDelete={() => handleTagDelete(index)} />)
                            )
                        }
                    </div>
                </div>
                <div className='grid-item-5'>
                    <Typography variant="body1">
                        {"Activate Product"}
                    </Typography>
                    <Switch checked={newData.active} onChange={handleSwitch} />
                </div>
            </div>
        </React.Fragment >
    );
}