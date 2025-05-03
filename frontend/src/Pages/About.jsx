import React from "react";

const About = () => {
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-pink-800 pb-4">
            About Us
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 ">
            Welcome to Avon Virgie, a website that brings you the best Avon
            products and services. We are four students passionate about beauty
            and helping others. We wanted to create a platform where everyone
            could feel confident and beautiful. We are excited to offer a wide
            range of Avon makeup products, including lipstick, pressed powder,
            brow liner, and more. Our website is named after Virgie, the mother
            of one of our team members. Virgie has always been a source of
            inspiration and support for her daughter, Pearl Nerijean G. Calape,
            and she is passionate about helping others feel their best. We are
            honored to dedicate this website to her. We are committed to
            providing our customers with the best possible shopping experience.
            We hope you will enjoy shopping at Avon Virgie. Thank you for
            supporting the website!
          </p>
        </div>
        <div className="w-full lg:w-8/12 ">
          <img
            className="w-full h-full"
            src="pearl's_mother.jpeg"
            alt="Pearl's Mother"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-pink-800 pb-4">
            Our Story
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 ">
            Avon Virgie is still a young website, but it will grow to become a
            trusted resource for Avon customers. The team is committed to
            providing their customers with the best possible browsing
            experience, and they are always looking for new ways to improve the
            website. In the future, the team hopes to expand Avon Virgie to
            offer even more products and services and to reach even more Avon
            customers. They also hope to continue to support the local community
            through their charitable giving initiatives. Thank you for choosing
            Avon Virgie!
          </p>
        </div>
        <div className="w-full lg:w-8/12 lg:pt-8">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden"
                src="/pearl_calape.jpg"
                alt="Pearl Img"
              />
              <img
                className="md:hidden block"
                src="/pearl_calape.jpg"
                alt="Pearl Img"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Pearl Calape
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden"
                src="/jethro_parker.jpg"
                alt="Jethro Img"
              />
              <img
                className="md:hidden block"
                src="/jethro_parker.jpg"
                alt="Jethro Img"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Jethro Parker
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden"
                src="/jerome_diaz.jpg"
                alt="Jerome Img"
              />
              <img
                className="md:hidden block"
                src="/jerome_diaz.jpg"
                alt="Jerome Img"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Jerome Diaz
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden"
                src="/violy_julapong.jpg"
                alt="Violy img"
              />
              <img
                className="md:hidden block"
                src="/violy_julapong.jpg"
                alt="Violy img"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Violy Julapong
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
