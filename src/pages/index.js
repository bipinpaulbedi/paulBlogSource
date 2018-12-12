import React from 'react'
import Header from '../components/Header'
import IndexBanner from '../components/IndexBanner'
import IndexKeyAreas from '../components/IndexKeyAreas'
import './style.scss'
import IndexCategories from '../components/IndexCategories';

export default class Home extends React.PureComponent {
    render() {
        return(
        <React.Fragment>
            <Header />
            <div className="container">
                <IndexBanner />
                <IndexKeyAreas />
                <IndexCategories />
            </div>
        </React.Fragment>
        )
    }
}