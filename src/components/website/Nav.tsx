import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import React, { MouseEvent, useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const Nav: React.FunctionComponent<{}> = () => {
  const classes = useStyles({});

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleNavClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            aria-label="menu"
            onClick={handleNavClick}
          >
            <MenuIcon />
          </IconButton>
          <Hidden xsDown>
            <Link href="/">
              <Typography variant="h4" className={classes.title}>
                OVO Energy Coding Test
              </Typography>
            </Link>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
