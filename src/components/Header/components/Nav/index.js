import React from 'react'
import styled from 'styled-components'

const StyledNAV = styled.ul`
    float: right;
    li {
        float: left;
        list-style: none;
        padding: 1rem 0.5rem;
    }`

export default class NAV extends React.PureComponent {
    render() {
        return(
            <StyledNAV>
                <li>
                    <a title="Articles" href="#">articles</a>
                </li>
                <li>
                    <a title="Info" href="/info">info</a>
                </li>
                <li>
                    <a title="Search" href="/search">search</a>
                </li>
            </StyledNAV>)
    }
}