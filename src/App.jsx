import { useEffect, useState } from "react";
import { fetchQuestions, checkAnswers } from "./api";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cooldown, setCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    loadNewQuestions();
  }, []);

  useEffect(() => {
    if (cooldown && cooldownTime > 0) {
      const interval = setInterval(() => {
        setCooldownTime(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cooldown, cooldownTime]);

  const loadNewQuestions = () => {
    if (cooldown) return;

    setCooldown(true);
    setCooldownTime(5);
    setLoading(true);
    setResults(null);
    setAnswers({});
    setError(null);

    fetch("http://localhost:8080/api/newquiz", { method: "POST" })
      .then(() =>
        fetchQuestions()
          .then(data => {
            console.log("Vragen ontvangen:", data);
            setQuestions(data);
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setError("Kan geen vragen laden.");
            setLoading(false);
          })
      )
      .catch(err => {
        console.error("Fout bij het resetten van de cache:", err);
        setLoading(false);
      });
  };

  const handleAnswerChange = (id, answer) => {
    setAnswers(prev => ({ ...prev, [id]: answer }));
  };

  const handleSubmit = async () => {
    try {
      const data = await checkAnswers(answers);
      setResults(data.results);
    } catch (err) {
      console.error(err);
      setError("Fout bij controleren van antwoorden.");
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>🔄 Vragen laden...</div>;
  if (error) return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;

  if (results) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Resultaten</h2>
        <ul>
          {Object.entries(results).map(([id, feedback]) => (
            <li key={id}>
              Correcte antwoord: {feedback.correctAnswer}<br />
              Jouw antwoord: {feedback.userAnswer} <br />
              {feedback.isCorrect ? "✅ Goed!" : "❌ Fout!"}
            </li>
          ))}
        </ul>
        <button onClick={loadNewQuestions} disabled={cooldown}>
          {cooldown ? `Even wachten... (${cooldownTime}s)` : "Nieuwe Quiz"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Trivia Quiz</h1>
      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: "1rem" }}>
          <strong dangerouslySetInnerHTML={{ __html: q.question }} />
          <div>
            {q.answers.map(a => (
              <label key={a} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={q.id}
                  value={a}
                  checked={answers[q.id] === a}
                  onChange={() => handleAnswerChange(q.id, a)}
                />
                <span dangerouslySetInnerHTML={{ __html: a }} />
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} disabled={questions.length === 0}>
        Check Antwoorden
      </button>
      <button
        onClick={loadNewQuestions}
        disabled={cooldown}
        style={{ marginTop: "1rem" }}
      >
        {cooldown ? `Even wachten... (${cooldownTime}s)` : "Nieuwe Quiz"}
      </button>
    </div>
  );
}

export default App;
