import BookForm from '../bookForm/BookForm'

import './EditBook.css'

interface Props {
  bookId: number
  closeEditModal: () => void
  onModifyFinished?: () => void
  updateBookOnChange: () => void
}

function EditBook( { bookId, closeEditModal, onModifyFinished, updateBookOnChange } : Props) {

  return(
    <div className="modal">
      <div className="overlay" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        closeEditModal()
      }}
      />
      <div className="content"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation()
        }}
      >
        <h2>Edit book</h2>
        <BookForm
          updateBookOnChange={updateBookOnChange}
          onModifyFinished = {onModifyFinished}
          bookId={bookId}
          closeEditModal={closeEditModal}
        />
      </div>
    </div>
  )
}

export default EditBook
