import React from 'react'
import SocialLinks from './components/SocialLinks'
import styled from 'styled-components'

const StyledIndexBanner = styled.div`
    text-align: center;
    p {
         font-size: 2.5rem;     
    }`

export default class IndexBanner extends React.PureComponent {
    render() {
        return(
        <StyledIndexBanner>
            <h2>Hello, I'm <span>Bipin</span> & I craft technology products. This site chronicles my thoughts, stories and ideas.</h2>
            <p><SocialLinks /></p>
            <hr />
        </StyledIndexBanner>)
    }
}