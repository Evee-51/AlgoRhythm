import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CompanyAlgo.css'
import img from '../../img/Algorhythm-Logo1.png'


export default function CompanyAlgo () {
    const [company, setCompany] = useState("");
    const [algo, setAlgo] = useState("");
    const [language, setLanguage] = useState("");

    async function post() {
        const body = {
            company: company,
            algo: algo,
        };

        await fetch("http://localhost:3000/home/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((data) => data.json())
          .then((data) => {
              console.log("posted");
            setCompany(data.company);
            setAlgo(data.algo);
         })
          .catch((err) => console.log(err));
      }


    //   const companyList = company.map((elements, index) => {
    //     return (
    //       <div>
    //           <div id="companyNames">{elements.company}
    //           <div>{elements.algo}</div>
    //           </div>
    //         </div>
    //     );
    //   });


  return (
    <div className='companyAlgoPage'>
        <img src={img} id='logo'/>
        <div id='form'>
            <form onSubmit={()=> {
                post();
            }}>
            <input id='companyBox' placeholder='Company Name'></input>
            <input id='language' placeholder='Language'></input><br />
            <input id='algoBox' placeholder='Algorhythm'></input>
            {/* <input id='creator' placeholder='Algorhythm'></input> */}<br />
            <button className='button-85' type="submit">New Post</button>
            </form>
        </div>
        <div>
            <button>Company List Here!</button>
            {/* {companyList} */}
        </div>
    </div>

  )
}
