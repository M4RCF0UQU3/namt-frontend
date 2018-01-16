import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: '#558822',
  },
  list: {
    width: "250px",
    textAlign: "center",
    fontVariant: "small-caps",
  },
  lien: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

class MenuAppli extends React.Component {
  constructor(props) {
      super(props);
      this.state = { left: false };
  }

  toggleDrawer(side, open) {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const menu = (
      <div>
        <Link to="/events" style={styles.lien}><List>Événements</List></Link>
      </div>
    );
    return (
      <div>
        <IconButton
          style={styles.menuButton}
          onClick={this.toggleDrawer('left', true)}
        >
          <MenuIcon/>
        </IconButton>
        <Drawer
          open={this.state.left}
          onRequestClose={this.toggleDrawer('left', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
            className={classes.list}
          >
            {menu}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(MenuAppli);
