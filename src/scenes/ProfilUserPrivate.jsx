import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import image from '../../public/images/jardins.jpg';
import image1 from '../../public/images/jardin.jpg';
import image2 from '../../public/images/fleur.jpg';
import image3 from '../../public/images/pommier.jpg';
import image4 from '../../public/images/legume.jpeg';
import image5 from '../../public/images/fruit.jpg';


var path = require('../backendPath').backendpath


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

var tileData = [
  { 
    img : image,
    nom : "Force de la Nature",
    organisateur : "@dmin" 
  },
  { 
    img : image1,
    nom : "Retour de la Tomate",
    organisateur : "@admin" 
  },
  { 
    img : image2,
    nom : "",
    organisateur : "" 
  },
  { 
    img : image3,
    nom : "",
    organisateur : "" 
  },
  { 
    img : image4,
    nom : "",
    organisateur : "" 
  },
  { 
    img : image5,
    nom : "",
    organisateur : "" 
  }
]

function setData(monjson){
  var i = 0; 
  monjson.forEach(element => {
    console.log(element);
    tileData.push({img:image,nom:element.nom,organisateur:element.organisateur})
    i++;
    
  });
}


function getInformationsUsers(monEmail) {
  var monjson;
  fetch(path+'/getEvents.php?email='+monEmail, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    },
    credentials: 'include'
  }).then(function (resp) { return resp.text() })
    .then(function (data) {
      if (data.Reponse != "Veillez vous connecte") {
        monjson = JSON.parse(data)
        setData(monjson)
      } else {
        console.log("NOT CONNECTED");
        return "0";
      }
      

    }.bind(this))
    .catch(function (error) {
      alert(error);
    })
}

function checkLogin() {  
  return fetch(path+'/getInfoConnected.php', { credentials: 'include', method: 'get', accept: 'application/json' })
    .then(function (resp) { return resp.json() })
    .then(function (data) {
      if (data.Reponse != "Veillez vous connecte") { 
        return data.info[0]
      }
    }.bind(this))
    .catch(function (error) {
      console.log(error);
      return 0; 
    });
}


function ProfilUserPrivate(props) {
  const { classes } = props;
  console.log("Not fetching at this time why ?")
  var mypromise = checkLogin();
  var emailz ; 
  mypromise.then(leresulta => {emailz =  leresulta.email; getInformationsUsers(emailz);});
  var realData = tileData; 
  console.log(realData);

  
  return (
    <div className={classes.root}>
      <GridList cellHeight={100} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <Subheader component="div">EVENEMENTS PREVUS</Subheader>
        </GridListTile>
        {realData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.nom} />
            <GridListTileBar
              title={tile.nom}
              subtitle={<span>by: {tile.organisateur}</span>}
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

ProfilUserPrivate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilUserPrivate);