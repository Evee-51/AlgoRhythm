import React, { useState, useEffect } from 'react';
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
  const [algos, setAlgos] = useState([]);

  function post(e) {
    e.preventDefault();
    const body = {
      company,
      question,
      language,
    };

    // const newCompanyArr = {
    //   company: "",
    //   language: "",
    //   question: ""
    // }

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
        // console.log('data' , data)
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetch('/api/getalgos')
      .then((data) => data.json())
      .then((content) => {
        setAlgos(content);
      })
      .catch((err) => {
        console.log('Got err: ', err);
      })
  }, []);

  const renderAlgs = [];
  for(let i = 0; i < algos.length; i++) {
    const a = algos[i];
    renderAlgs.push(
      <div key={'a.company' + i}>
      <div id="companyNames">{a.company + '|' + a.date}
         <div>{a.question}</div>
         <div>{a.language}</div>
       </div>
      </div>
    );
  }

  // const companyList = companyArr.map((elements, index) => {
  //   console.log(elements)
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
          <input id='language' placeholder='Language' onChange={setLanguage} /><br />
          <input id='algoBox' placeholder='Algorhythm' onChange={setQuestion} /><br />
          <button className='button-85' type='submit' onClick={post}>
            New Post
          </button>
        </form>
      </div>
      <div id='company'>
        {/* <button>Company List Here!</button> */}
        {/* {temp} */}
        {/* {companyList} */}
        {renderAlgs}
      </div>
    </div>
  );
}
