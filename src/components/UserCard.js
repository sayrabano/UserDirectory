
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { makeStyles } from "@material-ui/styles";
import Grid from '@mui/material/Grid';

//styling
const useStyles = makeStyles(() => ({
  card: {
    paddingTop:10,

  },
  cardContent: {
    
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    justifyContent:'space-between',
    backgroundColor:"#ccebe2" 
  },
  name: {
    textAlign: 'right',
  },
  postCount: {
    textAlign: 'left',
  },
}));


  const UserCard = ({ user }) => {
    //using state hooks
  const classes = useStyles();
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    // Fetching the number of posts for particular the user
    const fetchPostCount = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
        const posts = await response.json();
        setPostCount(posts.length);
      } catch (error) {
        console.error('Error fetching post count:', error);
      }
    };

    fetchPostCount();
  }, [user.id]);

  return (
    // showing user and post count
    <Grid item xs={12} sm={6} md={4} lg={3}>

    <div className={classes.card}>
    <Link to={`/userDetails/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card mx={{ maxWidth: 245 }}>
        <CardActionArea>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom  component="div" className={classes.name} style={{fontSize:16}}>
              Name: {user.username}
            </Typography>
            <Typography gutterBottom  component="div" className={classes.postCount} style={{fontSize:16}}>
              Posts: {postCount}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  </div>
  </Grid>
  );
};

export default UserCard;
