import { data } from './data';
import './App.css';
import { useState } from 'react';


function getRandomElements(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
function App() {
  const [randomQuestions, setRandomQuestions] = useState(() => getRandomElements(data, Math.floor(Math.random() * (15 - 5 + 1)) + 5));
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showCorrect, setShowCorrect] = useState({});
  const handleChange = (questionIndex, optionIndex, correct) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: optionIndex,
    });
    setShowCorrect({
      ...showCorrect,
      [questionIndex]: correct,
    });
  };
  const handleFinishQuiz = () => {
    // Genera una nueva lista de preguntas aleatorias
    setRandomQuestions(getRandomElements(data, Math.floor(Math.random() * (15 - 5 + 1)) + 5));
    // Resetea el estado de las opciones seleccionadas y la corrección
    setSelectedOptions({});
    setShowCorrect({});
  };

  return (
    <section>
      {randomQuestions.map(({ question, options }, questionIndex) => (
        <div key={questionIndex} className='pregunta'>
          <h1>{question}</h1>
          <form className="respuestas">
            {options.map(({ text, correct }, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  id={`question-${questionIndex}-option-${optionIndex}`}
                  checked={selectedOptions[questionIndex] === optionIndex}
                  onChange={() => handleChange(questionIndex, optionIndex, correct)}
                />
                <label htmlFor={`question-${questionIndex}-option-${optionIndex}`}>{text}</label>
                {selectedOptions[questionIndex] === optionIndex && (
                  <>
                  <br />
                  <span className={correct ? 'Correcto' : 'Incorrecto'}>{correct ? 'Correcto' : 'Incorrecto'}</span>
                  </>
                )}
              </div>
            ))}
          </form>
        </div>
      ))}
      <button onClick={handleFinishQuiz}>Terminar Cuestionario</button>
    </section>
  );
}

export default App;
