import React from 'react'
import SocialLinks from './SocialLinks'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint';

const StyledIndexBanner = styled.div`
    text-align: center;
    p {
        font-size: 2.5rem;     
    }
    a.nameLink {
        box-shadow: none;
    }

    ${breakpoint('tablet')`
    h2 {
        font-size: 3rem;
        margin-top: 1rem;
    }

    p {
        font-size: 4rem;
    }`}
`

export default class IndexBanner extends React.PureComponent {
    render() {
        return (
            <StyledIndexBanner>
                <h2>Hello, I'm <a className="nameLink" href="#" alt="">Bipin</a> & I craft technology products. This site chronicles my thoughts, stories and ideas.</h2>
                <p><SocialLinks /></p>
            </StyledIndexBanner>)
    }
}