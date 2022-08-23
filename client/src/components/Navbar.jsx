import React, { useEffect, useRef, useState } from 'react';
import { Upload } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { logout } from '../redux/userSlice';

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

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--background-color);
`;

const Dropdown = styled.div`
  cursor: pointer;
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('themeColor')
  );

  const { currentUser } = useSelector((state) => state.user);

  const anchorRef = useRef(null);
  const dispatch = useDispatch();

  // Get current theme
  useEffect(() => {
    const theme = localStorage.getItem('themeColor');
    setCurrentTheme(theme);
  }, [localStorage.getItem('themeColor')]);

  // Dropdown toggle
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // Dropdown close
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    } else {
      setOpen(false);
    }
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // Logout user
  const handleLogout = () => {
    try {
      dispatch(logout());
      handleToggle();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          {/* Search input  */}
          <Search>
            <Input placeholder='Search' />
            <SearchOutlinedIcon />
          </Search>
          {/* Login button  */}
          <Login>
            {currentUser ? (
              <User>
                {/* Video upload icon  */}
                <VideoCallOutlinedIcon
                  onClick={() => setOpenPopup(true)}
                  style={{ cursor: 'pointer' }}
                />
                {/* Menu dropdown  */}
                <Dropdown
                  ref={anchorRef}
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={handleToggle}
                >
                  <Avatar src={currentUser?.img} />
                </Dropdown>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement='bottom-start'
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom-start'
                            ? 'left top'
                            : 'right top',
                      }}
                    >
                      <Paper
                        style={{
                          backgroundColor:
                            currentTheme === 'darkTheme'
                              ? 'var(--secondary-color)'
                              : 'var(--white-color)',
                          color:
                            currentTheme === 'darkTheme'
                              ? 'var(--white-color)'
                              : 'var(--black-color)',
                        }}
                      >
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id='composition-menu'
                            aria-labelledby='composition-button'
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem style={{ cursor: 'default' }}>
                              <ListItemIcon style={{ marginRight: '5px' }}>
                                <Avatar src={currentUser?.img} />
                              </ListItemIcon>
                              <ListItemText>{currentUser?.name}</ListItemText>
                            </MenuItem>
                            <Divider
                              style={{
                                backgroundColor:
                                  currentTheme === 'darkTheme'
                                    ? 'var(--divider-color)'
                                    : '#f5f5f5',
                              }}
                            />
                            {/* Logout button  */}
                            <MenuItem onClick={handleLogout}>
                              <ListItemIcon>
                                <LogoutIcon
                                  style={{
                                    color:
                                      currentTheme === 'darkTheme'
                                        ? 'var(--white-color)'
                                        : 'var(--black-color)',
                                  }}
                                />
                              </ListItemIcon>
                              Logout
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </User>
            ) : (
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <Button>
                  <AccountCircleOutlinedIcon /> Sign In
                </Button>
              </Link>
            )}
          </Login>
        </Wrapper>
      </Container>
      {openPopup && <Upload setOpenPopup={setOpenPopup} />}
    </>
  );
};

export default Navbar;
