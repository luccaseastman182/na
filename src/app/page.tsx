import React from 'react';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to the National Society of Business Sciences (NSBS)</h1>
          <p className="text-lg mb-8">Your gateway to professional certification in business studies.</p>
          <p className="text-lg mb-8">Explore our text-based courses and gain lifetime access to valuable learning materials.</p>
          <p className="text-lg mb-8">Enroll now for just $299 and start your journey towards professional excellence.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
