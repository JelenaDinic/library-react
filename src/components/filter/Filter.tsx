import { useState } from 'react';

import WhereObject from '../../interfaces/WhereObject';
import './Filter.css';

interface Props {
    closeModal: () => void;
    setFilters : React.Dispatch<React.SetStateAction<WhereObject[]>>
  }

function Filter(props: Props) {
  const [ authorFirstName, setAuthorFirstName ] = useState('')
  const [ authorLastName, setAuthorLastName ] = useState('')
  const whereObjectFirstname : WhereObject = { Field: 'Authors.FirstName', Value: authorFirstName, Operation: 2 }
  const whereObjectLastname : WhereObject = { Field: 'Authors.LastName', Value: authorLastName, Operation: 2 }

  const applyFilter = () => {
    const whereObjects : WhereObject[] = []
    whereObjects.push(whereObjectFirstname)
    whereObjects.push(whereObjectLastname)
    props.setFilters(whereObjects)
    props.closeModal()
  }

  return(
    <div className="modal">
      <div className="overlay" onClick={props.closeModal}/>
      <div className="content">
        <h2>Filters</h2>
        <label>Author first name</label>
        <input className='form-input' type="text"
          onChange={(e) => setAuthorFirstName(e.target.value)}
        />
        <label>Author last name</label>
        <input className='form-input' type="text"
          onChange={(e) => setAuthorLastName(e.target.value)}
        />
        <div className="filter-buttons">
          <button onClick={applyFilter}>Apply</button>
          <button className='cancel-button' onClick={props.closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Filter
