import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
  },
}));

const PaginationOutlined = ( { filterPostsByUserOrPage, count }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
    filterPostsByUserOrPage(undefined, value);
  };



  return (
    <div className={classes.root}>
      <Pagination onChange={handlePageChange} page={page} count={Math.ceil(count / 8)} variant="outlined" color="primary" />
    </div>
  );
};

export default PaginationOutlined;
