import { useEffect, useState, useCallback } from "react";
import { fetchQuestions, checkAnswers } from "./api";
import QuestionList from "./components/QuestionList";
import ResultList from "./components/ResultList";

import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  const loadNewQuestions = useCallback(() => {
    setLoading(true);
    setResults(null);
    setAnswers({});
    setCooldown(5);

    fetch("https://quadtriviabe.onrender.com/api/newquiz", { method: "POST" })
      .then(() => {
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
          });
      })
      .catch(err => {
        console.error("Fout bij het resetten van de cache:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadNewQuestions();
  }, [loadNewQuestions]);

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

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

  return (
    <div className="app-container">
      <h1>Quad Trivia Quiz</h1>
      {results ? (
        <>
          <ResultList questions={questions} results={results} />
          <button onClick={loadNewQuestions} disabled={cooldown > 0}>
            {cooldown > 0 ? `Wachten... ${cooldown}s` : "Nieuwe Quiz"}
          </button>
        </>
      ) : (
        <>
          <QuestionList
            questions={questions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
          />
          <button
            onClick={handleSubmit}
            disabled={
              questions.length === 0 || Object.keys(answers).length !== questions.length
            }
          >
            Check Antwoorden
          </button>
          <button
            onClick={loadNewQuestions}
            style={{ marginLeft: "1rem" }}
            disabled={cooldown > 0}
          >
            {cooldown > 0 ? `Wachten... ${cooldown}s` : "Nieuwe Quiz"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;