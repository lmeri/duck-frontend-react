import React from 'react'
import Sighting from './Sighting';
import { List } from 'semantic-ui-react'

const Sightings = ({ sightings }) => {
  return (
    <List>
      {sightings.map(s => <Sighting key={s.id} sighting={s} />)}
    </List>

  )
}

export default Sightings