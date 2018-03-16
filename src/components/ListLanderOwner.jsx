import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';
//import listeDesJardinsPossédés from './path';

var imagepath = require('../backendPath.js').imagepath

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    textAlign: 'left',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  starColor: {
    color: 'white',
  }
});

class ListLanderOwner extends React.Component {
  constructor(props) {
      super(props);
      this.state = { description_visible: [], items: [] };
  }

  componentDidMount() {

    var request = new Request('http://localhost/namt-backend/getJardins.php?email=@dmin', {
      method: 'GET',
    });

    fetch(request)
      .then( result => result.json()) // still returns a promise object, U need to chain it again
      .then( items => this.setState({items}));

    // .then( response => {
    //    this.setState({items:response.body});
    //
    // }).catch( err => {
    //   console.log("Data initialisation KO");
    //    console.log(err);
    // });
  }

  render(){
    const { classes } = this.props;
    const gardens = this.state.items;
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList}>
          {gardens.map(garden => (
            <GridListTile key={imagepath+garden.photo}>
              <img src={imagepath+garden.photo} alt={garden.nom} />
              <GridListTileBar
                title={garden.nom}
                subtitle={<span>Propriétaire : {garden.proprio}</span>}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <StarBorderIcon className={classes.starColor} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

ListLanderOwner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListLanderOwner);