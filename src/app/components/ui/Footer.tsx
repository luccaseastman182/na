import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto text-center">
        <p>Contact us: info@nsbscertified.com</p>
        <div className="mt-2">
          <a href="https://www.facebook.com/nsbscertified" className="mx-2">Facebook</a>
          <a href="https://www.twitter.com/nsbscertified" className="mx-2">Twitter</a>
          <a href="https://www.linkedin.com/company/nsbscertified" className="mx-2">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
