/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from './types.ts';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Who coined the term 'sociology' and is widely regarded as the 'Father of Sociology'?",
    options: ["Karl Marx", "Auguste Comte", "Herbert Spencer", "Max Weber"],
    correctAnswer: "Auguste Comte",
    category: "Sociology",
    explanation: "Auguste Comte (1798–1857) coined the term 'sociology' and proposed positivism as the foundation of social science."
  },
  {
    id: 2,
    text: "What is the study of history in a geographically local context, concentrating on local communities?",
    options: ["Oral History", "National History", "Local History", "Ancestral History"],
    correctAnswer: "Local History",
    category: "Philippine History",
    explanation: "Local history focuses on a specific region or community, preserving stories and events often not covered in national narratives."
  },
  {
    id: 3,
    text: "The 'Sarimanok' is a legendary colorful bird that is a symbol of which Philippine people?",
    options: ["Tausug", "Maguindanao", "Maranao", "Yakan"],
    correctAnswer: "Maranao",
    category: "Indigenous Culture",
    explanation: "The Sarimanok is a legendary bird of the Maranao people of Mindanao, symbolizing good fortune and representing their rich artistic tradition."
  },
  {
    id: 4,
    text: "Who applied evolutionary theory to society and is known as the originator of 'Social Darwinism'?",
    options: ["Emile Durkheim", "Herbert Spencer", "Karl Marx", "Auguste Comte"],
    correctAnswer: "Herbert Spencer",
    category: "Sociology",
    explanation: "Herbert Spencer (1820–1903) coined the phrase 'survival of the fittest' and applied evolutionary concepts to social development."
  },
  {
    id: 5,
    text: "Which UNESCO World Heritage Site consists of four Philippine Baroque churches built during the Spanish colonial period?",
    options: ["Historic City of Vigan", "Baroque Churches of the Philippines", "Rice Terraces of the Philippine Cordilleras", "Tabon Cave Complex"],
    correctAnswer: "Baroque Churches of the Philippines",
    category: "Heritage Sites",
    explanation: "The Baroque Churches of the Philippines (declared in 1993) include churches in Metro Manila, Santa Maria, Paoay, and Miagao."
  },
  {
    id: 6,
    text: "What does 'Ethnocentrism' mean in sociology?",
    options: [
      "Viewing behavior from another culture's perspective",
      "Believing products of other cultures are superior",
      "Judging another culture based on one's own cultural standards",
      "Learning to adapt to a new culture"
    ],
    correctAnswer: "Judging another culture based on one's own cultural standards",
    category: "Sociology",
    explanation: "Ethnocentrism is the tendency to view one's own culture as superior and to use it as a standard to evaluate other cultures."
  },
  {
    id: 7,
    text: "Which ancient Philippine artifact depicts two souls on a voyage to the afterlife?",
    options: ["Bulul", "Hagabi", "Pabalat", "Manunggul Jar"],
    correctAnswer: "Manunggul Jar",
    category: "Indigenous Culture",
    explanation: "The Manunggul Jar (ca. 890–710 BC) is a secondary burial jar found in Palawan with a lid depicting two figures paddling to the afterlife."
  },
  {
    id: 8,
    text: "What sociological term refers to a status that generally overrides other statuses in determining a person's social identity?",
    options: ["Ascribed Status", "Master Status", "Achieved Status", "Status Set"],
    correctAnswer: "Master Status",
    category: "Sociology",
    explanation: "Master status is the most significant status a person holds — one that shapes all other aspects of their social identity and interactions."
  },
  {
    id: 9,
    text: "The 'Panagbenga Festival' held in Baguio City is also known as the:",
    options: ["Festival of Lights", "Season of Blooming", "Harvest of Colors", "Flower of the North"],
    correctAnswer: "Season of Blooming",
    category: "Festivals & Culture",
    explanation: "Panagbenga (meaning 'a season of blooming' in Kankanaey) is held every February in Baguio City to celebrate the flowering season."
  },
  {
    id: 10,
    text: "What is the deepest oceanic trench in the world?",
    options: ["Philippine Trench", "Java Trench", "Mariana Trench", "Tonga Trench"],
    correctAnswer: "Mariana Trench",
    category: "World Geography",
    explanation: "The Mariana Trench in the western Pacific Ocean reaches a maximum depth of about 11,034 meters at the Challenger Deep, making it the deepest point on Earth."
  },
  {
    id: 11,
    text: "Which sociologist introduced the concept of 'anomie' to describe a state of normlessness in society?",
    options: ["Max Weber", "Karl Marx", "Émile Durkheim", "Georg Simmel"],
    correctAnswer: "Émile Durkheim",
    category: "Sociology",
    explanation: "Émile Durkheim described 'anomie' as a social condition where the usual norms break down, leading to disorientation and social instability."
  },
  {
    id: 12,
    text: "The Katipunan, a secret revolutionary society against Spanish rule in the Philippines, was founded by:",
    options: ["José Rizal", "Emilio Aguinaldo", "Andres Bonifacio", "Antonio Luna"],
    correctAnswer: "Andres Bonifacio",
    category: "Philippine History",
    explanation: "Andres Bonifacio founded the Katipunan (KKK) in 1892. He is known as the 'Father of the Philippine Revolution.'"
  },
  {
    id: 13,
    text: "What is the term for the process by which people learn the norms, values, and behaviors of their society?",
    options: ["Acculturation", "Assimilation", "Socialization", "Enculturation"],
    correctAnswer: "Socialization",
    category: "Sociology",
    explanation: "Socialization is the lifelong process through which individuals learn and internalize the culture, norms, and values of their society."
  },
  {
    id: 14,
    text: "Which Philippine mountain is the highest peak in the country?",
    options: ["Mt. Apo", "Mt. Pulag", "Mt. Kanlaon", "Mt. Halcon"],
    correctAnswer: "Mt. Apo",
    category: "Philippine Geography",
    explanation: "Mt. Apo in Davao del Sur/Cotabato is the highest mountain in the Philippines at 2,954 meters above sea level."
  },
  {
    id: 15,
    text: "The 'EDSA People Power Revolution' of 1986 resulted in the ouster of which Philippine dictator?",
    options: ["Emilio Aguinaldo", "Manuel Roxas", "Ferdinand Marcos", "Joseph Estrada"],
    correctAnswer: "Ferdinand Marcos",
    category: "Philippine History",
    explanation: "The peaceful People Power Revolution in February 1986 ended the 21-year authoritarian rule of Ferdinand Marcos Sr. and restored democracy."
  }
];

export const QUIZ_CONFIG = {
  secondsPerQuestion: 30,
  quizTitle: "Historical & Social Science Quiz",
  subject: "Hist & Soc Sci",
  author: "Franck Somoza",
  version: "Module V  ·  Ver. 2.0"
};
