import React from 'react'
import Logo from '../../assets/logo.svg'
import NAV from './components/NAV'
import styled from 'styled-components'

const StyledHeader = styled.div`
    padding: 1rem;
    font-weight: 700;`

export default class Header extends React.PureComponent {
    render() {
        return(<StyledHeader>
            <a href="/" alt="home">
                <Logo height={60} width={60} /></a>
            <NAV />
            </StyledHeader>)
    }
}