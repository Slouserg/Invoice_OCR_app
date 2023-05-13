import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useStyles } from "./styles";
import { Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import httpRequest from "../../httpRequest";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import ProfileModal from "../ProfileModal/ProfileModal";

const Navbar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [showProfileOpen, setShowProfileOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpen(null);
  };

  const handlePasswordModalOpen = () => {
    setChangePasswordOpen(true);
    setOpen(null);
  };

  const handleClosePasswordModal = () => {
    setChangePasswordOpen(false);
  };

  const handleProfileModalOpen = () => {
    setShowProfileOpen(true);
    setOpen(null);
  };

  const handleCloseProfileModal = () => {
    setShowProfileOpen(false);
  };

  const logoutUser = async () => {
    await httpRequest.post("//localhost:5000/logout");
    window.location.href = "/login";
  };

  return (
    <>
      <div className={classes.rootContainer}>
        <div className={classes.headingContainer}>
          {!props.sideMenuVisible && (
            <IconButton onClick={props.toggleSideMenu}>
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
          )}
          <Typography variant="h5" sx={{ ml: 4 }}>
            Welcome Back {props.userName}!
          </Typography>
        </div>
        <div className={classes.rightButtons}>
          <IconButton sx={{ p: 0.1, color: "white" }} onClick={handleMenuOpen}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Menu anchorEl={open} open={Boolean(open)} onClose={handleMenuClose}>
            <MenuItem onClick={handleProfileModalOpen}>Profile</MenuItem>
            <MenuItem onClick={handlePasswordModalOpen}>Change password</MenuItem>
            <MenuItem onClick={logoutUser}>Log out</MenuItem>
          </Menu>
          <Button
            className={classes.logout}
            variant="contained"
            sx={{ mx: 2 }}
            onClick={logoutUser}
          >
            Log out
          </Button>
        </div>
        <ChangePasswordModal
          open={changePasswordOpen}
          onClose={handleClosePasswordModal}
        />
        <ProfileModal open={showProfileOpen} onClose={handleCloseProfileModal} />
      </div>
    </>
  );
};

export default Navbar;
