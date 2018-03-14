import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import MainPageCard from './MainPageCard.jsx';
import Typography from 'material-ui/Typography';
import renderer from 'react-test-renderer';

it('EventsCard correctly', () => {
  const tree = renderer
    .create(<MainPageCard>
				<CardMedia
				  image='/images/voie_ferree.jpg'
				  title="Présentation"
				/>
				<CardContent>
				  <Typography type="headline" component="h3">
				    Faire voyager !
				  </Typography>
				  <Typography component="p">
				    Evénement.
				  </Typography>
				</CardContent>
			</MainPageCard>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});