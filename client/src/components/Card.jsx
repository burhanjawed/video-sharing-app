import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';
import axios from 'axios';

// Styles
const Container = styled.div`
  width: ${(props) => props.type !== 'sm' && '360px'};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 10px;
`;

const Image = styled.img`
  width: ${(props) => (props.type === 'sm' ? '50%' : '100%')};
  height: ${(props) => (props.type === 'sm' ? '120px' : '202px')};
  background-color: var(--background-color);
  object-fit: cover;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => (props.type === 'sm' ? '0px' : '16px')};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--background-color);
  display: ${(props) => props.type === 'sm' && 'none'};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState([]);
  const [error, setError] = useState('');

  // fetch channel that owns video
  useEffect(() => {
    try {
      const fetchChannel = async () => {
        const res = await axios.get(`/users/find/${video?.userId}`);
        setChannel(res.data);
      };

      fetchChannel();
    } catch (err) {
      setError(err);
      console.log(err);
    }
  }, [video?.userId]);

  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: 'none' }}>
      <Container type={type}>
        {/* Video image  */}
        <Image src={video?.imgUrl} type={type} />
        {/* Video details  */}
        <Details type={type}>
          <ChannelImage
            src='https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo'
            type={type}
          />
          <Texts>
            <Title>{video?.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>
              {video?.views} views ??? {format(video?.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
