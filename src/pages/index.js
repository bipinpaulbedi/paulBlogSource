import React from 'react'
import Header from '../components/Header'
import IndexBanner from '../components/IndexBanner'

export default class Home extends React.PureComponent {
    render() {
        return(
            <React.Fragment>
        <Header />
        <IndexBanner />
        </React.Fragment>
        )
    }
}