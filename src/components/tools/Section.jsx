import React from 'react';
import PropTypes from 'prop-types';

function Section(props) {
	const styles = {
	section: {
		height: '500px',
		marginBottom: '100px',
	},
};
	return(
		<section style={styles.section}>
			{props.children}
	    </section>
  );	  
}

Section.propTypes = {
	children: PropTypes.node,
};

export default (Section);