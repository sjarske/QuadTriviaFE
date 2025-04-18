import QuestionCard from "./QuestionCard";

function QuestionList({ questions, answers, onAnswerChange }) {
  return (
    <>
      {questions.map(q => (
        <QuestionCard
          key={q.id}
          question={q}
          selected={answers[q.id]}
          onChange={onAnswerChange}
        />
      ))}
    </>
  );
}

export default QuestionList;