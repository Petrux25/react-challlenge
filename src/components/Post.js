import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentSection from './CommentSection';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { useStore } from '../stores/Store'




const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  card: {
    maxWidth: 400,
    margin: 'auto'
  },
  newComment: {
    padding: theme.spacing(5, 5, 5, 5)
  }
}));

const Post = ({title, body, id, ...props}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [store, dispatch] = useStore();


  const [newComment, setNewComment] = useState({
    name: "You",
    body: "",
    postId: id
  })

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (e) => {
    setNewComment({
      ...newComment, body: e.target.value
    })
  }

  const postComment = () => {
    dispatch({type: 'post-comment', newComment})
    setNewComment({
      ...newComment, body: ""
    })
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={title}
      />
      <CardMedia
        className={classes.media}
        image="https://picsum.photos/480/270?random=1"
        
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton >
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container>
            </Grid>
            <Grid item xs={12}>
              <CommentSection postId={id}></CommentSection>
            </Grid>
           
        </CardContent>
      </Collapse>
      <Grid item xs={12} container  justify="flex-start" className={classes.newComment}>
        <TextField  value={newComment.body} onChange={handleInputChange}/>
        <Button onClick={() => postComment()}>
          Comment
        </Button>
      </Grid>
    </Card>
  );
}

export default Post;