import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import EventIcon from 'material-ui-icons/Event';
import InfoIcon from 'material-ui-icons/Info';
import Subheader from 'material-ui/List/ListSubheader';
import Typography from 'material-ui/Typography';
import SearchBar from '../components/tools/SearchBar.jsx';
import MainPageCard from '../components/cards/MainPageCard.jsx';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Tooltip from 'material-ui/Tooltip';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import Button from 'material-ui/Button';
import StarBorderIcon from 'material-ui-icons/StarBorder';

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
    color: 'default',
  }
});


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

class Test extends React.Component {
  constructor(props) {
      super(props);
      this.state = { description_visible: [], items: [] };
  }

  handleClick(index, month){
      const vis = this.state.description_visible;             //meme que: const checked = this.state.checked
      const currentIndex = vis.indexOf(index+'_'+month);          //trouver l'index de l'objet togglé - return -1 si pas trouvé
      const newVisibility = [...vis];                   //shallow copy of checked
      if (currentIndex === -1) {
        newVisibility.push(index+'_'+month);                //ajouter dans le nouveau tableau la valeur
      } else {
        newVisibility.splice(currentIndex, 1);              //sinon (s'il existe) on retire 1 element a la position de l'index
      }
      this.setState({
        description_visible: newVisibility,               //on remplace le vieux statut par le nouveau (ce qui va rerender le truc)
      });
  }

  /**
  * Data initialisation from Event service
  */
  componentDidMount() {
    {/*__CONFIG__.amtApi.prefixUrl + 'event-api/events'*/}
    var request = new Request("http://localhost/namt-backend/filtreJardin.php", {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
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
        {/*Adapter le nombre de colonnes avec la taille de l'écran*/}
        <GridList className={classes.gridList} cols={2}>
          {gardens.map(garden => (
            <GridListTile key={garden.img}>
              <img src={garden.img} alt={garden.title} />
              <GridListTileBar
                title={garden.title}
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

Test.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Test);