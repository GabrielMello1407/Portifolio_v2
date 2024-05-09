'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  const downloadLink = '/Gabriel_Mello_Front_End_Developer.pdf';
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-8 place-self-center justify-self-start text-center sm:text-left">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600 ">
              Hello World! I&apos;m {''}
            </span>
            <br />
            <TypeAnimation
              sequence={['Gabriel Mello', 1000, 'Front-end Developer', 1000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg text-lg mb-6 lf:text-xl">
            Bem vindos ao meu portifólio!
          </p>
          <div>
            <Link
              href="#about"
              className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 via-secondary-500 to-purple-500 hover:bg-slate-200 text-white"
            >
              Sobre Mim
            </Link>
            <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 via-secondary-500 to-purple-500 hover:bg-slate-800 text-white  mt-3">
              <a
                href={downloadLink}
                download="Gabriel_Mello_Front_End_Developer.pdf"
              >
                <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                  Download Currículo
                </span>
              </a>
            </button>
          </div>
        </div>
        <div className="col-span-4 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/images/eu.png"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full"
              alt="hero image"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
