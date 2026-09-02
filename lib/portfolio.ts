export const projects = [
  {
    name: "Quantum-like Cognitive Architectures for Robotics",
    stack: "Python · Quantum Computing",
    description:
      "Quantum-theory formalism applied to robot perception modelling, inspired by quantum cognition research.",
    href: "http://www.quantum-robot.org",
  },
  {
    name: "EIKON Project's Design Library",
    stack: "Branding · Design Library",
    description:
      "Brand identity guide and component library defining EIKON's visual language and digital building blocks.",
    href: "https://www.eikonproject.org/design/",
  },
  {
    name: "Implementing Verbal Interaction Features in PILLO Robot",
    stack: "Python · REST APIs",
    description:
      "RESTful bridge connecting the CARESSES cloud and Pillo web APIs through the full conversation flow.",
  },
  {
    name: "Robot Design for Soccer Match",
    stack: "ROS · C++ · Python",
    description:
      "Raspberry Pi and Arduino robot with ROS modules for perception, visual servoing and task planning.",
    href: "https://github.com/Davidelanz/soccer-match-robot",
  },
  // {
  //   name: "End-to-End Neural Navigation",
  //   stack: "TensorFlow · Python",
  //   description: "End-to-end deep neural network for reactive autonomous-vehicle navigation.",
  //   href: "https://github.com/quan-dao/ECN-E2E",
  // },
  {
    name: "Context-Dependent Meanings Recognition in Human-Robot Interaction",
    stack: "Python · DialogFlow",
    description:
      "NLP model representing context and implied meaning in human-robot interaction, inspired by H. P. Grice's language theory.",
    href: "https://davidelanz.github.io/nlp-contextual-meaning/",
  },
];

export const experience = [
  {
    period: "Jan 2024 — now",
    role: "Senior Software Developer",
    org: "Evotec",
    detail:
      "Developed backend R packages and data pipelines for scientific computing, production Shiny applications, and reusable cross-platform UI components.",
  },
  {
    period: "Jan 2022 — Jan 2024",
    role: "Software Developer",
    org: "Evotec",
    previousAtSameOrg: true,
    detail:
      "Developed pipelines for scientific data access, transformation, and validation; maintained Docker infrastructure for API services and Shiny applications.",
  },
  {
    period: "Nov 2021 — Jan 2022",
    role: "Junior Software Developer",
    org: "Evotec",
    previousAtSameOrg: true,
    detail:
      "Designed PostgreSQL schemas and backend data workflows; developed Python REST APIs for application data access.",
  },
  {
    period: "Oct 2020 — Sep 2021",
    role: "ML Engineer",
    org: "Kellify",
    detail:
      "Developed AI systems for visual art analysis and valuation: art market databases, Python training pipelines, model APIs, and data-visualisation prototypes.",
  },
  {
    period: "Aug 2017 — now",
    role: "Co-Founder",
    org: "EIKON Project",
    detail:
      "Co-founded a platform for emerging photographers and digital artists; led the association, exhibitions, editorial programme, brand, website, and volunteer coordination.",
  },
];

export const education: typeof experience = [
  {
    period: "2025 — current",
    role: "Bachelor of Fine Arts",
    org: "University of Fine Arts Hamburg (HFBK)",
    detail: "Specialization in Graphic Art / Photography",
  },
  {
    period: "2018 — 2020",
    role: "European Master of Advanced Robotics",
    org: "École Centrale de Nantes · University of Genoa",
    detail: "Double degree in robotics, final grade: 100/100. Additional coursework in aesthetics and cultural anthropology.",
  },
  {
    period: "2015 — 2018",
    role: "BSc in Electronic Engineering and IT",
    org: "University of Genoa",
    detail: "Final grade: 110/110 cum laude. Additional coursework in quantum mechanics, philosophy of mind, cognitive science, political philosophy, and theoretical philosophy.",
  },
  {
    period: "2015 — 2020",
    role: "Science and Technology for IT",
    org: "IANUA Institute for Higher Studies",
    detail: "Multidisciplinary programme for students ranked in the top 10%.",
  },
];

export const publications = [
  {
    title: "Multi-sensory Integration in a Quantum-Like Robot Perception Model",
    authors: "Davide Lanza, Paolo Solinas, Fulvio Mastrogiovanni",
    venue: "Experimental Robotics · ISER 2020 · Springer, 2021",
    href: "https://doi.org/10.1007/978-3-030-71151-1_44",
  },
  {
    title: "Cloud Services for Culture Aware Conversation",
    authors: "Carmine Recchiuto et al.",
    venue: "17th International Conference on Ubiquitous Robots, 2020",
    href: "https://doi.org/10.1109/UR49135.2020.9144750",
  },
  {
    title: "Abductive Recognition of Context-dependent Utterances in Human-robot Interaction",
    authors: "Davide Lanza, Roberto Menicatti, Antonio Sgorbissa",
    venue: "IEEE/RSJ International Conference on Intelligent Robots and Systems, 2020",
    href: "https://doi.org/10.1109/IROS45743.2020.9341155",
  },
  {
    title: "End-to-End Deep Neural Network Design for Short-term Path Planning",
    authors: "Minh Quan Dao, Davide Lanza, Vincent Frémont",
    venue: "IROS Workshop on Planning, Perception and Navigation for Intelligent Vehicles, 2019",
    href: "https://hal.science/hal-02266802",
  },
];
