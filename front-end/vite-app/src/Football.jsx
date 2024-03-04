import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

const Football = () => {
    const [celebrationsData, setCelebrationsData] = useState({ Goals: [], Celebrations: [] });
    const [Goals, setGoals] = useState([])

    useEffect(() => {
        fetch('https://s59-legendsmoveshub.onrender.com/api/data')
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setGoals(res);
        })
        .catch(err => console.warn(err))
    }, []);
    

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
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    };
    

    return (
        <Container style={{ paddingTop: '2rem', textAlign: 'center' }}>
            {renderSegment(Goals, 'Iconic Goals')}
            {/* {renderSegment(celebrationsData.Celebrations, 'Crazy & Iconic Celebrations')} */}
        </Container>
    );
};

export default Football;
