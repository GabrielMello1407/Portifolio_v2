/**
 * Dicionário de strings da interface (pt-BR / en).
 * Conteúdo baseado no currículo oficial de Gabriel Mello.
 * Dados de projetos vivem em src/data/projects.js (campos bilíngues).
 */
import type { Lang } from '@/types';

export const dictionary = {
  pt: {
    nav: {
      home: 'Início',
      work: 'Projetos',
      journey: 'Trajetória',
      about: 'Sobre',
      contact: 'Contato',
      resume: 'Currículo',
      menu: 'Menu',
    },
    hero: {
      available: 'Aberto a oportunidades remotas, híbridas e presenciais',
      greeting: 'Olá, eu sou',
      name: 'Gabriel Mello',
      roles: [
        'Engenheiro de Software',
        'Integração com IA · LLMs',
        'Full-Stack · Next.js & Node',
        'Criador do FlunexApp',
      ],
      lead: 'Engenheiro de software com 3+ anos de experiência em JavaScript/TypeScript, React, Next.js e Node. Atuo na interseção entre engenharia full-stack e IA aplicada — construindo sistemas onde features baseadas em LLM precisam funcionar de verdade em produção.',
      tagline: '3+ anos JS/TS · React · Next.js · Node · LLM em produção',
      ctaWork: 'Ver projetos',
      ctaResume: 'Baixar currículo',
      scroll: 'role para explorar',
      basedIn: 'Jacarezinho, PR — Brasil',
    },
    strengths: {
      title: 'O que faço melhor',
      items: [
        {
          title: 'Engenharia full-stack',
          text: 'React, Next.js e TypeScript no frontend; Node.js (Express) e Python (Django) no backend.',
        },
        {
          title: 'Integração de agentes de IA',
          text: 'Prompting, pipelines RAG e loops de validação que mantêm features de LLM confiáveis em produção.',
        },
        {
          title: 'Arquitetura de backend',
          text: 'APIs REST, multi-tenancy, modelagem de banco (PostgreSQL), autenticação e observabilidade.',
        },
        {
          title: 'Onboarding em bases desconhecidas',
          text: 'CMSs legados, plataformas governamentais e camadas de integração: mapear rápido e entregar com segurança.',
        },
        {
          title: 'Tradução de requisitos',
          text: 'Levantamento direto com stakeholders não-técnicos (jurídico, financeiro, setor público) e conversão em solução técnica.',
        },
      ],
    },
    featured: {
      eyebrow: 'Projeto em destaque',
      heading: 'O produto que define meu trabalho',
      visit: 'Visitar flunexapp.com',
      caseStudy: 'Estudo de caso',
      builtWith: 'Construído com',
    },
    projects: {
      eyebrow: 'Trabalhos selecionados',
      heading: 'Projetos de peso',
      lead: 'SaaS próprio, ferramentas institucionais com IA e integrações de sistemas — em produção, na frente de usuários reais.',
      live: 'Ver ao vivo',
      code: 'Código',
      private: 'Privado',
      noLinks: 'Produto proprietário',
      details: 'Ver detalhes',
      overviewTitle: 'Visão geral',
      featuresTitle: 'Destaques técnicos',
      architectureTitle: 'Arquitetura',
      stackTitle: 'Stack',
      galleryTitle: 'Capturas de tela',
      galleryEmpty: 'Capturas em breve.',
      close: 'Fechar',
      status: {
        production: 'Em produção',
        development: 'Em desenvolvimento',
        volunteer: 'Voluntário',
      },
    },
    about: {
      eyebrow: 'Sobre mim',
      heading: 'Engenharia de produto, ponta a ponta',
      bio1: 'Sou o Gabriel, engenheiro de software com mais de 3 anos de experiência profissional em JavaScript/TypeScript, React, Next.js e Node.js. Entrego meu melhor trabalho quando o problema é aberto: requisitos ambíguos, bases de código sem documentação e integrações entre sistemas que nunca foram pensados para se comunicar.',
      bio2: 'Sou chamado para mapear o cenário, definir a arquitetura, entregar a solução e mantê-la rodando. Mantenho um SaaS próprio em produção (FlunexApp), construo ferramentas institucionais com IA na UENP e contribuo com projetos voluntários paralelamente.',
      tabs: { skills: 'Habilidades', experience: 'Experiência', education: 'Formação' },
      stackTitle: 'Ferramentas do dia a dia',
      experienceItems: [
        {
          period: 'Fev 2025 — Presente',
          title: 'Developer Analyst — UENP',
          place: 'Universidade Estadual do Norte do Paraná · Jacarezinho, PR · Híbrido',
          text: 'Responsável pelo ecossistema digital da universidade, atuando de forma independente em projetos que afetam todos os campi: ferramentas com IA, substituição de CMS legado, integrações entre sistemas e decisões de arquitetura.',
        },
        {
          period: '2026 — Presente',
          title: 'Founder & Lead Engineer — FlunexApp',
          place: 'Projeto independente · Remoto',
          text: 'Arquitetei e construí um SaaS multi-tenant do zero. Responsável pelo ciclo completo: arquitetura, desenvolvimento, infraestrutura, billing e operação contínua.',
        },
        {
          period: 'Nov 2023 — Presente',
          title: 'Volunteer Front-End Developer — SouJunior Labs',
          place: 'Care4You · Remoto',
          text: 'Trabalho colaborativo de frontend em ambiente próximo de produção, junto com designers e equipe de back-end.',
        },
      ],
      educationTitle: 'Formação',
      education: [
        {
          title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
          place: 'FATEC Ourinhos',
          period: 'Fev 2019 — Ago 2022',
        },
        {
          title: 'Extensão em Ciência da Computação',
          place: 'Universidade Estadual do Norte do Paraná (UENP)',
          period: '',
        },
      ],
      certsTitle: 'Certificações',
      certs: [
        'AWS Educate: Cloud 101 · Security · Networking · Databases · Compute & Storage — 2025',
        'NLW Journey — React Native · Rocketseat — 2024',
        'React do Zero à Maestria + Next.js + Redux · Udemy/Origamid — 2023–24',
        'Formação Front-End: HTML, CSS, JS, React+ · Udemy — 2023',
        'OutSystems Training · Tata Consultancy Services — 2023',
      ],
      languagesTitle: 'Idiomas',
      languages: [
        { label: 'Português', level: 'Nativo / Fluente' },
        { label: 'Inglês', level: 'Leitura e escrita técnica fluente · Conversação básica' },
      ],
    },
    skills: {
      frontend: 'Frontend',
      backend: 'Backend',
      data: 'Bancos & Cache',
      ai: 'IA / LLMs',
      cloud: 'Cloud / DevOps',
      quality: 'Qualidade',
      mobile: 'Mobile',
    },
    journey: {
      eyebrow: 'Trajetória',
      heading: 'Do primeiro commit ao deploy',
      lead: 'Como cheguei até aqui — e os sistemas que construí pelo caminho.',
    },
    contact: {
      eyebrow: 'Contato',
      heading: 'Vamos construir algo juntos',
      lead: 'Aberto a oportunidades remotas, híbridas e presenciais. Me mande uma mensagem — respondo rápido.',
      email: 'Seu email',
      subject: 'Assunto',
      message: 'Mensagem',
      emailPh: 'voce@email.com',
      subjectPh: 'Sobre o que vamos falar?',
      messagePh: 'Conte um pouco sobre a ideia...',
      send: 'Enviar mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada! Retorno em breve.',
      error: 'Algo deu errado. Tente novamente ou me chame no email.',
      orReach: 'ou me encontre em',
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      builtWith: 'Projetado e codado do zero, do conceito ao deploy.',
      backToTop: 'Voltar ao topo',
    },
  },

  en: {
    nav: {
      home: 'Home',
      work: 'Work',
      journey: 'Journey',
      about: 'About',
      contact: 'Contact',
      resume: 'Resume',
      menu: 'Menu',
    },
    hero: {
      available: 'Open to remote, hybrid and on-site opportunities',
      greeting: "Hi, I'm",
      name: 'Gabriel Mello',
      roles: [
        'Software Engineer',
        'AI Integration · LLMs',
        'Full-Stack · Next.js & Node',
        'Creator of FlunexApp',
      ],
      lead: 'Software Engineer with 3+ years of professional experience across JavaScript/TypeScript, React, Next.js and Node. I work at the intersection of full-stack engineering and applied AI — building systems where LLM-powered features have to actually work in production.',
      tagline: '3+ yrs JS/TS · React · Next.js · Node · Production LLM integration',
      ctaWork: 'View projects',
      ctaResume: 'Download resume',
      scroll: 'scroll to explore',
      basedIn: 'Jacarezinho, PR — Brazil',
    },
    strengths: {
      title: 'What I do best',
      items: [
        {
          title: 'Full-stack engineering',
          text: 'React, Next.js and TypeScript on the frontend; Node.js (Express) and Python (Django) on the backend.',
        },
        {
          title: 'AI agent integration',
          text: 'Prompting strategies, RAG pipelines and validation loops that keep LLM features reliable in production.',
        },
        {
          title: 'Backend architecture',
          text: 'REST APIs, multi-tenancy, database modeling (PostgreSQL), authentication and observability.',
        },
        {
          title: 'Onboarding into unfamiliar codebases',
          text: 'Legacy CMSs, government platforms and integration layers: map them fast and ship changes safely.',
        },
        {
          title: 'Translating requirements',
          text: 'Gathering needs directly with non-technical stakeholders (legal, finance, public sector) and turning them into concrete solutions.',
        },
      ],
    },
    featured: {
      eyebrow: 'Featured project',
      heading: 'The product that defines my work',
      visit: 'Visit flunexapp.com',
      caseStudy: 'Case study',
      builtWith: 'Built with',
    },
    projects: {
      eyebrow: 'Selected work',
      heading: 'Projects that matter',
      lead: 'My own SaaS, institutional AI tooling and system integrations — in production, in front of real users.',
      live: 'Live demo',
      code: 'Code',
      private: 'Private',
      noLinks: 'Proprietary product',
      details: 'View details',
      overviewTitle: 'Overview',
      featuresTitle: 'Technical highlights',
      architectureTitle: 'Architecture',
      stackTitle: 'Stack',
      galleryTitle: 'Screenshots',
      galleryEmpty: 'Screenshots coming soon.',
      close: 'Close',
      status: {
        production: 'In production',
        development: 'In development',
        volunteer: 'Volunteer',
      },
    },
    about: {
      eyebrow: 'About me',
      heading: 'Product engineering, end to end',
      bio1: "I'm Gabriel, a Software Engineer with 3+ years of professional experience across JavaScript/TypeScript, React, Next.js and Node.js. I do my best work when the problem is open-ended: ambiguous requirements, undocumented codebases and integrations between systems that were never meant to talk to each other.",
      bio2: 'I get pulled in to map the situation, define the architecture, ship the solution and keep it running. I run my own SaaS in production (FlunexApp), build institutional AI tooling at UENP and contribute to volunteer projects on the side.',
      tabs: { skills: 'Skills', experience: 'Experience', education: 'Education' },
      stackTitle: 'Everyday tooling',
      experienceItems: [
        {
          period: 'Feb 2025 — Present',
          title: 'Developer Analyst — UENP',
          place: 'State University of Northern Paraná · Jacarezinho, PR · Hybrid',
          text: "Responsible for the university's digital ecosystem, working independently on projects that affect every campus: AI-powered tools, legacy CMS replacement, system integrations and architecture decisions.",
        },
        {
          period: '2026 — Present',
          title: 'Founder & Lead Engineer — FlunexApp',
          place: 'Independent product · Remote',
          text: 'Architected and built a multi-tenant SaaS from scratch. Own the full lifecycle: architecture, development, infrastructure, billing and ongoing operation.',
        },
        {
          period: 'Nov 2023 — Present',
          title: 'Volunteer Front-End Developer — SouJunior Labs',
          place: 'Care4You · Remote',
          text: 'Collaborative frontend work in a production-like environment alongside designers and a back-end team.',
        },
      ],
      educationTitle: 'Education',
      education: [
        {
          title: 'Associate Degree in Systems Analysis and Development',
          place: 'FATEC Ourinhos',
          period: 'Feb 2019 — Aug 2022',
        },
        {
          title: 'Extension Program in Computer Science',
          place: 'State University of Northern Paraná (UENP)',
          period: '',
        },
      ],
      certsTitle: 'Certifications',
      certs: [
        'AWS Educate: Cloud 101 · Security · Networking · Databases · Compute & Storage — 2025',
        'NLW Journey — React Native · Rocketseat — 2024',
        'React Zero to Mastery + Next.js + Redux · Udemy/Origamid — 2023–24',
        'Front-End Bootcamp: HTML, CSS, JS, React+ · Udemy — 2023',
        'OutSystems Training · Tata Consultancy Services — 2023',
      ],
      languagesTitle: 'Languages',
      languages: [
        { label: 'Portuguese', level: 'Native / Fluent' },
        { label: 'English', level: 'Fluent technical reading & writing · Basic conversation' },
      ],
    },
    skills: {
      frontend: 'Frontend',
      backend: 'Backend',
      data: 'Databases & Cache',
      ai: 'AI / LLMs',
      cloud: 'Cloud / DevOps',
      quality: 'Quality',
      mobile: 'Mobile',
    },
    journey: {
      eyebrow: 'Journey',
      heading: 'From first commit to deploy',
      lead: 'How I got here — and the systems I built along the way.',
    },
    contact: {
      eyebrow: 'Contact',
      heading: "Let's build something together",
      lead: "Open to remote, hybrid and on-site opportunities. Drop me a message — I reply fast.",
      email: 'Your email',
      subject: 'Subject',
      message: 'Message',
      emailPh: 'you@email.com',
      subjectPh: 'What should we talk about?',
      messagePh: 'Tell me a bit about the idea...',
      send: 'Send message',
      sending: 'Sending...',
      success: "Message sent! I'll get back to you soon.",
      error: 'Something went wrong. Try again or reach me by email.',
      orReach: 'or find me on',
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Designed and coded from scratch, from concept to deploy.',
      backToTop: 'Back to top',
    },
  },
};

/** Tipo derivado do dicionário (estrutura de uma língua). */
export type Dict = (typeof dictionary)['pt'];

/** Currículos por idioma (arquivos em /public). */
export const resumeByLang: Record<Lang, string> = {
  pt: '/Gabriel_Mello_Portfolio_PT-BR.pdf',
  en: '/Gabriel_Mello_Portfolio_EN.pdf',
};
