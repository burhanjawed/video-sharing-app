import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  // fetch videos by type
  useEffect(() => {
    try {
      const fetchVideos = async () => {
        const res = await axios.get(`/videos/${type}`);
        setVideos(res.data);
      };

      fetchVideos();
    } catch (err) {
      setError(err);
      console.log(err);
    }
  }, [type]);

  return (
    <Container>
      {error && error}
      {/* Video cards  */}
      {videos.map((video) => {
        return <Card key={video?._id} video={video} />;
      })}
    </Container>
  );
};

export default Home;
