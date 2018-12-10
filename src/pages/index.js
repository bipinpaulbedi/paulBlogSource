import React from 'react'
import Header from '../components/Header'
import IndexBanner from '../components/IndexBanner'
import IndexKeyAreas from '../components/IndexKeyAreas'

export default class Home extends React.PureComponent {
    render() {
        return(
            <React.Fragment>
        <Header />
        <IndexBanner />
        <hr/>
        <IndexKeyAreas />
        </React.Fragment>
        )
    }
}