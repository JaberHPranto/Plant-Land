import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles({
  root: {
        minWidth: 200,
        height:'250px',
        borderTop:'5px solid #81fbb8',
        margin:'auto'
  },
  title: {
      fontSize: '1.7rem',
      fontFamily:'Asap',
      textAlign:'center'
  },
  text: {
      textAlign: 'center',
      fontFamily: 'Lato',
      fontSize:'1.1rem'
  },
  image: {
    height: '75px',
    marginLeft:'70%'
  }
});

function FeatureCard({ title, text,image }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" component="p" color="textSecondary" className={classes.text}>
          {text}
        </Typography>
      </CardContent>
      <img src={image} alt='card_img' className={classes.image }/>
    </Card>
  );
}

export default FeatureCard