import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';

// Styles
const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Comment = ({ comment }) => {
  const [user, setUser] = useState([]);

  // fetch comment user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/find/${comment?.userId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [comment?.userId]);

  return (
    <Container>
      <Avatar src='https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo' />
      <Details>
        <Name>
          {user?.name} <Date>{format(comment?.createdAt)}</Date>
        </Name>
        <Text>{comment?.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
