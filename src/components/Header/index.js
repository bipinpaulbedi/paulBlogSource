import React from 'react'
import Logo from '../../assets/logo.svg'
import NAV from './components/NAV'
import './style.scss'

export default class Header extends React.PureComponent {
    render() {
        return(<div className="header">
            <a href="/" alt="home">
                <Logo height={60} width={60} /></a>
            <NAV />
            </div>)
    }
}