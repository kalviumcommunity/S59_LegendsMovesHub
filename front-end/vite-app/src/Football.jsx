import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Modal, TextField, Button } from '@mui/material';

const Football = () => {
  const [goalsData, setGoalsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({ _id: '', title: '', description: '' });

  useEffect(() => {
    fetch('http://localhost:8080/api/data/football')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setGoalsData(res);
      })
      .catch(err => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteClick = async (itemId) => {
    try {
      await fetch(`http://localhost:8080/api/data/football/delete/${itemId}`, {
        method: 'DELETE',
      });
      setGoalsData(prevData => prevData.filter(item => item._id !== itemId));

      console.log('Item deleted successfully:', itemId);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditClick = (itemId) => {
    const selectedItem = goalsData.find(item => item._id === itemId);
    setEditedItem(selectedItem);
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    try {
      await fetch(`http://localhost:8080/api/data/football/update/${editedItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedItem.title,
          description: editedItem.description,
        }),
      });

      setGoalsData(prevData =>
        prevData.map(item =>
          item._id === editedItem._id
            ? { ...item, title: editedItem.title, description: editedItem.description }
            : item
        )
      );

      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  const renderSegment = (segmentData, title) => {
    console.log(segmentData);
    console.log(`${title} Length:`, segmentData.length);

    return (
      <div style={{ marginBottom: '2rem' }}>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'Playfair Display', color: '#333333' }}>
          {title}
        </Typography>
        <Grid container spacing={3}>
          {segmentData.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h6" style={{ fontFamily: 'Poppins', color: '#3498db' }}>
                    {item.title}
                  </Typography>
                  <Typography style={{ fontFamily: 'Montserrat', color: '#333333' }}>
                    {item.description}
                  </Typography>
                  <IconButton color="primary" onClick={() => handleEditClick(item._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Modal
          open={editModalOpen}
          onClose={handleEditModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '1rem' }}>
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>Edit Item</Typography>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              value={editedItem.title}
              onChange={handleEditInputChange}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              name="description"
              value={editedItem.description}
              onChange={handleEditInputChange}
            />
            <Button variant="contained" color="primary" onClick={handleEditSave}>Save</Button>
          </div>
        </Modal>
      </div>
    );
  };

  return (
    <Container style={{ paddingTop: '2rem', textAlign: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <CircularProgress size={80} style={{ color: '#3498db' }} />
      ) : (
        renderSegment(goalsData, 'Iconic Goals')
      )}
    </Container>
  );
};

export default Football;
