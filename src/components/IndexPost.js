import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint';
import * as R from 'ramda';
import IndexPostList from './IndexPostList';
import { pallet } from '@bipinpaulbedi/paul-blog-typography-theme'

const StyledLatest = styled.div`
text-align: center;
font-weight: bold;
div {
  color: ${pallet.secondary}
}
${breakpoint('tablet')`
font-size: 1.5rem;
`}
`
export default class IndexPost extends React.PureComponent {
  render() {
    const { posts } = this.props;
    const groupedPosts = R.groupBy((ele) => { return ele.node.frontmatter.year }, posts);
    const elems = Object.keys(groupedPosts).sort().reverse();
    return (<StyledLatest>
      Latest though, story or idea...
      {elems.map((ele) => {
        return (<React.Fragment>
          <div>{ele}</div>
          {groupedPosts[ele].map(({ node }) => {
            return (
              <IndexPostList node={node}></IndexPostList>
            )
          })}
        </React.Fragment>)
      })}
    </StyledLatest>)
  }
}

