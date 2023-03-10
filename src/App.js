import './App.css';
import React, {useEffect, useState, useCallback} from 'react'
import DataWords from './data/words.json'
import { Welcome } from './components';

function App() {
  const [words, setWords] = useState(DataWords)
  const [wordList, serWordList] = useState([]) 
  const [countError, setCountError] = useState(0) 
  const [indexVoice, setIndexVoice] = useState(0)  
  const [idWord, setIdWord] = useState('')  
  const [status, setStatus] = useState('')
  const [voices, setVoices] = useState([])
  const tts = window.speechSynthesis;
  const countWords = 8


  useEffect(()=>{
    let voices = tts.getVoices()
    setVoices(voices.filter(voice =>{
      return voice.lang.includes('en')
    }))
  }, [tts])

  const rundomWords = useCallback(() =>{
    const result = [];
    for(let i = 0; i < countWords; i++) {
      result.push(words[Math.floor(Math.random() * words.length)])
    }
    const index = Math.floor(Math.random() * countWords)
    setIdWord(result[index].id)
    return result;
  }, [words])

  useEffect(()=>{
    serWordList(rundomWords())
  }, [rundomWords])

  const setWordError = (id) => {
    wordList.forEach(word => {
      const isError = word?.status === 'false'
      if(word.id === id && !isError){
        setCountError(countError + 1)
      }
    })
  }

  const setWordStatus = (id, status) => {
    serWordList(wordList.map(word => {
      if(word.id === id) {
        return {...word, status: status}
      }
      return word
    }))
  }

  const voice = (word) =>{
    const toSpeak = new SpeechSynthesisUtterance(word)
    toSpeak.lang = 'en-US'
    toSpeak.rate = 0.7
    toSpeak.voice = voices[indexVoice]
    tts.speak(toSpeak)
  }

  const changeAnswer = (id, word) => {
    voice(word)
    if(id === idWord){
      setStatus('next')
      setWordStatus(id, 'true')
    }
    else{
      if(status !== 'next'){
        setStatus('err')
      }
      setWordError(id)
      setWordStatus(id, 'false')
    }
  }

  const next = () => {
    if(status === 'next'){
      setWords(words.filter(word => {
        return idWord !== word.id
      }))
      serWordList(rundomWords())
      setStatus('')
    }
  }

  const changeVoice = () => {
    const newIndex = indexVoice<voices.length-1?indexVoice+1:0
    setIndexVoice(newIndex)
  }

  return (
    <div className="App">
      <Welcome/>
      <header className="header">
          <p onClick={changeVoice} className='broadcast'>
            {indexVoice + 1}
            <i className="bi bi-broadcast"></i>
          </p>
        <div className='info'>
          <p className='count'>
            {1000-Number(words.length)}
          </p>/
          <p className='error'>{countError}</p>
        </div>
        <h2 className="main_word">
          {wordList.length && idWord
            && wordList.find(word =>{
              return word.id === idWord
            }).rus
          }
        </h2>
      </header>
      <div className="list_word">
        {wordList.map((word, index) =>
          <div 
            key={word.id+index}
            onClick={()=>changeAnswer(word.id, word.eng)} 
            className={`item_word ${word?.status}`}>
              <p>{word.eng}</p>
              {word?.status 
                ? <span>({word.rus})</span>
                :''
              }
          </div>
        )}
      </div>
      <div className='btns'>
        <button  onClick={next} className={`btn ${status}`}>
            NEXT
        </button>
      </div>

    </div>
  );
}

export default App;
