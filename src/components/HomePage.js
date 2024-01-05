import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { USERS_API } from '../config/api';
import { Container, makeStyles } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
//styling
const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "bold",
    marginTop: theme.spacing(4), // Use theme.spacing for consistent spacing
    fontSize: 40,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
      marginTop: theme.spacing(2),
    },
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  
}));

const HomePage = () => {
    //usestate hook
  const [totalPages, setTotalPages] = useState(1);
  const classes = useStyles();
  const [users, setUsers] = useState([]);
//useeffect hook
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(USERS_API);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    // rendring user name  with post count
    <div>
      <Container className={classes.container}>
        <span className={classes.header}>Directory</span>
        {users.slice((totalPages - 1) * 3, (totalPages - 1) * 3 + 3).map(user => (
          <div key={user.id} className="user-container">
            <UserCard user={user} />
          </div>
        ))}
        <div className={classes.paginationContainer}>

            {/* using pagination */}
          <Pagination
            count={Math.ceil(users.length / 3)}
            page={totalPages}
            onChange={(_, value) => {
              setTotalPages(value);
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
