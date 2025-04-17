📦 **QuadTriviaBE – Backend**

✅ **Vereisten:**

Java 17+

Maven

Internetverbinding (de app gebruikt Open Trivia DB).

**🚀 Starten**

Clone de repo:
git clone https://github.com/sjarske/QuadTriviaBE.git

cd QuadTriviaBE


Start de applicatie met Maven:
./mvnw spring-boot:run

De API draait op:
http://localhost:8080

🔗 **Endpoints**

GET /api/questions – Haalt 5 trivia vragen op

POST /api/checkanswers – Controleert de antwoorden van de gebruiker

POST /api/newquiz – Leegt de cache en haalt nieuwe vragen op
