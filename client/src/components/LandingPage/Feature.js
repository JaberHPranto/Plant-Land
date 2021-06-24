import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import blog from '../../images/blog.svg';
import diary from '../../images/diary.svg';
import forum from '../../images/online-community.svg';
import search from '../../images/search.svg';
import db from '../../images/server.svg';
import market from '../../images/store.svg';
import FeatureCard from './FeatureCard';


const useStyles = makeStyles({
  container: {
    backgroundColor: '#f7f7f7',
    // margin:'5rem auto'
  },
  gridContainer:{
    padding:'10rem auto'
  },
  text: {
    textAlign: 'center',
    padding: '2rem 0rem'
  }
});

function Feature() {
  const data = [
    {
      title: "Market Place",
      text: "Platform for buying plants, flowers, seeds and other equipments",
      image: market
    },
    {
      title: "Plant Database",
      text:"A database that contains plant related information",
      image: db 
    },
    {
      title: "Plant Identification",
      text:"Identify any plants just by uploading it in the website",
      image: search
    },
    {
      title: "Plant Diary",
      text:"In a personalized gardening notebook, keep track of your plants progress",
      image: diary
    },
    {
      title: "Blog",
      text:"Read blog about plants, nature and environmental issues",
      image: blog
    },
    {
      title: "Community",
      text:"Ask and give answers regarding plant related questions",
      image: forum
    },
  ]

 const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.text}>Features</h1>
    <Container className={classes.gridContainer}>
      <Grid container spacing={5} elevate={3} >
        {data.map(d => (
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard title={d.title} text={d.text} image={d.image}/>
          </Grid>
        ))}  
      </Grid>
      </Container>
    </div>

      )
        
}

export default Feature

