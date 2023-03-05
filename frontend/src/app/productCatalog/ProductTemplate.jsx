/*
*
    This component contains the template of a product card. 
    This template is updated based on the product data provided to it.
*
*/

import React from "react";
import '../../App.css';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Chip, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";


export default function ProductTemplate(props) {
    const { data, setRefresh } = props;
    const navigate = useNavigate();

    const handleEdit = () => {
        // Triggered when the user clicks on the EDIT button of a product card.
        // Clicking on edit button will take the user to the PRODUCT DETAILS page.

        navigate("/product/edit", { state: data });
    }

    const handleDelete = id => {
        // Triggered when the user clicks on the button DELETE of a product card.
        // Clicking on delete button will remove the product from the product catalog.

        // DELETE api call
        fetch(`http://127.0.0.1:8000/product/${id}`, {
            method: 'DELETE',
            mode: 'cors',
        })
            .then(() => {
                // changes the refresh state value, which triggers the useEffect of the parent component (ProductList.jsx) to update the product list.
                setRefresh(prev => !prev);
            })
            .catch(err => console.error('Error: couldn\'t DELETE the data', err));
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={data.picture}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.description}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {`${data.price} €`}
                </Typography>
                <div id='tags'>
                    {(data.tags && data.tags.length > 0) && (
                        data.tags.map((tag, index) => {
                            return <Chip key={index} label={tag} variant="contained" />;
                        })
                    )}
                </div>
            </CardContent>
            <CardActions>
                <div>
                    <Button className="actionButton" size="small" variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>{"EDIT"}</Button>
                    <Button className="actionButton" id='delete' size="small" variant="contained" color='primary' startIcon={<DeleteIcon />} onClick={() => handleDelete(data.id)}>{"DELETE"}</Button>
                </div>
                <Tooltip title={<Typography className="tooltip">{data.active ? 'Active' : 'Inactive'}</Typography>} arrow placement='top'>
                    <div id='dot' style={data.active ? { backgroundColor: '#57AD68' } : { backgroundColor: '#FF0000' }}></div>
                </Tooltip>
            </CardActions>
        </Card>
    );
}