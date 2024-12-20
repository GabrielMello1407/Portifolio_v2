'use client';
import React, { useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import ProjectTag from './ProjectTag';
import { motion, useInView } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: 'Projeto Blog Semântico',
    description: 'Criação de um blog utilizando html e css com responsividade',
    image: '/images/projects/Blog_semantico.jpeg',
    tag: ['All', 'Básico', 'HTML', 'CSS'],
    gitUrl: 'https://github.com/GabrielMello1407/Blog-Sem-ntico',
    previewUrl: 'https://blog-semantico.vercel.app/',
  },
  {
    id: 2,
    title: 'Projeto Blog React',
    description: 'Criação de um blog utilizando React',
    image: '/images/projects/blog_react.jpeg',
    tag: ['All', 'HTML', 'CSS', 'React'],
    gitUrl: 'https://github.com/GabrielMello1407/Projeto-Blog-react',
    previewUrl: 'https://projeto-blog-react.vercel.app/',
  },
  {
    id: 3,
    title: 'Projeto Calculadora IMC',
    description: 'Criação de uma Calculadora de IMC em React',
    image: '/images/projects/calc_imc.jpeg',
    tag: ['All', 'Básico', 'HTML', 'CSS', 'JavaScript', 'React'],
    gitUrl: 'https://github.com/GabrielMello1407/Calculadora-de-IMC-React',
    previewUrl: 'https://calculadora-de-imc-react-phi.vercel.app/',
  },
  {
    id: 4,
    title: 'Projeto de Clone da página Iphone 13',
    description:
      'Criação clone da página do Iphone 13 para treinar HTML,CSS e responsividade',
    image: '/images/projects/clone_iphone13.jpeg',
    tag: ['All', 'Básico', 'HTML', 'CSS'],
    gitUrl: 'https://github.com/GabrielMello1407/Clone-iphone-page',
    previewUrl: 'https://clone-iphone-page.vercel.app/',
  },
  {
    id: 5,
    title: 'Projeto formulário multistep',
    description: 'Criação de um mini formulário com vários passos',
    image: '/images/projects/form_multistep.jpeg',
    tag: ['All', 'Básico', 'HTML', 'CSS', 'JavaScript'],
    gitUrl: 'https://github.com/GabrielMello1407/Form-MultiStep-React',
    previewUrl: 'https://form-multistep-six.vercel.app/',
  },
  {
    id: 6,
    title: 'Projeto Gerador de QRCode',
    description:
      'Criação de um gerador de QRCode realizando fetch com API para realizar a geração dos QRCode baseado no que o usuário digita',
    image: '/images/projects/geradorQRCode.jpeg',
    tag: ['All', 'HTML', 'CSS', 'JavaScript', 'API'],
    gitUrl: 'https://github.com/GabrielMello1407/Gerador-de-QR-Code',
    previewUrl: 'https://gerador-de-qr-code-wheat.vercel.app/',
  },
  {
    id: 7,
    title: 'Projeto Github Finder',
    description:
      'Criação de um sistema de buscar perfil com base o nome de usuário do github utilizando a api do github',
    image: '/images/projects/github_finder.jpeg',
    tag: ['All', 'HTML', 'CSS', 'React', 'API', 'TS'],
    gitUrl: 'https://github.com/GabrielMello1407/Project-github-Finder',
    previewUrl: 'https://github-finder-two-rouge.vercel.app/',
  },
  {
    id: 8,
    title: 'Projeto clone página login Instagram',
    description:
      'Criação clone da página de login do instagram com responsividade',
    image: '/images/projects/instagram_clone.jpeg',
    tag: ['All', 'Básico', 'HTML', 'CSS'],
    gitUrl: 'https://github.com/GabrielMello1407/Page-login-instagram-clone',
    previewUrl: 'https://page-login-instagram-clone.vercel.app/',
  },
  {
    id: 9,
    title: 'Projeto página LazyLoad',
    description:
      'Criação de uma página básica utilizando o método de lazy load para carregamento de imagens',
    image: '/images/projects/lazy_load.jpeg',
    tag: ['All', 'Básico', 'HTML', 'CSS', 'JavaScript'],
    gitUrl: 'https://github.com/GabrielMello1407/Projeto-lazy-load',
    previewUrl: 'https://projeto-lazy-load.vercel.app/',
  },
  {
    id: 10,
    title: 'Projeto Memories',
    description:
      'Criação de uma landing page onde é possivel registrar memórias com descrição podendo upar imagens e adicionar tags',
    image: '/images/projects/memories.jpeg',
    tag: ['All', 'HTML', 'CSS', 'React', 'Node', 'MongoDB', 'Axios'],
    gitUrl: 'https://github.com/GabrielMello1407/Projeto-Memories',
    previewUrl: 'https://projeto-memories.vercel.app/',
  },
  {
    id: 11,
    title: 'Projeto PartyTime',
    description: 'Criação um projeto de criação de festas',
    image: '/images/projects/partytime.jpeg',
    tag: ['All', 'HTML', 'CSS', 'React', 'Node', 'MongoDB', 'Axios'],
    gitUrl: 'https://github.com/GabrielMello1407/Projeto-Party-Time',
    previewUrl: 'https://projeto-party-time-lilac.vercel.app/',
  },
  {
    id: 12,
    title: 'Projeto do meu primeiro portilólio',
    description: 'Criação do meu primeiro portifólio responsivo',
    image: '/images/projects/portifolio_antigo.jpeg',
    tag: ['All', 'Básico', 'HTML', 'CSS'],
    gitUrl: 'https://github.com/GabrielMello1407/Portifolio-novo',
    previewUrl: 'https://portifolio-gabriel-mello.netlify.app/',
  },
  {
    id: 13,
    title: 'Projeto TodoList',
    description: 'Criação de uma lista de tarefas',
    image: '/images/projects/projetoTodoList.jpeg',
    tag: ['All', 'Básico', 'HTML', 'CSS'],
    gitUrl: 'https://github.com/GabrielMello1407/Projeto-todo-avancado',
    previewUrl: 'https://projeto-todo-avancado.vercel.app/',
  },
  {
    id: 14,
    title: 'Projeto Quiz',
    description: 'Criação de um Quiz utilizando react',
    image: '/images/projects/quizReact.jpeg',
    tag: ['All', 'Básico', 'HTML', 'CSS', 'React'],
    gitUrl: 'https://github.com/GabrielMello1407/ProjetoQuiz_React',
    previewUrl: 'https://projeto-quiz-react.vercel.app/',
  },
  {
    id: 15,
    title: 'Projeto Care4You (Em Develolvimento)',
    description:
      'Projeto Voluntário da SouJúnior de cadastro de clínicas e pacientes, atuo como desenvolvedor fullstack nesse projeto, utilizando as melhores tecnologias do mercado junto com um time incrível e proativo.',
    image: '/images/projects/projeto_care4you.png',
    tag: [
      'All',
      'Básico',
      'HTML',
      'CSS',
      'React',
      'NextJS',
      'TailwindCSS',
      'Typescript',
      'ShadCNUI',
    ],
    gitUrl: 'https://github.com/Care-4-you/AgendaSaude.web',
    previewUrl: 'https://agenda-saude-six.vercel.app/',
  },
  {
    id: 16,
    title: 'Projeto Hooks React',
    description:
      'Projeto feito em React Vite bem simples, feito com intuito de ensinar os hooks para a galera que está iniciando no mundo do React, feito de forma dinâmica e facil de entender.',
    image: '/images/projects/hooks.png',
    tag: ['All', 'Básico', 'HTML', 'CSS', 'React', 'Typescript'],
    gitUrl: 'https://github.com/GabrielMello1407/hooks_react',
    previewUrl: 'https://hooks-react-three.vercel.app/',
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag),
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        Meus Projetos
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === 'All'}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Básico"
          isSelected={tag === 'Básico'}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="React"
          isSelected={tag === 'React'}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tag}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
