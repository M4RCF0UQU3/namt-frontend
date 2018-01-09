import React from 'react';
import BlogEntry from './BlogEntry.jsx';
import { withStyles } from 'material-ui/styles';

class Blog extends React.Component {
	
	  loadFromDB(){
		  ;
	  } 
	  render() {
			return(
			<div>
				<BlogEntry/>
				<BlogEntry/>
				<BlogEntry/>
			</div>
			);
	   }
}
export default (Blog);
