import React from "react";

const Hero = () => {
  return (
    <section className="bg-[#f9fafb42] lg:grid  lg:place-content-center h-[93vh]">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-[3rem] sm:leading-[3.5rem]">
            All Your Digital Products
            <strong className="text-primary"> Is One Click Away </strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Start Exploring State Of The Art Assets Now!
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <a
              className="inline-block rounded border border-primary bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-teal-600"
              href="#"
            >
              Get Started
            </a>

            <a
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
