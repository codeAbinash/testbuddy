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
}

export interface DifficultyAnalysis {
  subject?: string
  levels?: {
    level?: string
    questions?: {
      questionId?: string
      qNumber?: number
      status?: string
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
}

export interface TimeSpentAnalysis {
  totalTimeSpentOnCorrect?: number
  totalTimeSpentOnIncorrect?: number
  totalTimeSpentOnUnattempted?: number
  questionWiseAnalysis?: QuestionWiseAnalysis[]
}

export interface QuestionWiseAnalysis {
  questionId?: string
  myAnswer?: null | string
  correctAnswer?: string[]
  status?: string
  difficultyLevel?: string
  timeSpentByMe?: number
  timeSpentByThoseWhoGotRight?: number
  timeSpentByTopper?: number
}