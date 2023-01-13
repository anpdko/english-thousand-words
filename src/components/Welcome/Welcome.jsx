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
            <p>Методика 1000 слов, потом правила и практика.</p>
            <p>Не бойся ошибаться, если видишь новые слова, лучше попробуй ответить методом исключения.
            </p>
            <p>Рекомендую, каждый день выписывать в тетрадь по 15 новых слов и учить их.</p>
            <p>Таким образом, уже через 2 месяца ты выучешь все слова! Наберешь 1000 баллов и получишь ссылку на изучения правил! Удачи!</p>
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