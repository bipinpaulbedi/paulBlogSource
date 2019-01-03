import React from 'react'
import Header from '../components/Header'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Footer from '../components/Footer'
import breakpoint from 'styled-components-breakpoint';
import { Link, graphql } from 'gatsby';
import kebabCase from "lodash/kebabCase"

const StyledHome = styled.div`
margin: 0 auto;
padding: 0rem 1rem;
span {
  padding: 0 1rem 0 0;
}

${breakpoint('tablet')`
    width: 80%;`}
`


export default class Tags extends React.PureComponent {
  render() {
    const { title, description } = this.props.data.site.siteMetadata
    const { group } = this.props.data.allMarkdownRemark
    return (
      <React.Fragment>
        <Header />
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: description }]}
          title={title}
        />
        <StyledHome>
          {group.map(tag => (
            <span key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
                  </Link>
            </span>
          ))}
        </StyledHome>
        <Footer />
      </React.Fragment>
    )
  }
}

export const pageQuery = graphql`
query {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`