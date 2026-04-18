/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Trophy, ChevronRight, RefreshCcw, User, CheckCircle2, XCircle,
  BookOpen, Clock, Zap, Award, BarChart3, MapPin
} from 'lucide-react';
import { Question, QuizState, QuizResult, AnswerRecord } from './types.ts';
import { QUESTIONS, QUIZ_CONFIG } from './quizQuestions.ts';

/* ─── helpers ─────────────────────────────────────── */
const initials = (n: string) =>
  n.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

const getScoreClass = (pct: number) => {
  if (pct >= 80) return 'pct-excellent';
  if (pct >= 50) return 'pct-good';
  return 'pct-poor';
};

const getScoreMsg = (pct: number) => {
  if (pct >= 90) return 'Outstanding! 🎉';
  if (pct >= 80) return 'Excellent work!';
  if (pct >= 70) return 'Good job!';
  if (pct >= 50) return 'Keep practicing!';
  return 'Review the material!';
};

/* ─── Timer Ring ──────────────────────────────────── */
function TimerRing({ timeLeft, total }: { timeLeft: number; total: number }) {
  const R = 23;
  const circ = 2 * Math.PI * R;
  const offset = circ * (1 - timeLeft / total);
  const urgent = timeLeft <= 8;
  const color = urgent ? '#f43f5e' : '#00f2ff';

  return (
    <div className="timer-ring-wrap">
      <svg className="timer-svg" viewBox="0 0 58 58">
        <circle className="timer-track" cx="29" cy="29" r={R} />
        <circle
          className="timer-arc"
          cx="29" cy="29" r={R}
          stroke={color}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <span className="timer-label" style={{ color: urgent ? '#f43f5e' : undefined }}>
        {timeLeft}
      </span>
    </div>
  );
}

/* ─── Option Button ───────────────────────────────── */
interface OptionBtnProps {
  option: string;
  idx: number;
  selectedAnswer: string | null;
  correctAnswer: string;
  disabled: boolean;
  onClick: () => void;
}

function OptionBtn({ option, idx, selectedAnswer, correctAnswer, disabled, onClick }: OptionBtnProps) {
  const isSelected = selectedAnswer === option;
  const isCorrect = option === correctAnswer;
  const showResult = disabled && selectedAnswer !== null;

  let cls = 'option-btn';
  if (showResult) {
    if (isSelected && isCorrect) cls += ' correct';
    else if (isSelected) cls += ' incorrect';
    else if (isCorrect) cls += ' reveal-correct';
  }

  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      <span className="option-key">{String.fromCharCode(65 + idx)}</span>
      <span className="option-text">{option}</span>
    </button>
  );
}

/* ─── App ─────────────────────────────────────────── */
export default function App() {
  const [state, setState] = useState<QuizState>('ENTRY');
  const [name, setName] = useState('');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedAnswer, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<QuizResult | null>(null);
  const [timeLeft, setTimeLeft] = useState(QUIZ_CONFIG.secondsPerQuestion);
  const [animKey, setAnimKey] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentQ: Question = QUESTIONS[qIndex];
  const totalQuestions = QUESTIONS.length;
  const progress = (qIndex / totalQuestions) * 100;

  /* timer helpers */
  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  /* auto-advance on timeout */
  const handleTimeout = useCallback(() => {
    clearTimer();
    const rec: AnswerRecord = { questionId: currentQ.id, userAnswer: '(Timed Out)', isCorrect: false };
    setAnswers(prev => [...prev, rec]);
    setSelected('');
    setState('ANSWER_FEEDBACK');
  }, [clearTimer, currentQ]);

  /* start countdown */
  useEffect(() => {
    if (state !== 'QUIZ') return;
    setTimeLeft(QUIZ_CONFIG.secondsPerQuestion);
    setSelected(null);
    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(id); handleTimeout(); return 0; }
        return prev - 1;
      });
    }, 1000);
    timerRef.current = id;
    return () => clearInterval(id);
  }, [state, qIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── handlers ── */
  const handleStart = () => {
    if (!name.trim()) return;
    setAnswers([]);
    setQIndex(0);
    setAnimKey(k => k + 1);
    setStartTime(Date.now());
    setState('QUIZ');
  };

  const handleAnswer = (option: string) => {
    clearTimer();
    const isCorrect = option === currentQ.correctAnswer;
    const rec: AnswerRecord = { questionId: currentQ.id, userAnswer: option, isCorrect };
    setAnswers(prev => [...prev, rec]);
    setSelected(option);
    setState('ANSWER_FEEDBACK');
  };

  const handleNext = () => {
    if (qIndex < totalQuestions - 1) {
      setQIndex(q => q + 1);
      setAnimKey(k => k + 1);
      setState('QUIZ');
    } else {
      // build final results from state snapshot
      setAnswers(prev => {
        const score = prev.filter(a => a.isCorrect).length;
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        const finalRes: QuizResult = {
          userName: name, score, totalQuestions, answers: prev, timeTaken
        };
        setResults(finalRes);
        setState('RESULTS');
        return prev;
      });
    }
  };

  const restart = () => {
    clearTimer();
    setName(''); setQIndex(0); setAnswers([]); setSelected(null); setResults(null);
    setState('ENTRY');
  };

  /* ── render ── */
  return (
    <div className="app-bg">
      <main className="quiz-card">

        {/* Progress bar */}
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* ── ENTRY ── */}
        {state === 'ENTRY' && (
          <div className="entry-screen anim-fade-up" key="entry">
            <div>
              <span className="entry-badge">
                <BookOpen size={12} /> Module Assessment
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <h1 className="entry-title">
                Historical &amp; <br />
                <span>Social Science</span>
              </h1>
              <p className="entry-subtitle">
                Test your knowledge on Local History, Cultural Heritage,
                Philippine Geography, and Sociology fundamentals.
              </p>
            </div>

            <div className="entry-meta">
              <div className="meta-chip"><Zap size={14} /> {totalQuestions} Questions</div>
              <div className="meta-chip"><Clock size={14} /> {QUIZ_CONFIG.secondsPerQuestion}s per question</div>
              <div className="meta-chip"><MapPin size={14} /> Multiple topics</div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  id="player-name"
                  type="text"
                  className="name-input"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleStart()}
                  autoFocus
                />
                <User className="input-icon" size={18} />
              </div>
              <button
                id="start-btn"
                className="btn-primary"
                onClick={handleStart}
                disabled={!name.trim()}
              >
                Begin Assessment <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {state === 'QUIZ' && (
          <div className="quiz-screen" key={`quiz-${animKey}`}>

            {/* header */}
            <div className="quiz-header anim-fade-in">
              <div className="player-chip">
                <div className="player-avatar">{initials(name)}</div>
                <span className="player-name">{name}</span>
              </div>
              <div className="quiz-stats">
                <div className="q-counter">
                  <div className="q-counter-label">Question</div>
                  <div className="q-counter-value">
                    {qIndex + 1}<span> / {totalQuestions}</span>
                  </div>
                </div>
                <TimerRing timeLeft={timeLeft} total={QUIZ_CONFIG.secondsPerQuestion} />
              </div>
            </div>

            {/* question body */}
            <div
              className="anim-slide-r"
              style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.75rem', justifyContent: 'center' }}
            >
              <div>
                <div className="category-tag">{currentQ.category}</div>
                <h2 className="question-text">{currentQ.text}</h2>
              </div>

              <div className="options-grid">
                {currentQ.options.map((opt, idx) => (
                  <OptionBtn
                    key={opt}
                    option={opt}
                    idx={idx}
                    selectedAnswer={selectedAnswer}
                    correctAnswer={currentQ.correctAnswer}
                    disabled={selectedAnswer !== null}
                    onClick={() => handleAnswer(opt)}
                  />
                ))}
              </div>
            </div>

            {/* footer */}
            <div className="quiz-footer">
              <div className="footer-stat">
                <span className="footer-stat-label">Progress</span>
                <span className="footer-stat-value">{Math.round(progress)}%</span>
              </div>
              <div className="footer-divider" />
              <div className="footer-stat">
                <span className="footer-stat-label">Correct</span>
                <span className="footer-stat-value">{answers.filter(a => a.isCorrect).length}</span>
              </div>
              <div className="footer-timer-bar">
                <div
                  className="footer-timer-fill"
                  style={{
                    width: `${(timeLeft / QUIZ_CONFIG.secondsPerQuestion) * 100}%`,
                    background: timeLeft <= 8 ? '#f43f5e' : '#00f2ff'
                  }}
                />
              </div>
              <span className="footer-label">{QUIZ_CONFIG.subject}</span>
            </div>
          </div>
        )}

        {/* ── ANSWER FEEDBACK ── */}
        {state === 'ANSWER_FEEDBACK' && (() => {
          const last = answers[answers.length - 1];
          const isCorrect = last?.isCorrect;
          const timedOut = last?.userAnswer === '(Timed Out)';
          return (
            <div className="feedback-screen" key="feedback">
              <div className={`feedback-icon anim-pop-in ${isCorrect ? 'correct-icon' : 'incorrect-icon'}`}>
                {isCorrect ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
              </div>

              <div className="anim-fade-up delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
                <p className="feedback-title" style={{ color: isCorrect ? 'var(--green)' : 'var(--rose)' }}>
                  {timedOut ? "Time's Up!" : isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                {!isCorrect && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Correct answer:{' '}
                    <strong style={{ color: 'var(--accent)' }}>{currentQ.correctAnswer}</strong>
                  </p>
                )}
              </div>

              {currentQ.explanation && (
                <div className="feedback-explanation anim-fade-up delay-2">
                  <strong>💡 Did you know?</strong>
                  {currentQ.explanation}
                </div>
              )}

              <button id="next-btn" className="btn-next anim-fade-up delay-3" onClick={handleNext}>
                {qIndex < totalQuestions - 1
                  ? (<>Next Question <ChevronRight size={18} /></>)
                  : (<>View Results <Award size={18} /></>)
                }
              </button>

              <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>
                Question {qIndex + 1} of {totalQuestions}
              </p>
            </div>
          );
        })()}

        {/* ── RESULTS ── */}
        {state === 'RESULTS' && results && (
          <div className="results-screen anim-fade-in" key="results">
            <div className="results-grid">

              {/* Score card */}
              <div className="score-card">
                <div className="trophy-ring anim-pop-in">
                  <Trophy size={34} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
                  <div className="score-display">
                    <span className="score-number">{results.score}</span>
                    <span className="score-denom">/{results.totalQuestions}</span>
                  </div>
                  <span className={`score-pct ${getScoreClass(Math.round((results.score / results.totalQuestions) * 100))}`}>
                    {Math.round((results.score / results.totalQuestions) * 100)}%
                    {' — '}
                    {getScoreMsg(Math.round((results.score / results.totalQuestions) * 100))}
                  </span>
                </div>

                <div>
                  <p className="score-name">{results.userName}</p>
                  {results.timeTaken !== undefined && (
                    <p className="score-sub">Completed in {results.timeTaken}s</p>
                  )}
                </div>

                <button id="retake-btn" className="btn-retake" onClick={restart}>
                  <RefreshCcw size={16} /> Retake Quiz
                </button>
              </div>

              {/* Review panel */}
              <div className="review-panel">
                <p className="review-label">
                  <BarChart3 size={12} style={{ display: 'inline', marginRight: '0.4rem' }} />
                  Performance Review
                </p>
                <div className="review-list">
                  {QUESTIONS.map((q, idx) => {
                    const rec = results.answers.find(a => a.questionId === q.id);
                    const correct = rec?.isCorrect ?? false;
                    const userAns = rec?.userAnswer ?? '—';
                    return (
                      <div key={q.id} className="review-item">
                        {correct
                          ? <CheckCircle2 className="review-icon ok" size={20} />
                          : <XCircle className="review-icon bad" size={20} />
                        }
                        <div>
                          <p className="review-q">{idx + 1}. {q.text}</p>
                          <div className="review-answers">
                            <span className={`review-your ${correct ? 'right' : 'wrong'}`}>
                              You: {userAns}
                            </span>
                            {!correct && (
                              <span className="review-correct-answer">✓ {q.correctAnswer}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="results-footer">
              <div className="rf-left">
                <div className="rf-item">
                  <span className="rf-label">Student</span>
                  <span className="rf-value accent">{results.userName}</span>
                </div>
                <div className="rf-item">
                  <span className="rf-label">Author</span>
                  <span className="rf-value">{QUIZ_CONFIG.author}</span>
                </div>
              </div>
              <div className="rf-right">
                <div className="rf-item" style={{ textAlign: 'right' }}>
                  <span className="rf-label">Assessment</span>
                  <span className="rf-value">{QUIZ_CONFIG.version}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
