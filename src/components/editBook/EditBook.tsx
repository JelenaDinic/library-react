import BookForm from '../createBook/BookForm';

import './EditBook.css';

interface Props {
    closeEditModal: () => void;
    bookId: number
  }

function EditBook(props: Props) {

  return(
    <div className="modal">
      <div className="overlay" onClick={props.closeEditModal}/>
      <div className="content">
        <h2>Edit book</h2>
        <BookForm bookId={props.bookId} />
      </div>
    </div>
  )
}

export default EditBook
