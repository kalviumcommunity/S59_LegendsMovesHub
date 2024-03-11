import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const Football = () => {
    const [goalsData, setGoalsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // https://s59-legendsmoveshub.onrender.com/api/data/football

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
