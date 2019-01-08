import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint';

const StyledBlogCategory = styled.div`
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

export default class BlogCategoryTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { edges, totalCount } = this.props.data.allMarkdownRemark
    const { category } = this.props.pageContext
    const categoryHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
      } tagged with "${category}"`
    const siteDescription = categoryHeader


    return (<React.Fragment>
      <Header />
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={siteTitle}
      />
      <StyledBlogCategory>
        <h1><a href={category} alt="{categoryHeader}">{categoryHeader}</a></h1>
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
      </StyledBlogCategory>
      <hr />
      <Footer />
    </React.Fragment>
    )
  }
}

export const pageQuery = graphql`
query($category: String) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { categories: { in: [$category] } } }) {
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
            categories
          }
        }
      }
    }
  }
`
