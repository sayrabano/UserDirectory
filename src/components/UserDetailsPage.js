// required imports...........
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./Header";

//styling.....
const useStyles = makeStyles(() => ({
  card: {
    paddingTop: 10,
    padding: 15,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userDetails: {
    textAlign: "left",
    marginTop: 10,
  },
  leftContent: {
    textAlign: "left",
  },
  rightContent: {
    textAlign: "right",
  },

  address: {
    marginBottom: 5,
  },

  postContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  post: {
    marginBottom: 20,
    width: "30%",
    minWidth: "300px",
  },
  postDiv: {
    padding: "50px 50px 0px 50px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "bold",
    marginTop: 40,
    fontSize: 40,
  },
  userCard: {
    padding: "10px 10px 5px 10px",
  },
}));

//UserDetailsComponent........

const UserDetailsPage = () => {
  //using state hook
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const params = useParams();
  //react hook useEffect

  useEffect(() => {
    //fetchinguserdata
    const fetchUserDetails = async () => {
      try {
        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${params.userId}`
        );
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    //fetchingPostdata;
    const fetchUserPosts = async () => {
      try {
        const postsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${params.userId}`
        );
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserDetails();
    fetchUserPosts();
  }, [params.userId]);
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePopup = () => {
    
    setSelectedPost(null);
  };

  //checking is user fetch or not showing loader
  if (!user) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    //maincard div
    <div className={classes.card}>
      {/* header to show dropdown & time */}
      <Header />
      <h2 className={classes.header}>Profile Page</h2>
      {/* usercard div */}
      <div className={classes.userCard}>
        <Card mx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent
              className={`${classes.cardContent} ${classes.userDetails}`}
            >
              <div className={classes.leftContent}>
                <Typography
                  variant="h5"
                  component="div"
                  className={classes.name}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  className={classes.username}
                >
                  {user.username} <span>|</span> {user.company.catchPhrase}
                </Typography>
              </div>
              <div className={classes.rightContent}>
                <Typography
                  variant="body2"
                  component="div"
                  className={classes.address}
                >
                  {user.address.street}, {user.address.suite},{" "}
                  {user.address.city}, {user.address.zipcode}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  className={classes.email}
                >
                  {user.email} <span> | </span> {user.phone}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>

      {/* post card div */}
      <div className={classes.postDiv}>
        <div className={classes.postContainer}>
          {posts.map((post) => (
            <Card key={post.id} className={classes.post}>
              <CardActionArea onClick={() => handlePostClick(post)}>
                <h3 style={{ textAlign: "center" }}>{post.title}</h3>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.body.slice(0, 70)}
                    <span>...</span>{" "}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>

      {selectedPost && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleClosePopup}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "10px",
              maxWidth: "400px",
              width: "50%",
            }}
          >
            <p>{selectedPost.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
