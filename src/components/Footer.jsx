import React from 'react';

const styles = {
  footer: {
    backgroundColor: '#99CC66',
    height: '50px',
	marginTop: '50px'
  },
};

class Footer extends React.Component {
   render() {
      return (
		<footer style={styles.footer}>
			Mentions légales
		</footer>
      );
   }
}

export default (Footer);