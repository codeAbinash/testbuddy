export interface Result {
  totalQuestions?: number
  correctAnswers?: number
  attemptedQuestions?: number
  markedQuestions?: number
  visitedQuestions?: number
  percentageCorrect?: number
  totalPositiveMarks?: number
  totalNegativeMarks?: number
  marks?: number
  scorecard?: Scorecard[]
  difficultyAnalysis?: DifficultyAnalysis[]
  timeSpentAnalysis?: TimeSpentAnalysis
  questionWiseAnalysis?: QuestionWiseAnalysis[]
  toppersScoresTable?: ToppersScoreTable[]
  subjectWiseAnalysis?: SubjectWiseAnalysis[]
  performanceTimeMetrics?: PerformanceTimeMetrics[]
}

type PerformanceTimeMetrics = {
  resultAfterSeconds: number
  totalScore: number
  questionsAttempts: number
  correctAnswers: number
  incorrectAnswers: number
  accuracy: number
  averageTimePerQuestion: number
  _id: string
}

type SubjectWiseAnalysis = {
  subject: string
  averageMarks: number
  toppersMarks: number
  marks: number
  _id: string
}

type ToppersScoreTable = {
  rank: number
  name: string
  score: number
  _id: string
}

export interface DifficultyAnalysis {
  subject?: string
  levels?: {
    level?: 'easy' | 'medium' | 'hard'
    questions?: {
      questionId?: string
      qNumber?: number
      status?: 'correct' | 'skipped' | 'incorrect'
    }[]
  }[]
}

export interface Scorecard {
  sectionName?: string
  totalQuestions?: number
  correct?: number
  incorrect?: number
  attempted?: number
  skipped?: number
  accuracyPercentage?: number
  attemptedPercentage?: number
  percentile?: number
  timeSpent?: number
  score?: number
}

export interface TimeSpentAnalysis {
  totalTimeSpentOnCorrect?: number
  totalTimeSpentOnIncorrect?: number
  totalTimeSpentOnUnattempted?: number
}

export interface QuestionWiseAnalysis {
  questionId?: string
  myAnswer?: null | string
  correctAnswer?: string[]
  status?: 'correct' | 'skipped' | 'incorrect'
  difficultyLevel?: string
  timeSpentByMe?: number
  timeSpentByThoseWhoGotRight?: number
  timeSpentByTopper?: number
}
