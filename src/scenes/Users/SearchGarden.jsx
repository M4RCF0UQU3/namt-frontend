import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import EventIcon from 'material-ui-icons/Event';
import InfoIcon from 'material-ui-icons/Info';
import Subheader from 'material-ui/List/ListSubheader';
import Typography from 'material-ui/Typography';
import SearchBar from '../../components/tools/SearchBar.jsx';
import MainPageCard from '../../components/cards/MainPageCard.jsx';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Tooltip from 'material-ui/Tooltip';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  card: {
  margin: 'auto 10px',
    minHeight: '400px',
    marginBottom: '20px'
  },
  media: {
    height: 194,
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  gridList: {
    width: 500,
    height: 450,
  },
  typo: {
    padding: '10px',
  },
  content: {
    textAlign:'left'
  },
  media: {
    height: '200px',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

class SearchGarden extends React.Component {
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
  addToCalendar(index, month){
    //get data...YYYY-MM-DDTHH:MM:SS
    let address = data[month][1][index].address;
    let newStart = new Date(Date.parse(data[month][1][index].dateStart));
    let newEnd = new Date(Date.parse(data[month][1][index].dateEnd));
    let newStartString = newStart.getUTCFullYear()+''+(newStart.getUTCMonth()+1)+''+newStart.getUTCDate()+"T"+addZero(newStart.getUTCHours())+addZero(newStart.getUTCMinutes())+addZero(newStart.getUTCSeconds())+"Z";
    let newEndString = newEnd.getUTCFullYear()+''+(newEnd.getUTCMonth()+1)+''+newEnd.getUTCDate()+"T"+addZero(newEnd.getUTCHours())+addZero(newEnd.getUTCMinutes())+addZero(newEnd.getUTCSeconds())+"Z";
    let addtogooglecalendar = 'https://www.google.com/calendar/render?action=TEMPLATE&text='+data[month][1][index].title+'&dates='+newStartString+'/'+newEndString+'&details=For+details,+link+here:+http://www.example.com&location='+address.replace(' ','+')+'&sf=true&output=xml';
    window.location.assign(addtogooglecalendar);
  }

  /**
  * Data initialisation from Garden service
  */
  componentDidMount() {

    var request = new Request("http://localhost/namt-backend/filtreJardin.php", {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    fetch(request)
      .then( result => result.json()) // still returns a promise object, U need to chain it again
      .then( items => this.setState({items}))

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
        <SearchBar/>
        <Grid container spacing={16} alignItems="stretch">
          {gardens.map(garden => (
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Author" className={classes.avatar}>
                      {/*{photo proprio}*/}
                    </Avatar>
                  }
                  title={garden.nom}
                  subheader={garden.proprio}
                />

                <CardMedia
                  className={classes.media}
                  image={garden.photo}
                  title={garden.nom}
                />

                <CardContent>
                  <Typography component="p">
                    {garden.adresse}
                  </Typography>
                  <Typography component="p">
                    {garden.ville}
                  </Typography>
                  <Typography component="p">
                    {garden.description}
                  </Typography>
                  <Typography component="p">
                    {garden.info}
                  </Typography>
                </CardContent>

                <CardActions disableActionSpacing>
                  <IconButton>
                    <EventIcon color="white" />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                  <div className={classes.flexGrow} />
                  <Button raised>
                    Consulter
                  </Button>
                </CardActions>

              </Card>
            </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}

SearchGarden.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchGarden);