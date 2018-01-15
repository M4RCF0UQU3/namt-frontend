import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';
//import listeDesJardinsPossédés from './path';

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

import jardin from '../../public/images/jardin.jpg';
 
  const tileData = [
    {
      img: jardin,
      title: 'Jardin',
      author: 'Franck',
    },
    {
      img: jardin,
      title: 'Jardin',
      author: 'Alfred',
    },
    {
      img: jardin,
      title: 'Jardin',
      author: 'Annick',
    },
    {
      img: jardin,
      title: 'Jardin',
      author: 'Gertrude',
    },
  ];

function ListLanderOwner(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {/*Adapter le nombre de colonnes avec la taille de l'écran*/}
      <GridList className={classes.gridList} cols={2}>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>Propriétaire : {tile.author}</span>}
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

ListLanderOwner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListLanderOwner);