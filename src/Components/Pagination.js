import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/lab";
import { Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { getCinemas } from '../actions/cinemas';

const Paginate = ({ page }) => {
  const classes = useStyles();

  const { numberOfPages } = useSelector((state) => state.cinemas);
  const dispatch = useDispatch();    
  
  useEffect(() => { if(page) dispatch(getCinemas(page)); }, [dispatch, page]);
  
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <Link href={`/cinemas?page=${item.page}`}><PaginationItem {...item} /></Link>
      )}
    />
  );
};
  
  export default Paginate;