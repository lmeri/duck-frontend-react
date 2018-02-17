import React from 'react'
import Sightings from './components/Sightings'
import AddSighting from './components/AddSighting'
import AppMenu from './components/AppMenu'
import duckService from './services/sightings'
import { Grid, Container } from 'semantic-ui-react'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sightings: [],
            shown: true,
            sort: false
        }
    }

    componentWillMount() {
        duckService
            .getAll()
            .then(response => {
                this.setState({ sightings: response })
            })
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        if (window.innerWidth > 767) {
            this.setState({ shown: true }) 
        }
    }

    changeShown = () => { 
        return () => {
            this.setState({ shown: !this.state.shown })
        }         
    }

    handleSort = (event) => { 
        return () => {
            let list = [...this.state.sightings]
            if (event === 'asc') {
                this.setState({ sightings: list.sort((a,b) => new Date(a.dateTime) - new Date(b.dateTime)) })
            } else {
                this.setState({ sightings: list.sort((a,b) => new Date(b.dateTime) - new Date(a.dateTime)) })
            }
        }         
    }

    handleStateChange = (duck) => {
        this.setState({ sightings: this.state.sightings.concat(duck)})
    }

    render() {
        return (
        <Container>
            <AppMenu 
                sort={this.handleSort} 
                shownName={this.state.shown ? "large minus icon" : "large plus icon"}
                shown={this.changeShown}
            />

            <Grid columns={2} columns='equal' stackable>
                <Grid.Column >
                    <Grid.Row>
                        <AddSighting 
                            shown={this.state.shown} 
                            handleStateChange={this.handleStateChange}
                        />
                    </Grid.Row>
                </Grid.Column>
                
                <Grid.Column>
                    <Grid.Row>
                        <Sightings sightings={this.state.sightings}/>
                    </Grid.Row>    
                </Grid.Column>
            </Grid>
        </Container>
        )
    }
}

export default App;
