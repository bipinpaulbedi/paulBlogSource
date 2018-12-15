import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.div`
    padding: 1rem;
    font-weight: 700;
    text-align: right;`


export default class Footer extends React.PureComponent {
    render() {
        return(
            <StyledFooter>
                powered by | <a href="https://reactjs.org/" alt="react">react</a> | <a href="https://www.gatsbyjs.org/">gatsby</a> | <a href="https://github.com/">github</a>
            </StyledFooter>)
    }
}