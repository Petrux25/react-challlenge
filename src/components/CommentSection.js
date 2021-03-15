import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useStore } from '../stores/Store'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const CommentSection = ({ postId }) => {
  const [store, dispatch] = useStore();
  const classes = useStyles();
  const [comments, setComments] = useState([])

  useEffect(() => {
    setComments(store.comments.filter(comment => comment.postId === postId))
  }, [store.comments] )


  return (
    <List className={classes.root}>
      {comments?.map((comment, index) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>
                {comment.name.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
              </Typography>
                  {comment.body}
                </React.Fragment>
              }
            />
          </ListItem>
          {
            index < comments?.length - 1 &&
            <Divider variant="inset" component="li" />
          }
        </>

      ))}
    </List>
  );
}

export default CommentSection;