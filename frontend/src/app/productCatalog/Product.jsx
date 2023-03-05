/*
*
    This component contains PRODUCT DETAILS page, where the user can edit a selected product properties.
*
*/

import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import '../../App.css';
import { TextField, Button, IconButton, Chip, Switch, Typography, Avatar } from '@mui/material';
import ConfirmIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import BackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import NoImage from "../assets/no_image.jpg";

export default function Product() {
    const location = useLocation();
    const data = location.state;
    const [editedData, setEditedData] = useState({
        name: '',
        price: '',
        description: '',
        tags: [],
        active: false,
        picture: ''
    });
    const [newTag, setNewTag] = useState('');
    const [error, setError] = useState({
        name: { status: false, message: '' },
        price: { status: false, message: '' },
        description: { status: false, message: '' },
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Making a deep copy from the product data received.
        // The copy made (named ediedData) will serve as a container of the user modifications on the product properties (name, price...).

        if (data) {
            const clone = {};
            for (let i in data) {
                clone[i] = data[i] ?? '';
            }
            setEditedData(clone);
        }
    }, [data]);

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

        setEditedData(prev => {
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

        let auxTagsArray = editedData.tags;
        auxTagsArray.push(newTag);
        setEditedData(prev => {
            return ({
                ...prev,
                tags: auxTagsArray,
            });
        });
        setNewTag('');
    }

    const handleTagDelete = index => {
        // Triggered when the user removes a tag from the product

        let auxTagsArray = editedData.tags;
        auxTagsArray.splice(index, 1);
        setEditedData(prev => {
            return ({
                ...prev,
                tags: auxTagsArray,
            });
        });
    }

    const handleSwitch = e => {
        // Triggered when the product status (active/inactive) switch is manipulated.

        setEditedData(prev => {
            return ({
                ...prev,
                active: e.target.checked,
            });
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
        // Triggered when the user uploads a photo. 
        // The photo will be converted and stored as base64 string.

        toBase64(event.target.files[0])
            .then(result => {
                console.log(result)
                setEditedData(prev => {
                    return ({
                        ...prev,
                        picture: result,
                    });
                })
            });
    }

    const handleClear = () => {
        // Triggered when CLEAR button is clicked.
        // clear will empty all the input fields and reset the error state.

        setEditedData({
            name: '',
            price: '',
            description: '',
            tags: [],
            active: false,
            picture: '',
        });
        setNewTag('');
    }

    const handleConfirm = () => {
        // PUT api call: sending the edited product data to be added to the DB

        const body = {
            id: editedData.id,
            name: editedData.name,
            price: editedData.price,
            picture: editedData.picture,
            description: editedData.description,
            active: editedData.active,
            tags: editedData.tags.toString(),
        }
        fetch(`http://127.0.0.1:8000/product`, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(body),
        })
            .then(() => navigate("/", {}))
            .catch(err => console.error('Error: Couldn\'t PUT the data', err));
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
            editedData.name && editedData.price && editedData.description &&
            !error.name.status && !error.price.status && !error.description.status
        );
    }

    return (
        <React.Fragment>
            <div className='title'>
                <h1>
                    {`PRODUCT DETAILS`}
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
                            <Avatar id='product-img' alt="product" src={editedData.picture ? editedData.picture : NoImage} />
                        </label>
                    </IconButton>
                </div>
                <TextField error={error.name.status} helperText={error.name.message} className="grid-item-1" name="name" label="Name" variant="outlined" size='small' value={editedData.name} onChange={handleChange} />
                <TextField error={error.price.status} helperText={error.price.message} className="grid-item-2" name="price" label="Price" variant="outlined" size='small' value={editedData.price} onChange={handleChange} />
                <TextField error={error.description.status} helperText={error.description.message} className="grid-item-3" name="description" label="Description" multiline rows={4} variant="outlined" size='small' value={editedData.description} onChange={handleChange} />
                <div className="grid-item-4">
                    <div>
                        <TextField label="New Tag" size='small' value={newTag} onChange={handleNewTag} />
                        <IconButton id='add-button' onClick={handleTagAdd} disabled={!newTag}>
                            <AddIcon style={!newTag ? { backgroundColor: 'gray' } : { backgroundColor: '#1976d2' }} id='add-icon' />
                        </IconButton>
                    </div>
                    <div>
                        {
                            (editedData && editedData.tags) && (
                                editedData.tags.map((tag, index) => <Chip key={index} label={tag} color='primary' onDelete={() => handleTagDelete(index)} />)
                            )
                        }
                    </div>
                </div>
                <div className='grid-item-5'>
                    <Typography variant="body1">
                        {"Activate Product"}
                    </Typography>
                    <Switch checked={editedData.active} onChange={handleSwitch} />
                </div>
            </div>
        </React.Fragment >
    );
}