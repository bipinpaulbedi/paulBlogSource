import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint';

const StyledLatestPost = styled.h3`
font-size: 0.8rem;
margin: 0.75rem 0rem;
${breakpoint('tablet')`
font-size: 1.25rem;
`}
`
export default class IndexPostList extends React.PureComponent {
    render() {
        const { node } = this.props;
        const title = node.frontmatter.title || node.fields.slug
        return (
            <div key={node.fields.slug}>
                <StyledLatestPost>
                    <Link to={node.fields.slug}>
                        {title}
                    </Link>
                </StyledLatestPost>
            </div>
        )
    }
}

