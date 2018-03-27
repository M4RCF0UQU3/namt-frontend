import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';


var path = require('../backendPath').backendpath;
var lesimages = require('./tileData').mesimage;

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
})

console.log (lesimages.im0);
var tileData = [
  { 
    img : lesimages.im0,
    nom : "Force de la Nature",
    organisateur : "@dmin" 
  },
  { 
    img : lesimages.im1,
    nom : "Retour de la Tomate",
    organisateur : "@dmin" 
  },
  { 
    img : lesimages.im2,
    nom : "",
    organisateur : "" 
  },
  { 
    img : lesimages.im3,
    nom : "",
    organisateur : "" 
  },
  { 
    img : lesimages.im4,
    nom : "",
    organisateur : "" 
  },
  { 
    img : lesimages.im5,
    nom : "",
    organisateur : "" 
  }
]

function setData(monjson){
  var i = 0; 
  monjson.forEach(element => {
    console.log(element);
    //tileData.push({img:null,nom:element.nom,organisateur:element.organisateur})
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
  mypromise.then(leresulta => {emailz =  leresulta.email; getInformationsUsers(emailz);})
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={100} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <Subheader component="div">EVENEMENTS PREVUS</Subheader>
        </GridListTile>
        {tileData.map(tile => (
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