import React from 'react'
import { FaFacebook, FaTwitterSquare, FaInstagram, FaGithubSquare, FaLinkedin } from 'react-icons/fa';

export default class SocialLinks extends React.PureComponent {
    render() {
        return (<React.Fragment>
            <a aria-label="Twitter" href="https://twitter.com/bipinpaulbedi" alt="twitter">
                <FaTwitterSquare /></a>  <a aria-label="Facebook" href="https://www.facebook.com/bipinpaulbedi" alt="facebook">
                <FaFacebook /></a>  <a aria-label="Instagram" href="https://www.instagram.com/bipinpaulbedi/" alt="instagram">
                <FaInstagram /> </a>  <a aria-label="Github" href="https://github.com/bipinpaulbedi" alt="github">
                <FaGithubSquare /></a> <a aria-label="LinkedIn" href="https://www.linkedin.com/in/bipinpaulbedi/" alt="linkedin">
                <FaLinkedin /></a>
        </React.Fragment>)
    }
}