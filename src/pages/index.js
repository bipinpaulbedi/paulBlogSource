import React from 'react'
import Header from '../components/Header'
import IndexBanner from '../components/IndexBanner'
import IndexKeyAreas from '../components/IndexKeyAreas'
import IndexPost from "../components/IndexPost";
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Footer from '../components/Footer'
import breakpoint from 'styled-components-breakpoint';

const StyledHome = styled.div`
margin: 0 auto;
padding: 0rem 1rem;

${breakpoint('tablet')`
    width: 80%;`}
`


export default class Home extends React.PureComponent {
    render() {
        const {title, description }  = this.props.data.site.siteMetadata
        return(
        <React.Fragment>
            <Header />
            <Helmet
            htmlAttributes={{ lang: 'en' }}
            meta={[{ name: 'description', content: description }]}
            title={title}
            />
            <StyledHome>
                <IndexBanner />
                <IndexKeyAreas />
                <IndexPost posts={this.props.data.allMarkdownRemark.edges} siteURL={this.props.data.site.siteUrl} />
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1) {
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