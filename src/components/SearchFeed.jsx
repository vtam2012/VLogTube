import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Videos } from './';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm }  = useParams();
  
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
  }, [searchTerm]);

  return (
    <Box p={2} minHeight='95vh'>
        <Typography
          variant='h4'
          fontWeight={900}
          mb={3}
          color= 'white'
          ml={{ sm: "100px"}}
        >
          Search Results for: <span style={{ color: '#F31503'}}>
            {searchTerm}
          </span> Videos
        </Typography>
        <Box display="flex">
          <Box sx={{ mr: { sm: '100px' } }}/>
            {<Videos videos={videos} />}
        </Box>
    </Box>
  )
}

export default SearchFeed;