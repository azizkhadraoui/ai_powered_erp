import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

function Navbar({ isOpen, toggleNav }) { // Receive isOpen and toggleNav props
  const classes = useStyles();

  const handleDrawerClose = () => {
    toggleNav(); // Call toggleNav function to close the navbar
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleNav} // Toggle the navbar when menu icon is clicked
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Scrumeha
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isOpen} // Use isOpen prop to control the open state of the navbar
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}> {/* Close the navbar when clicked */}
            <MenuIcon />
          </IconButton>
        </div>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/profiles">
            <ListItemText primary="Profiles" />
          </ListItem>
          <ListItem button component={Link} to="/projects">
            <ListItemText primary="Projects" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;
