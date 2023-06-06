import { useEffect, useRef, useState } from "react";
import { useCallAPI } from "../../API/API";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [allQuestionData, setAllQuestionData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [countTime, setCountTime] = useState(0);

  const [selectedOption, setSelectedOption] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [score, setScore] = useState(0);

  const { dataForQuestion } = useCallAPI({ amount: 10 });
  const mount = useRef(false);

  const handleOnClick = useNavigate();

  useEffect(() => {
    if (!mount.current && dataForQuestion.length > 0) {
      setAllQuestionData(dataForQuestion);
      mount.current = true;
      console.log(dataForQuestion);
    }
  }, [dataForQuestion]);

  useEffect(() => {
    if (
      allQuestionData.length > 0 &&
      !(currentQuestion + 1 > allQuestionData.length)
    ) {
      setQuestion(allQuestionData[currentQuestion].question);
      const currentAnswer = [
        ...allQuestionData[currentQuestion].incorrect_answers,
        allQuestionData[currentQuestion].correct_answer,
      ];
      setAnswer(randomQuestions(currentAnswer));
      setCorrectAnswer(allQuestionData[currentQuestion].correct_answer);
    }
  }, [currentQuestion, allQuestionData]);

  useEffect(() => {
    // setTime
    const increadTime = () => {
      if (allQuestionData && allQuestionData.length !== 0) {
        setTimeout(() => {
          setCountTime(countTime + 1);
        }, 1000);
      }
    };

    if (!(currentQuestion + 1 > allQuestionData.length)) {
      increadTime();
    } else return () => clearTimeout(increadTime);
  }, [countTime, allQuestionData, currentQuestion]);

  const manyScore = (event) => {
    setSelectedOption(event.target.value);
  };

  const nextOnCreate = () => {
    setCurrentQuestion(currentQuestion + 1);
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }
  };

  const randomQuestions = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="_background_color container-fluid w-100 vh-100">
      <div className="row-12 text-center d-flex justify-content-center">
        <div className="col-12 col-md-6 col-xl-4">
          {!(currentQuestion + 1 > allQuestionData.length) ? (
            <>
              <div className="text-white m-4">
                {`Question ${currentQuestion + 1}/${
                  allQuestionData.length
                } - Time: ${countTime}s`}
              </div>
              <div className="text-white mt-4 mb-4">{question}</div>
              {answer.map((item) => (
                <div
                  class="form-check border border-1 rounded-5 m-4 p-2"
                  key={item}
                  onChange={manyScore}
                >
                  <label class="form-check-label text-white">{item}</label>
                  <input
                    class="form-check-input bg-danger float-end me-2"
                    type="radio"
                    name="your_question"
                    value={item}
                  />
                </div>
              ))}
              <button
                className="btn btn-danger rounded-5 text-white w-75"
                onClick={nextOnCreate}
              >
                Next
              </button>
            </>
          ) : (
            <>
              <h1 className="text-white">Done</h1>
              <h3 className="text-white">Your score: {score}</h3>
              <h3 className="text-white">Total time: {countTime}s</h3>
              <h3 className="text-white">
                {score > 4 ? "You are amazing!" : "Better luck next time!"}
              </h3>
              <button
                className="btn btn-danger rounded-5 text-white w-75"
                // onClick={() => {
                //   setCurrentQuestion(0);
                //   setCountTime(0);
                //   setScore(0);
                // }}
                onClick={() => handleOnClick("/")}
              >
                Play again!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
