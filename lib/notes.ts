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
        detail: "EdX Online · lecture notes",
      },
      {
        title: "Neurosciences of Cognition and Perception",
        file: "lanza_ncpnotes.pdf",
        detail: "University of Genoa · lecture notes · Italian",
      },
      {
        title: "Political Philosophy",
        file: "lanza_politicalphil.pdf",
        detail: "University of Genoa · lecture notes · Italian",
      },
    ],
  },
  {
    title: "Robotics & Control",
    items: [
      {
        title: "System Theory",
        file: "grillolanza-systheory.pdf",
        detail: "University of Genoa · lecture notes · authored with Andrea Grillo",
      },
      {
        title: "Classical Control",
        file: "lanza_claco.pdf",
        detail: "École Centrale de Nantes · cheatsheet · handwritten",
      },
      {
        title: "Control Theory",
        file: "lanza_controltheory.pdf",
        detail: "University of Genoa · lecture notes · Italian",
      },
      {
        title: "Dynamic Model Based Control",
        file: "lanza_dybac.pdf",
        detail: "École Centrale de Nantes · cheatsheet · handwritten",
      },
      {
        title: "System Identification",
        file: "lanza_sysid.pdf",
        detail: "University of Genoa · lecture notes",
      },
      {
        title: "Ambient Intelligence",
        file: "lanza_ambint.pdf",
        detail: "École Centrale de Nantes · lecture notes",
      },
      {
        title: "Computer Vision",
        file: "lanza_covis.pdf",
        detail: "École Centrale de Nantes · lecture notes · draft",
      },
      {
        title: "Optimization Techniques",
        file: "lanza_optec.pdf",
        detail: "École Centrale de Nantes · lecture notes · handwritten ",
      },
      {
        title: "Mechanics of Mechanisms and Machines",
        file: "lanza_mmm_partial.pdf",
        detail: "University of Genoa · lecture notes · partial draft",
      },
      {
        title: "Introduction to ROS",
        file: "lanza_introros.pdf",
        detail: "École Centrale de Nantes · lecture notes",
      },
    ],
  },
  {
    title: "Artificial Intelligence",
    items: [
      {
        title: "Artificial Intelligence",
        file: "lanza_artin.pdf",
        detail: "École Centrale de Nantes · cheatsheet · handwritten c",
      },
      {
        title: "Machine Learning",
        file: "lanza_machlearn.pdf",
        detail: "University of Genoa · lecture notes",
      },
      {
        title: "Stanford CS 221 · Artificial Intelligence",
        file: "stanford_cs221_artin.pdf",
        detail: "Standford · cheatsheet · Author: Afshine and Shervine Amidi",
      },
      {
        title: "Stanford CS 229 · Machine Learning",
        file: "stanford_cs229_machlearn.pdf",
        detail: "Standford · cheatsheet · Author: Afshine and Shervine Amidi",
      },
      {
        title: "Stanford CS 230 · Deep Learning",
        file: "stanford_cs230_deeplearn.pdf",
        detail: "Standford · cheatsheet · Author: Afshine and Shervine Amidi",
      },
    ],
  },
  {
    title: "Signal Processing & IT",
    items: [
      {
        title: "Signal Processing",
        file: "lanza_sipro.pdf",
        detail: "École Centrale de Nantes · cheatsheet",
      },
      {
        title: "Signal Processing with MATLAB",
        file: "lanza_etsimatlab.pdf",
        detail: "University of Genoa · lecture notes · Italian",
      },
      {
        title: "Databases",
        file: "lanza_databases.pdf",
        detail: "University of Genoa · lecture notes · Italian",
      },
    ],
  },
];
