import React from 'react'
import './style.scss'

export default class NAV extends React.PureComponent {
    render() {
        return(
            <ul>
                <li>
                    <a title="Articles" href="#">articles</a>
                </li>
                <li>
                    <a title="Info" href="/info">info</a>
                </li>
                <li>
                    <a title="Search" href="/search">search</a>
                </li>
            </ul>)
    }
}