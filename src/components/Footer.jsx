import React from 'react';
import '../assets/Footer.css';
import PropTypes from 'prop-types';

function Footer({themeMode}){

  const theme = themeMode ? "light-mode" : "dark-mode"
  
  return (
    <footer className={`Footer-body ${themeMode}`}>
      <div className="row">
        <div className="col">
        </div>
      </div>
      <section className={`Footer-footer ${themeMode}`}>
        <ul>
          <li>
            <a href="/terms">Terms & Conditions</a>
          </li>
          <li>
            <a href="/terms">Privacy Policy</a>
          </li>
        </ul>
      </section>
    </footer>
  );
}

Footer.propTypes = {
  themeMode: PropTypes.string
 };

export default Footer;
