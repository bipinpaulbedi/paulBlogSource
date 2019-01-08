import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint';

const StyledBlogTags = styled.div`
margin: 0 auto;
padding: 0rem 1rem;
text-align: center;
ul {
    list-style-type: none;
}

${breakpoint('tablet')`
    width: 75%;`}

${breakpoint('desktop')`
    width: 50%;`}
`

export default class BlogTagsTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { edges, totalCount } = this.props.data.allMarkdownRemark
    const { tag } = this.props.pageContext
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
      } tagged with "${tag}"`
    const siteDescription = tagHeader


    return (<React.Fragment>
      <Header />
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={siteTitle}
      />
      <StyledBlogTags>
        <h1><a href={tag} alt="{tagHeader}">{tagHeader}</a></h1>
        <ul>
          {edges.map(({ node }) => {
            const { title } = node.frontmatter
            const { slug } = node.fields
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            )
          })}
        </ul>
      </StyledBlogTags>
      <hr />
      <Footer />
    </React.Fragment>
    )
  }
}

export const pageQuery = graphql`
query($tag: String) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount  
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
