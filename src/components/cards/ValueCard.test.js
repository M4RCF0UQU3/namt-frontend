import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import MainPageCard from './MainPageCard.jsx';
import Typography from 'material-ui/Typography';
import renderer from 'react-test-renderer';

it('LanderCard correctly', () => {
  const tree = renderer
    .create(<MainPageCard>
		        <CardMedia
		          image="images/gaertner.jpeg"
		          title="Présentation"
		        />
		        <CardContent>
		          <Typography type="headline" component="h3">
		            Nos Valeurs
		          </Typography>
		          <Typography component="p">
		            Collaboratif / ensemble
		          </Typography>
		          <Typography component="p">
		            Lien intergénérationnel et social
		          </Typography>
		        </CardContent>
      		</MainPageCard>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});