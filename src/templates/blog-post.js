import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint';
import { DiscussionEmbed } from 'disqus-react';

const StyledBlog = styled.div`
margin: 0 auto;
padding: 0rem 1rem;
div {
  text-align: justify;
}
ul.navigator {
  list-style-type: none;
  text-align : center;
}

${breakpoint('tablet')`
    width: 80%;`}
`

export default class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext
    const disqusShortname = 'paul-blog';
    const disqusConfig = {
        url: `{siteURL}}{node.fields.slug}`,
        identifier: post.fields.slug,
        title: post.frontmatter.title,
    };

    return (<React.Fragment>
        <Header />
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <StyledBlog>
          <h1><a href="#" alt="{post.frontmatter.title}">{post.frontmatter.title}</a></h1>
          <p>
            {post.frontmatter.date}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <p><a href={"/categories/" + post.frontmatter.categories} alt={post.frontmatter.categories}>{post.frontmatter.categories}</a></p>
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        <hr/>

        <ul className="navigator">
          <li>
            {
              previous &&
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            }
          </li>
          <li>
            {
              next &&
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            }
          </li>
        </ul>
        </StyledBlog>
        <Footer />
        </React.Fragment>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        categories
      }
    }
  }
`
