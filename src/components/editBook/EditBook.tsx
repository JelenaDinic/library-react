import BookForm from '../bookForm/BookForm';

import './EditBook.css';

interface Props {
  bookId: number
  closeEditModal: () => void;
  onModifyFinished?: () => void
}

function EditBook( { bookId, closeEditModal, onModifyFinished } : Props) {

  return(
    <div className="modal">
      <div className="overlay" onClick={closeEditModal}/>
      <div className="content">
        <h2>Edit book</h2>
        <BookForm onModifyFinished = {onModifyFinished} bookId={bookId} closeEditModal={closeEditModal}/>
      </div>
    </div>
  )
}

export default EditBook
