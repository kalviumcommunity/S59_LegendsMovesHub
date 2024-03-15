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
import { IconButton, Modal, TextField, Button, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';


const Cricket = () => {
  const [cricketData, setCricketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({ _id: '', title: '', description: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [userNames, setUserNames] = useState([]); 
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetchUserNames();
    fetchCricketData();
  }, [selectedUser]);

  const fetchUserNames = async () => {
    try {
      const response = await fetch('https://s59-legendsmoveshub.onrender.com/api/data/cricket');
      const data = await response.json();
      const names = [...new Set(data.map(item => item.name))]; 
      setUserNames(names);
    } catch (error) {
      console.error('Error fetching user names:', error);
    }
  };
  
const fetchCricketData = async () => {
  try {
    let url = 'https://s59-legendsmoveshub.onrender.com/api/data/cricket';
    if (selectedUser) {
      url += `?name=${selectedUser}`; 
    }
    console.log("Fetch URL:", url); 
    const response = await fetch(url);
    const data = await response.json();

    const filteredData = selectedUser ? data.filter(item => item.name && item.name.toLowerCase() === selectedUser.toLowerCase()) : data;

    console.log("Filtered Data:", filteredData); 
    setCricketData(filteredData);
  } catch (error) {
    console.error('Error fetching cricket data:', error);
  } finally {
    setLoading(false);
  }
};

  const handleDeleteClick = async (itemId) => {
    try {
      await fetch(`https://s59-legendsmoveshub.onrender.com/api/data/cricket/delete/${itemId}`, {
        method: 'DELETE',
      });
      setCricketData(prevData => prevData.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditClick = (itemId) => {
    const selectedItem = cricketData.find(item => item._id === itemId);
    setEditedItem(selectedItem);
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    try {
      await fetch(`https://s59-legendsmoveshub.onrender.com/api/data/cricket/update/${editedItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedItem.title,
          description: editedItem.description,
        }),
      });

      setCricketData(prevData =>
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

  const handleFilterButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (userName) => {
    console.log("Selected User:", userName); 
    setSelectedUser(userName);
    setAnchorEl(null);
  };
  

  const renderSegment = (segmentData, title) => {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'Playfair Display', color: '#333333' }}>
          {title}
          <IconButton onClick={handleFilterButtonClick} color="primary">
             <FilterListIcon  fontSize="large"/>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {userNames.map((userName, index) => (
              <MenuItem key={index} onClick={() => handleMenuItemClick(userName)}>{userName}</MenuItem>
            ))}
          </Menu>
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
        selectedUser ? renderSegment(cricketData, `Iconic Shots and Celebrations by ${selectedUser}`) : renderSegment(cricketData, 'Iconic Shots and Celebrations')
      )}
    </Container>
  );
};

export default Cricket;
