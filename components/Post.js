import React, { useState, useEffect } from 'react';
import { UploadPhoto } from './UploadPhoto';
import { TextField, Button, TextareaAutosize, makeStyles, Grid, Input } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';


const cardStyles = makeStyles((theme) => ({
  post: {
    backgroundColor: '#c4302b',
    margin: '0 auto'
  },
  media: {
    backgroundColor: '#00ACEE',
  },
}));

const Post = function ({ setShowModal }) {
  const classes = cardStyles();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postDetails, setPostDetails] = useState({
    username: cookie.get('user'),
    description: '',
    url: '',
  });

  const handleOnChange = (e) => {
    setPostDetails(prevDetails => { return {...prevDetails, description: e.target.value }; });
  };

  const validatePost = async () => {
    setIsSubmitting(true);

    if (!postDetails.description || !postDetails.url) {
      setErrorMsg('Description and photo are required. Please try again.');
      setIsSubmitting(false);
    } else {
      submitPost();
    }
  };

  const submitPost = async () => {
    const config = {
      method: 'post',
      url: '/api/upload',
      data: postDetails,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      await axios(config);
      await setSuccessMsg('Your post has been successfully submitted!');
      setTimeout(function () {
        setShowModal(false);
      }, 2000);
    } catch (err) {
      setErrorMsg('Something went wrong with the submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Grid item container direction="column" lg={12} spacing={4} >
        <div className="post-container">
          <section suppressHydrationWarning={true}>
            {process.browser && <UploadPhoto setPostDetails={setPostDetails}/>}
          </section>
          <section>
            {errorMsg && <p data-testid="errorMsg" className="error">{errorMsg}</p>}
          </section>
          <section>
            <TextField
              inputProps={{ 'data-testid': 'description' }}
              style={{padding: '10px'}}
              id="outlined-helperText"
              name="description"
              label="Description"
              value={postDetails.description}
              variant="outlined"
              multiline={true}
              rows={2}
              maxLength={100}
              fullWidth={true}
              onChange={handleOnChange}/>
          </section>
        </div>
        <div>
          <section>
            <Grid item container lg={12} justifyContent="center">
              <Button
                className={classes.post}
                variant="contained"
                color="primary"
                onClick={validatePost}
                disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit now'}
              </Button>
              {successMsg && <p data-testid="successMsg" className="success">{successMsg}</p>}
            </Grid>
          </section>
        </div>
      </Grid>
    </div>
  );
};

Post.propTypes = {
  setShowModal: PropTypes.func,
};

export default Post;