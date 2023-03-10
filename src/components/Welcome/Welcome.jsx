import React, {useState} from 'react'
import s from './Welcome.module.css'

const Welcome = () => {
   const [vis, setVis] = useState(true)

   if(!vis){
      return ''
   }

   return (
      <div className={s.box}>
         <div className={s.container}>
            <h2>Приветствую!</h2>
            <p>Методика 1000 попуряных слов, правила и практика.</p>
            <p>Уверен, ты уже многое занешь! Не бойся ошибаться, если видишь новые слова, лучше попробуй подумать и ответить методом исключения.
            </p>
            <p>Рекомендую, каждый день выписывать в тетрадь по 15 новых слов и учить их.</p>
            <p>Таким образом, уже через 2 месяца ты выучишь все слова! Наберешь 1000 баллов и получишь ссылку на изучение правил! Удачи!</p>
            <button 
               onClick={()=>setVis(false)}
               className={s.btn}
            >
               Согласен
            </button>
         </div>
      </div>
   );
};
export default Welcome
