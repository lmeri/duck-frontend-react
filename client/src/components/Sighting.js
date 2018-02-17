import React from 'react'
import { List, Segment } from 'semantic-ui-react'

const Sighting = ({ sighting }) => {
    let date = sighting.dateTime;
    let dateTime = new Date(date).toLocaleString([], {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit', 
        hour: '2-digit', 
        minute:'2-digit'});
    let sUpperCase = sighting.species.charAt(0).toUpperCase() + sighting.species.slice(1)
    return (
        <Segment raised>
        <List.Item>
        <List.Content>
          <List.Header as='a'>{dateTime}</List.Header>
          <List.Description>
            <b>Species</b>: {sUpperCase} <br/>
            <b>Count</b>: {sighting.count} <br/>
            <b>Description</b>: {sighting.description} <br/>
          </List.Description>
        </List.Content>
      </List.Item>
      </Segment>
      
    ) 
}

export default Sighting