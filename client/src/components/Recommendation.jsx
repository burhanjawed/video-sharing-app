import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../components';

// Styles
const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  // fetch videos with similar tags
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/tags?tags=${tags}`);
        setVideos(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} type='sm' />
      ))}
    </Container>
  );
};

export default Recommendation;
