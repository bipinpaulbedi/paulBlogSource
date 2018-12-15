import React from 'react'
import { FaFacebook,FaTwitterSquare,FaInstagram,FaGithubSquare,FaLinkedin } from 'react-icons/fa';

export default class SocialLinks extends React.PureComponent {
    render() {
        return(<React.Fragment>
        <a href="https://twitter.com/bipinpaulbedi" alt="twitter">
        <FaTwitterSquare /></a>  <a href="https://www.facebook.com/bipinpaulbedi" alt="facebook">
        <FaFacebook /></a>  <a href="https://www.instagram.com/bipinpaulbedi/" alt="instagram">
        <FaInstagram /> </a>  <a href="https://github.com/bipinpaulbedi" alt="github">
        <FaGithubSquare /></a> <a href="https://www.linkedin.com/in/bipinpaulbedi/" alt="linkedin">
        <FaLinkedin /></a>
        </React.Fragment>)
    }
}