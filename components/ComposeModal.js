import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button, Fade, Modal, Backdrop } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const ComposeModal = (props) => {
  const classes = useStyles();
  return (
    <Modal
      open={true}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={true}>
        <div className="modal">
          <div className="modal-header">
            <h1>Submit a post</h1>
            <Button endIcon={<CloseIcon />} role="button" onClick={props.handleShowModal}></Button>
          </div>
          {props.body}
        </div>
      </Fade>
    </Modal>
  );
};

ComposeModal.propTypes = {
  handleShowModal: PropTypes.func,
  body: PropTypes.object
};

export default ComposeModal;