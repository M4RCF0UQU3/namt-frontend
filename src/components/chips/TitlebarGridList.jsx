import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import image from '../../../public/images/backEvent.jpg';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});


const tileData = [
  {
    img: image,
    title: 'Evenement du 13/12/2018 12h23 ',
    author: 'Pablo Escobar',
  },
  {
    img: image,
    title: 'Evenement du 13/12/2018 12h23 ',
    author: 'Pablo Escobar',
  },
  {
    img: image,
    title: 'Evenement du 13/12/2018 12h23 ',
    author: 'Pablo Escobar',
  },
  {
    img: image,
    title: 'Evenement du 13/12/2018 12h23 ',
    author: 'Pablo Escobar',
  },
  {
    img: image,
    title: 'Evenement du 13/12/2018 12h23 ',
    author: 'Pablo Escobar',
  },
  {
    img: image,
    title: 'Evenement du 13/12/2018 12h23 ',
    author: 'Pablo Escobar',
  },

];

function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={100} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <Subheader component="div">EVENEMENTS PREVUS</Subheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);