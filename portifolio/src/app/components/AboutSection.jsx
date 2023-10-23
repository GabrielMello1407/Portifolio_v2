'use client'
import Image from 'next/image'
import React, { useTransition, useState } from 'react'
import TabButton from './TabButton'
import { AiFillHtml5 } from 'react-icons/ai'
import { BiLogoReact, BiLogoJavascript, BiLogoCss3, BiLogoFigma } from 'react-icons/bi'
import { TbBrandNextjs } from 'react-icons/tb'

const TAB_DATA = [
  {
    title: "skills",
    id: "skills",
    content: (
      <ul className='pl-2'>
        <li className='flex text-xl ml-2 '><BiLogoReact fill='white' /> React</li>
        <li className='flex text-xl ml-2 '><BiLogoJavascript fill='white' /> JavaScript</li>
        <li className='flex text-xl ml-2 '><AiFillHtml5 fill='white' /> HTML</li>
        <li className='flex text-xl ml-2 '><BiLogoCss3 fill='white' /> CSS</li>
        <li className='flex text-xl ml-2 '><BiLogoFigma fill='white' /> Figma</li>
        <li className='flex text-xl ml-2 '><TbBrandNextjs fill='black' /> NextJS</li>
      </ul>
    )
  },
  {
    title: "education",
    id: "education",
    content: (
      <ul className='list-disc pl-2'>
        <li>Análise e Desenvolvimento de sistemas, Fatec-Ourinhos</li>
      </ul>
    )
  },
  {
    title: "certifications",
    id: 'certifications',
    content: (
      <ul className='list-disc pl-2'>
        <li className='mb-1'>
          <span className='font-bold text-purple-500'>Formação Front-end - HTML, CSS, JavaScript, React</span> - Udemy
        </li>
        <li>
          <span className='font-bold text-purple-500'>Curso Html e css, Curso em vídeo </span>
          - Gustavo Guanabara
        </li>
        <li>
          <span className='font-bold text-purple-500'>Curso JavaScript, Curso em vídeo </span>
          - Gustavo Guanabara
        </li>
        <li>
          <span className='font-bold text-purple-500'>React do Zero a Maestria </span>
          - Udemy
        </li>
      </ul>
    )
  }
]

const AboutSection = () => {
  const [tab, setTab] = useState("skills")
  const [isPending, startTransition] = useTransition()

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id)
    })
  }
  return (
    <section className='text-white'>
      <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
        <Image src='/images/about-image.jpg' width={500} height={500} />
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
          <h2 className='text-4xl font-bold text-white mb-4'>Sobre Mim</h2>
          <p className='text-base md:text-lg'>🚀💻 Me chamo Gabriel Mello, sou formado em Análise e Desenvolvimento de Sistemas, e sou desenvolvedor front-end.Tenho experiência com JavaScript, React, Node.JS, Express, HTML, CSS, Git. Estou empolgado para superar as expectativas, abraçar novos desafios tecnológicos e continuar crescendo nesse mundo incrível que é o front-end! 🚀💻
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton selectTab={() => handleTabChange("skills")} active={tab === 'skills'}>
              {" "}Habilidades{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange("education")} active={tab === 'education'}>
              {" "}Educação{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange("certifications")} active={tab === 'certifications'}>
              {" "}Certificados{" "}
            </TabButton>
          </div>
          <div className='mt-8'>
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection