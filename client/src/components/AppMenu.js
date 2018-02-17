import React from 'react'
import { Container, Menu, Responsive } from 'semantic-ui-react'

const AppMenu = ({sort, shown, sortName, shownName}) => {

    return (
        <Container>
            <Menu borderless size='tiny' fluid widths={5} stackable>
                <Menu.Item header><i className="large find icon"></i> 
                    SIGHT-A-DUCK
                </Menu.Item>
                <Responsive as={Menu.Item} maxWidth={767} link onClick={shown()}>
                    <i className={shownName}></i>
                </Responsive>
                <Menu.Item link onClick={sort('asc')}>
                    <i className="large sort numeric ascending icon"></i>
                </Menu.Item>
                <Menu.Item link onClick={sort('des')}>
                    <i className="large sort numeric descending icon"></i>
                </Menu.Item>
                <Menu.Item>
                    VINCIT SUMMER 2018 KOODIJAHTI
                </Menu.Item>
            </Menu>
        </Container>
    )
}

export default AppMenu