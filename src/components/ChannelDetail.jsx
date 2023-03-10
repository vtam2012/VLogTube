import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { ChannelCard, Videos } from './';


const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const fetchResults = async () => {
      const data = await  fetchFromAPI(`channels?part='snippet&id=${id}`)
  
      setChannelDetail(data?.items[0]);

      const videoData = await fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)

      setVideos(videoData?.items);
    }

    fetchResults();
  }, [id]);

  return (
    <Box minHeight='95vh'>
      <Box>
        <div 
          style= {{
            background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
            zIndex: 10,
            height: '300px'
          }}
        />
          <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>
      <Box display='flex' p='2'>
        <Box sx={{ mr: { sm: '100px' }}}/>
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail;