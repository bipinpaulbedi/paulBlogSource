import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint';

const StyledBanner = styled.div`
text-align: justify;
margin-bottom: 1rem;
${breakpoint('tablet')`
font-size: 1.5rem;
`}
`

export default class IndexBanner extends React.PureComponent {
    render() {
        return (<StyledBanner>
            <div>I care about sharing and learning, thus I write various technical articles but my current key focus areas are <a href="/tags/applied-cryptography" alt="Applied cryptography">Applied cryptography</a> |
        <a href="/tags/machine-learning" alt="Machine Learning"> Machine Learning/AI</a> |
        <a href="/tags/algorithm-design" alt="Algorithm design"> Algorithm design & data structures</a> |
        <a href="/tags/security" alt="White Hat Security"> White hat security</a>.
                                                                                                         and when I am not learning about focused item I usually cover topics such as
        <a href="/tags/dot-net" alt=".Net"> .Net</a> |
        <a href="/tags/design-patterns" alt="Design patterns"> Design patterns</a> |
        <a href="/tags/sitecore" alt="Sitecore"> Sitecore</a> |
        <a href="/tags/technology" alt="Technology"> Rest of the world</a>
            </div>
        </StyledBanner>)
    }
}