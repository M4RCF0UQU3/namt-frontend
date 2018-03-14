import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import renderer from 'react-test-renderer';

it('EventsCard correctly', () => {
  const tree = renderer
    .create(<div>
		        <Card>
		          <CardMedia
		            image="/images/bille.jpg"
		            title="Présentation"
		          />
		          <CardContent>
		            <Typography type="headline" component="h2">
		              Abandonne ta Tomate...
		            </Typography>
		            <Typography component="p">
		              Vu qu'on a été viré, nous faisons de la concurrence !
		            </Typography>
		          </CardContent>
		          <CardActions disableActionSpacing>

			          <div />
			          <Button>C'est le newletter</Button>
		          </CardActions>
		        </Card>
      		</div>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});