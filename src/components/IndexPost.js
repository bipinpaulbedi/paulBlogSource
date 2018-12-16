import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { DiscussionEmbed } from 'disqus-react';
import breakpoint from 'styled-components-breakpoint';

const StyledLatest = styled.div`
font-weight: bold;
${breakpoint('tablet')`
font-size: 1.5rem;
`}
`

const StyledLatestPost = styled.h3`
margin: 0.5rem 0rem
font-weight: bold;
${breakpoint('tablet')`
font-size: 2rem;
`}
`

const StyledSmall = styled.small`
${breakpoint('tablet')`
font-size: 1.2rem;
`}
`
const StyledHtml = styled.p`
${breakpoint('tablet')`
font-size: 1.2rem;
`}
`

export default class IndexPost extends React.PureComponent {
    render() {
        const { posts, siteURL } = this.props;
        return(<React.Fragment>
            {posts.map(({ node }) => {
            const disqusShortname = 'paul-blog';
            const disqusConfig = {
                url: siteURL + node.fields.slug,
                identifier: node.fields.slug,
                title: node.frontmatter.title,
            };
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
              <StyledLatest>Latest though, story or idea...</StyledLatest>
                <StyledLatestPost>
                  <Link to={node.fields.slug}>
                    {title}
                  </Link>
                </StyledLatestPost>
                <StyledSmall>{node.frontmatter.date}</StyledSmall>
                <StyledHtml dangerouslySetInnerHTML={{ __html: node.html }} />
                <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
              </div>
            )
          })}
          </React.Fragment>)
    }
}

