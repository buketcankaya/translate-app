import { useEffect, useState } from "react";
import "../style.scss";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { clearAnswer } from "../store/slices/translateSlice";
import { getLanguages, translateText } from "../actions/translateActions";
import { FaExchangeAlt } from "react-icons/fa";

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.translateSlice);
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Türkçe",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  //! Statelerin değerlerini değiştirir
  const handleChange = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    //! text alanlarını temizle
    setText("");
    dispatch(clearAnswer());
  };

  const [text, setText] = useState("");

  //!   dillerin verisini çeker
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  return (
    <div>
      <div id="main-page">
        <div className="container">
          <h1>Translate App</h1>
          {/* üst kısım */}
          <div className="upper">
            <Select
              onChange={setSourceLang}
              className="react-select"
              options={state.languages}
              value={sourceLang}
            />
            <button onClick={handleChange}>
              <FaExchangeAlt className="iconn" />
            </button>
            <Select
              onChange={setTargetLang}
              className="react-select"
              options={state.languages}
              value={targetLang}
            />
          </div>
          {/* Alt kısım */}
          <div className="bottom">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <textarea
              className="textt"
              value={state.answer}
              disabled
            ></textarea>
          </div>
          <button
            className="ui-btn"
            onClick={() =>
              dispatch(translateText({ sourceLang, targetLang, text }))
            }
            id="translate"
          >
            <span className="trans">Translate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
