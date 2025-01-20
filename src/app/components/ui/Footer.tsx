import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 p-4 text-white">
      <div className="container mx-auto text-center">
        <p>Contact us: info@nsbscertified.com</p>
        <div className="mt-2">
          <a href="https://www.facebook.com/nsbscertified" className="mx-2 text-gray-300 hover:text-white">Facebook</a>
          <a href="https://www.twitter.com/nsbscertified" className="mx-2 text-gray-300 hover:text-white">Twitter</a>
          <a href="https://www.linkedin.com/company/nsbscertified" className="mx-2 text-gray-300 hover:text-white">LinkedIn</a>
        </div>
        <p className="mt-4">© 2023 National Society of Business Sciences (NSBS)</p>
      </div>
    </footer>
  );
};

export default Footer;
