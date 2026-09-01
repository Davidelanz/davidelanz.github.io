export type NoteGroup = {
  title: string;
  items: { title: string; file: string; detail?: string }[];
};

export const noteGroups: NoteGroup[] = [
  {
    title: "Art & Philosophy",
    items: [
      {
        title: "Art and Design in the Digital Age",
        file: "lanza_edxdigitalart.pdf",
        detail: "EdX · lecture notes",
      },
      {
        title: "Neurosciences of Cognition and Perception",
        file: "lanza_ncpnotes.pdf",
        detail: "Italian",
      },
      { title: "Political Philosophy", file: "lanza_politicalphil.pdf", detail: "Italian" },
    ],
  },
  {
    title: "Robotics & Control",
    items: [
      {
        title: "System Theory",
        file: "grillolanza-systheory.pdf",
        detail: "University of Genoa · with Andrea Grillo",
      },
      {
        title: "Classical Control",
        file: "lanza_claco.pdf",
        detail: "ECN · handwritten cheatsheet",
      },
      {
        title: "Control Theory",
        file: "lanza_controltheory.pdf",
        detail: "University of Genoa · Italian",
      },
      {
        title: "Dynamic Model Based Control",
        file: "lanza_dybac.pdf",
        detail: "ECN · handwritten cheatsheet",
      },
      {
        title: "System Identification",
        file: "lanza_sysid.pdf",
        detail: "University of Genoa · lecture notes",
      },
      { title: "Ambient Intelligence", file: "lanza_ambint.pdf", detail: "ECN · lecture notes" },
      { title: "Computer Vision", file: "lanza_covis.pdf", detail: "ECN · draft lecture notes" },
      {
        title: "Optimization Techniques",
        file: "lanza_optec.pdf",
        detail: "ECN · handwritten notes",
      },
      {
        title: "Mechanics of Mechanisms and Machines",
        file: "lanza_mmm_partial.pdf",
        detail: "University of Genoa · partial draft",
      },
      {
        title: "Introduction to ROS",
        file: "lanza_introros.pdf",
        detail: "ECN · software architectures",
      },
    ],
  },
  {
    title: "Artificial Intelligence",
    items: [
      {
        title: "Artificial Intelligence",
        file: "lanza_artin.pdf",
        detail: "ECN · handwritten cheatsheet",
      },
      {
        title: "Machine Learning",
        file: "lanza_machlearn.pdf",
        detail: "University of Genoa · lecture notes",
      },
      {
        title: "Artificial Intelligence CS 221",
        file: "artin_stanford.pdf",
        detail: "Stanford cheatsheet · Afshine and Shervine Amidi",
      },
      {
        title: "Machine Learning CS 229",
        file: "machlearn_stanford.pdf",
        detail: "Stanford cheatsheet · Afshine and Shervine Amidi",
      },
      {
        title: "Deep Learning CS 230",
        file: "deeplearn_stanford.pdf",
        detail: "Stanford cheatsheet · Afshine and Shervine Amidi",
      },
      { title: "TensorFlow 2.0", file: "tensorflow2_aicheatsheets.pdf", detail: "AI Cheatsheets" },
      {
        title: "Neural Networks Chart",
        file: "neuralnetworks_asimov.pdf",
        detail: "Asimov Institute",
      },
      { title: "Keras", file: "keras_rstudio.pdf", detail: "RStudio cheatsheet" },
    ],
  },
  {
    title: "Signal Processing & IT",
    items: [
      { title: "Signal Processing", file: "lanza_sipro.pdf", detail: "ECN · cheatsheet" },
      {
        title: "Signal Processing with MATLAB",
        file: "lanza_etsimatlab.pdf",
        detail: "University of Genoa · Italian",
      },
      { title: "Databases", file: "lanza_databases.pdf", detail: "University of Genoa · Italian" },
    ],
  },
];
