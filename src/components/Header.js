import React from 'react'
import Logo from '../assets/logo.svg'
import HeaderNav from './HeaderNav'
import styled from 'styled-components'

const StyledHeader = styled.div`
    padding: 1rem;
    font-weight: 700;`

export default class Header extends React.PureComponent {
    render() {
        return (<StyledHeader>
            <a href="/" aria-label="Home" alt="home">
                <Logo height={60} width={60} /></a>
            <HeaderNav />
        </StyledHeader>)
    }
}