import React from 'react';
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <p>© Academlo 2022</p>
            <div className='buttons-container'>
                <a href='https://www.instagram.com/academlohq/' className='button-footer'><i className="fa-brands fa-instagram"></i>
                </a>
                <a href='https://www.linkedin.com/company/academlo/' className='button-footer'><i className="fa-brands fa-linkedin"></i>
                </a>
                <a href='https://www.youtube.com/c/academlo' className='button-footer'><i className="fa-brands fa-youtube"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;