import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import MainPageCard from './MainPageCard.jsx';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import renderer from 'react-test-renderer';

it('LanderCard correctly', () => {
  const tree = renderer
    .create(<MainPageCard>
		        <CardMedia
		          image="/images/plage.jpeg"
		          title="Blog"
		        />
		      	<CardContent>
		          <Typography type="headline" component="h3">
		            Offrir une belle plage !
		          </Typography>
		          <Typography component="p">
		            Inscrire un jardin.
		          </Typography>
		        </CardContent>
		        <CardActions>
		          <div />
		          <Button label="Remplir le formulaire"
		              href="https://docs.google.com/forms/d/e/1FAIpQLScARUhLXGZmND_pBvti02oi_sZvJce35jnfejglIAY4FHxxSQ/viewform"
		                target="_blank">Inscrire Jardin (être inscrit)</Button>
		        </CardActions>
			</MainPageCard>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});