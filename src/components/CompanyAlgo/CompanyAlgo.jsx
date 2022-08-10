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

export default function CompanyAlgo(props) {
  const [company, setCompany] = useInput('');
  const [question, setQuestion] = useInput('');
  const [language, setLanguage] = useInput('');
  const [algos, setAlgos] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchData = function() {
      var details = {
        search: searchText,
        language: ''
      };

      console.log('Searching for ', details);

      fetch(`/api/getalgos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
      })
      .then(data => data.json())
      .then((content) => {
        console.log('Got search results: ', content);
        // content.sort();
        content.sort((a, b) => (a.company.toLowerCase() > b.company.toLowerCase()) ? 1 : -1);
        setAlgos(content);
      })
      .catch((err) => {
        console.log('Got err: ', err);
      })
  }

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
        fetchData();
        document.getElementById('language').value = '';
        document.getElementById('algoBox').value = '';
        document.getElementById('companyBox').value = '';
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const shownAlgos = [];
  for(let i = 0; i < algos.length; i++) {
    const a = algos[i];
    const question = a.question.toLowerCase().replace(' ', '');
    const company = a.company.toLowerCase().replace(' ', '');
    const language = a.language.toLowerCase().replace(' ', '');
    const text = searchText.toLowerCase().replace(' ', '');
    
    console.log('Searching: ', text);

    if(question.includes(text) || company.includes(text) || language.includes(text)) {
      shownAlgos.push(a);
    }
  }
  const renderAlgs = [];
  for(let i = 0; i < shownAlgos.length; i++) {
    const a = shownAlgos[i];

    renderAlgs.push(
      <div className='algos' key={'a.company' + i}>
      <div id="companyNames">{a.company}
         <div>{a.date}</div>
         <div>{a.question}</div>
         <div>{a.language}</div>
       </div>
      </div>
    );
  }

  return (
    <div className='companyAlgoPage'>
      <img id='logo' src={img} alt='logo' />

      <div id='form'>
        <form>
        <div>
        <form id='searchBar' role="search">
            <label htmlFor="search">Search for stuff</label>
            <input id="searchbox" type="search" placeholder="Search..." autoFocus required />
            <button className='button-86' type="button" onClick={e => {
              e.preventDefault();
              const text = document.getElementById('searchbox').value;
              console.log('Search text is now: ', text);
              setSearchText(text);
            }}>
              Go
            </button>    
        </form> 
        </div>
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
      <div className='company'>
        <div id='columns'>
          <div>Company</div>
          <div>Date</div>
          <div>Question</div>
          <div>Language</div>
        </div>
        {renderAlgs}
      </div>
    </div>
  );
}
