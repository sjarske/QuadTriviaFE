export async function fetchQuestions() {
    const res = await fetch("http://localhost:8080/api/questions");
    if (!res.ok) throw new Error("Fout bij ophalen van vragen");
    return res.json();
  }
  
  export async function checkAnswers(answers) {
    const res = await fetch("http://localhost:8080/api/checkanswers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers })
    });
    if (!res.ok) throw new Error("Fout bij versturen van antwoorden");
    return res.json();
  }
  