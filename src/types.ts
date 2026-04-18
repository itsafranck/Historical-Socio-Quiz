/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  category: string;
  explanation?: string;
}

export type QuizState = 'ENTRY' | 'QUIZ' | 'ANSWER_FEEDBACK' | 'RESULTS';

export interface AnswerRecord {
  questionId: number;
  userAnswer: string;
  isCorrect: boolean;
}

export interface QuizResult {
  userName: string;
  score: number;
  totalQuestions: number;
  answers: AnswerRecord[];
  timeTaken?: number;
}
