import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyAlgo.css';
import img from '../../img/Algorhythm-Logo1.png';

const useInput = (initial) => {
  const [value, setValue] = useState(initial)
  const onChange = (e) => {
    setValue(e.target.value)
  }
  return [value, onChange]
}

export default function CompanyAlgo() {
  const [company, setCompany] = useInput('');
  const [question, setQuestion] = useInput('');
  const [language, setLanguage] = useInput('');

  function post(e) {
    e.preventDefault();
    const body = {
      company,
      question,
      language,
    };

    fetch('/api/postalgo', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        console.log('posted', data);
      })
      .catch((err) => console.log(err));
  }

  // const companyList = company.map((elements, index) => {
  //   return (
  //     <div>
  //         <div id="companyNames">{elements.company}
  //         <div>{elements.algo}</div>
  //         </div>
  //       </div>
  //   );
  // });

  return (
    <div className='companyAlgoPage'>
      <img id='logo' src={img} alt='logo' />
      <div id='form'>
        <form>
          <input
            id='companyBox'
            placeholder='Company Name'
            onChange={setCompany}
          />
          <input id='language' placeholder='Language' onChange={setLanguage} />
          <input id='algoBox' placeholder='Algorhythm' onChange={setQuestion} />
          <button className='button-85' type='submit' onClick={post}>
            New Post
          </button>
        </form>
      </div>
      <div>
        <button>Company List Here!</button>
        {/* {companyList} */}
      </div>
    </div>
  );
}
