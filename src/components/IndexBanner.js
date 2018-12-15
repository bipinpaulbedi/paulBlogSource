import React from 'react'
import SocialLinks from './SocialLinks'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint';

const StyledIndexBanner = styled.div`
    text-align: center;
    p {
        font-size: 2.5rem;     
    }

    ${breakpoint('tablet')`
    h2 {
        font-size: 3rem;
    }

    p {
        font-size: 4rem;
    }`}
`

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