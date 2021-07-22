import React, { useState, useEffect } from 'react';
import { UploadPhoto } from './UploadPhoto';
import { TextField, Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';


const cardStyles = makeStyles((theme) => ({
  post: {
    backgroundColor: '#c4302b',
    margin: '0 auto'
  },
  media: {
    backgroundColor: '#00ACEE',
  },
}));

const Post = function () {
  const classes = cardStyles();

  return (
    <div>
      <Grid item container direction="column" lg={12} spacing={4} >
        <div className="post-container">
          <section suppressHydrationWarning={true}>
            {process.browser && <UploadPhoto />}
          </section>
          <section>
            <TextField
              style={{padding: '10px'}}
              id="outlined-helperText"
              name="description"
              label="Description"
              placeholder="Type your description here!"
              variant="outlined"
              multiline={true}
              rows={2}
              maxLength={500}
              fullWidth={true}/>
          </section>
        </div>
        <div>
          <section>
            <Grid item container lg={12} justifyContent="center">
              <Button
                className={classes.post}
                variant="contained"
                color="secondary">
                Send Now
              </Button>
            </Grid>
          </section>
        </div>
      </Grid>
    </div>
  );
};

export default Post;