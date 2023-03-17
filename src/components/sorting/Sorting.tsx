import { useState } from 'react';

import Select, { MultiValue } from 'react-select';

import './Sorting.css';

interface Props {
    closeSortModal: () => void;
    setSorting : React.Dispatch<React.SetStateAction<string[]>>
  }

interface SortOption {
    label: string,
    value: string
  }

const sortOptions : SortOption[] = [
  { label: 'Title Ascending', value: 'Title ASC' },
  { label: 'Title Descending', value: 'Title DESC' },
  { label: 'Publish Date Ascending', value: 'PublishDate ASC' },
  { label: 'Publish Date Descending', value: 'PublishDate DESC' },
  { label: 'ISBN Ascending', value: 'Isbn ASC' },
  { label: 'ISBN Descending', value: 'Isbn DESC' }
]

function Sorting(props: Props) {
  const [ selectedSorts, setSelectedSorts ] = useState<SortOption[]>([])

  const applySort = () => {
    props.setSorting(selectedSorts.map((sort) => sort.value))
    props.closeSortModal()
  }

  const handleSelectedSortsChange = (sortData: MultiValue<SortOption>) => {
    setSelectedSorts(sortData as SortOption[])
  }



  return(
    <div className="modal">
      <div className="overlay" onClick={props.closeSortModal}/>
      <div className="content">
        <h2>Sort</h2>
        <Select
          isMulti
          className="sort-select"
          maxMenuHeight={200}
          value={selectedSorts}
          options={sortOptions}
          classNamePrefix="select"
          getOptionLabel={(option: SortOption) => option.label}
          getOptionValue={(option: SortOption) => option.value}
          onChange={handleSelectedSortsChange}
          placeholder='Sort by...'
        />
        <div className="filter-buttons">
          <button onClick={applySort}>Apply</button>
          <button className='cancel-button' onClick={props.closeSortModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default  Sorting
