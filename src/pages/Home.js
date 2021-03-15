import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Post from '../components/Post'
import { makeStyles } from '@material-ui/core/styles';
import {useStore} from '../stores/Store'


const useStyles = makeStyles((theme) => ({
  post: {
    margin: theme.spacing(5, 0, 5, 0)
  },
}))

const Home = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [store, dispatch] = useStore();


  useEffect(async () => {
    setPosts((await axios.get('https://jsonplaceholder.typicode.com/posts')).data);
    setComments((await axios.get('https://jsonplaceholder.typicode.com/comments')).data);
  }, [])

  useEffect(() => {
    dispatch({type: 'set-comments', comments})
  }, [comments])

  return (
    <>
      <Container>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          {posts.map((post) => (
            <Grid item xs={12} className={classes.post}>
              <Post title={post.title} body={post.body} id={post.id} />
            </Grid>

          ))}
        </Grid>

      </Container>
    </>
  );
}

export default Home;