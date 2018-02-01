import React from 'react'

import {Navbar} from 'react-bootstrap'

const NavigationHeader = () => {
    return (
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">Go Parent</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
        </Navbar.Header>
    )
}

export default NavigationHeader