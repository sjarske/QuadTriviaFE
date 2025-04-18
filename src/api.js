const BASE_URL = "https://quadtriviabe.onrender.com/api";

export async function fetchQuestions() {
  const res = await fetch(`${BASE_URL}/questions`);
  if (!res.ok) throw new Error("Fout bij ophalen van vragen");
  return res.json();
}

export async function checkAnswers(answers) {
  const res = await fetch(`${BASE_URL}/checkanswers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers })
  });
  if (!res.ok) throw new Error("Fout bij versturen van antwoorden");
  return res.json();
}
