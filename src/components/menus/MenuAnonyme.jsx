import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = {
  accountButton: {
    marginLeft: 20,
    marginRight: -12,
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

class MenuAnonyme extends React.Component {
  constructor(props) {
      super(props);
      this.state = { right: false };
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
        <List><Link to="/" style={styles.lien}>Se Connnecter</Link></List>
      </div>
    );
    return (
      <div>
        <IconButton
          style={styles.accountButton}
          onClick={this.toggleDrawer('right', true)}
        >
          <AccountCircle/>
        </IconButton>
        <Drawer
          anchor="right"
          open={this.state.right}
          onRequestClose={this.toggleDrawer('right', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
            className={classes.list}
          >
            {menu}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(MenuAnonyme);
