function ResultList({ questions, results }) {
    return (
      <ul>
        {questions.map(q => {
          const feedback = results[q.id];
          if (!feedback) return null;
  
          return (
            <li key={q.id} style={{ marginBottom: "1rem" }}>
              <strong dangerouslySetInnerHTML={{ __html: q.question }} />
              <br />
              Jouw antwoord: <span dangerouslySetInnerHTML={{ __html: feedback.userAnswer }} />
              <br />
              Correct antwoord: <span dangerouslySetInnerHTML={{ __html: feedback.correctAnswer }} />
              <br />
              {feedback.isCorrect ? "✅ Goed!" : "❌ Fout!"}
            </li>
          );
        })}
      </ul>
    );
  }
  
  export default ResultList;
  