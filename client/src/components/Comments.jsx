import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Comment } from '../components';

// Styles
const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Comments = ({ videoId, currentUser }) => {
  const [comments, setComments] = useState([]);

  // fetch video comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchComments();
  }, [videoId]);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder='Add a comment' />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment?._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
