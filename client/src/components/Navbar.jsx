import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

// Styles
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  transition: 0.5s;
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 30%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.textSoft};
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Login = styled.div``;

const Button = styled.button`
  text-transform: uppercase;
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid var(--button-color);
  color: var(--button-color);
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        {/* Search input  */}
        <Search>
          <Input placeholder='Search' />
          <SearchOutlinedIcon />
        </Search>
        {/* Login button  */}
        <Login>
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <Button>
              <AccountCircleOutlinedIcon /> Sign In
            </Button>
          </Link>
        </Login>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
