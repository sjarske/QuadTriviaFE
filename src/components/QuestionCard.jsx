function QuestionCard({ question, selected, onChange }) {
  return (
    <div className="question-card">
      <div
        className="question-text"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <div className="answers">
        {question.answers.map((a) => (
          <label key={a}>
            <input
              type="radio"
              name={question.id}
              value={a}
              checked={selected === a}
              onChange={() => onChange(question.id, a)}
            />
            <span dangerouslySetInnerHTML={{ __html: a }} />
          </label>
        ))}
      </div>
    </div>

  );
}

export default QuestionCard;  