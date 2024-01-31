import React from "react";

const About = () => {
  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
      <div className='max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <h1 className='text-3xl font-bold mb-4'>About Us</h1>
        <p className='text-gray-700 mb-4'>
          Welcome to our website! We are a team of passionate individuals
          dedicated to providing high-quality products and services.
        </p>
        <p className='text-gray-700'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
          nisi vitae mauris sagittis ullamcorper. Aliquam erat volutpat. Integer
          mattis nulla id enim consequat, et feugiat magna rutrum. Suspendisse
          potenti. Duis vestibulum nisi sit amet lacus posuere, non pharetra
          purus tempus. Duis rutrum id odio at pellentesque.
        </p>
      </div>
    </div>
  );
};

export default About;
