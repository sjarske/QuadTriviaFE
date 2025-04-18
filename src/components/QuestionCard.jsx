function QuestionCard({ question, selected, onChange }) {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <strong dangerouslySetInnerHTML={{ __html: question.question }} />
        <div>
          {question.answers.map(a => (
            <label key={a} style={{ display: "block" }}>
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