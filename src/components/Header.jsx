import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import EventIcon from 'material-ui-icons/Event';
import LibraryBooksIcon from 'material-ui-icons/LibraryBooks';
import Button from 'material-ui/Button';

const styles = {
  appbar: {
  	backgroundColor: '#99CC66',
  	position: 'fixed',
  },
  img: {
  	height: '50px',
  },
  lien: {
  	marginLeft: 'auto',
  	marginRight: 'auto',
  },
};

class Header extends React.Component {
  constructor(props) {
      super(props);
      this.state = { left: false };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const drawer = (
      <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
          <div className={classes.list}>
              <List>
                <Link to="/events" style={styles.lien}>
                  <ListItem button>
                    <ListItemIcon>
                      <EventIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Evénements" />
                  </ListItem>
                </Link>

                <ListItem button component="a" href="https://medium.com/acc%C3%A9l%C3%A9rateur-momentum/adopte-ma-tomate-b595ac29d5ef"
                  target="_blank">
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Blog" />
                </ListItem>

              </List>
            </div>
          </div>
        </Drawer>
    );

    return (
      <AppBar position="static" style = {styles.appbar}>
        <Toolbar>
          <IconButton
              color="contrast"
              aria-label="open drawer"
              onClick={this.toggleDrawer('left', true)}>
              <MenuIcon />
          </IconButton>
          <Link to="/" style={styles.lien}><img src='/images/logo.png' style={styles.img}/></Link>
          <Button
							component={Link}
              color="contrast"
              to="/signin"
						  >
							{'Connexion'}
					</Button>
        </Toolbar>
        {drawer}
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
