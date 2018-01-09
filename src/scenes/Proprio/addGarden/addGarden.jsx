import React, {Component} from 'react';
import AddGardenForm1 from './addGarden1.jsx'
import AddGardenForm2 from './addGarden2.jsx'
import GardenAdded from './gardenAdded.jsx'

class AddGarden extends React.Component {
	constructor(props) {
		super(props);
		this.state = {step:1};
	  }
	  render() {
			switch (this.state.step) {
				case 1:
					return <AddGardenForm1 next={this.nextStep} prev = {this.prevStep}/>
				case 2:
					return <AddGardenForm2 next={this.nextStep} prev = {this.prevStep}/>
				case 3:
					return <GardenAdded />
			}
	   }
	   nextStep = () => {
		  this.setState({
			step : this.state.step + 1
		  })
	   }
	   prevStep = () => {
		  this.setState({
			step : this.state.step -1
		  })
	   }
}
export default AddGarden;
