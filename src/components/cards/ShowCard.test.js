import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import MainPageCard from './MainPageCard.jsx';
import Typography from 'material-ui/Typography';
import renderer from 'react-test-renderer';

it('LanderCard correctly', () => {
  const tree = renderer
    .create(<MainPageCard>
		        <CardMedia
		          image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/B%C3%A9b%C3%A9_Phoque_de_Weddell_-_Baby_Weddell_Seal.jpg/290px-B%C3%A9b%C3%A9_Phoque_de_Weddell_-_Baby_Weddell_Seal.jpg"
		          title="Présentation"
		        />
		        <CardContent>
		          <Typography type="headline" component="h3">
		            Marc :
		          </Typography>
		          <Typography component="p">
		            Présentation de l'application
		          </Typography>
		        </CardContent>
      		</MainPageCard>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});