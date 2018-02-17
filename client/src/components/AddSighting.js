import React from 'react'
import duckService from '../services/sightings'
import speciesService from '../services/species'
import { Form, Button, Segment } from 'semantic-ui-react'

class AddSighting extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        species: [],
        newSpecies: '',
        newDescription: '',
        newCount: '',
        newDateTime: ''
      }

      this.handleSpeciesChange = this.handleSpeciesChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
      this.handleCountChange = this.handleCountChange.bind(this);
    }

    handleSpeciesChange(event) {
      this.setState({ newSpecies: event.target.value })
    }

    handleDescriptionChange(event) {
        this.setState({ newDescription: event.target.value })
    }

    handleCountChange(event) {
        this.setState({ newCount: event.target.value })
    }

    handleDateTimeChange(event) {
        this.setState({ newDateTime: event.target.value })
    }

    componentWillMount() {
      speciesService
        .getAll()
        .then(response => {
            this.setState({species: response})
        })
    }

    addSighting = (event) => {
      event.preventDefault()
      if (this.validateForm()) {
      let date = new Date(this.state.newDateTime);
      let isostring = date.toISOString();
      let amount = parseInt(this.state.newCount, 10);

      const duckObject = {
        species: this.state.newSpecies || 'mallard',
        description: this.state.newDescription,
        dateTime: isostring,
        count: amount
      }

      if (this.validateSpecies(duckObject.species)) {
        duckService
          .create(duckObject)
          .then(response => {
            this.setState({
                newCount: '',
                newDateTime: '',
                newDescription: '',
                newSpecies: ''
            })
            this.props.handleStateChange(response);
          })
      }
    }
  }

  validateForm = () => {
    if (this.state.newDateTime.length > 16) {
      alert("Check that date and time are correct.")
      return false;
    } else if (isNaN(this.state.newCount)) {
      alert("Please input numbers for the sighting's count.")
      return false;
    } else if (this.state.newDateTime.length > 16) {
      alert("Check that date and time are correct.")
      return false;
    } else if (parseInt(this.state.newCount, 10) < 1 ) {
      alert("Check that count is correct.")
      return false;
    }
    return true
  }

  validateSpecies = (spec) => {
    if (!this.state.species.find(s => spec === s.name)) {
      alert("Species is incorrect.")
      return false;
    }  
    return true;
  }

  render() {
    const speciesNames = this.state.species.map(s => <option key={s.name} value={s.name}>{s.name}</option>)
    
    if (this.props.shown) {
      return (
        <Segment raised>
        <h3>add sighting</h3>
          <Form onSubmit={this.addSighting}>
            <Form.Field required label='Species' control='select' value={this.state.newSpecies} onChange={this.handleSpeciesChange}>
              {speciesNames}
            </Form.Field>
            <Form.Input required type='datetime-local' value={this.state.newDateTime} placeholder='dd/mm/yyyy, hh:mm' label='Date' onChange={this.handleDateTimeChange} />
            <Form.Input required type='number' label='Count' value={this.state.newCount} onChange={this.handleCountChange} />
            <Form.TextArea label='Description' maxLength="250" value={this.state.newDescription} onChange={this.handleDescriptionChange}/>
            <Button id='submit' type='submit'>add</Button>
          </Form>
        </Segment>
      )
    } else {
      return ( <div></div> )
    }
  }
}

export default AddSighting
