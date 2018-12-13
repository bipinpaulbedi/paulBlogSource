import React from 'react'
import Header from '../components/Header'
import IndexBanner from '../components/IndexBanner'
import IndexKeyAreas from '../components/IndexKeyAreas'
import IndexCategories from '../components/IndexCategories';

import styled from 'styled-components'
const StyledHome = styled.div`
margin: 0 auto;
padding: 0rem 1rem;`


export default class Home extends React.PureComponent {
    render() {
        return(
        <React.Fragment>
            <Header />
            <StyledHome>
                <IndexBanner />
                <IndexKeyAreas />
                <IndexCategories />
            </StyledHome>
        </React.Fragment>
        )
    }
}