import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import image from '../../../public/images/backEvent.jpg';

var path = require('../../backendPath.js').backendpath


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

function getInformationsUsers(){

		fetch('http://mass-cara2.univ-tlse2.fr/~marc.fouque/namt-backend/getEvents.php', {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          },
          credentials: 'include'
        }).then(function(resp){return resp.text()})
				.then(function(data) {
				if(data=="Connection refused"){
					alert("Vous identifiants ne sont pas corrects");
				}
				else if (data=="OK"){
					console.log('ok at this time !! ')
				} else {
					alert("Echec de connexion a nos services. Veuillez essayer ulterieurement");
				}
				
			}.bind(this))
			.catch(function(error) {
				alert(error);
			});

}

function TitlebarGridList(props) {
  const { classes } = props;
  getInformationsUsers(); 

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