import { useState } from "react";
import { Modal } from '../../../context/Modal'
import EditSongForm from "./EditSongForm";
import './EditSongBtn.css'

function EditSongBtn() {
  const [showSongEdit, setShowSongEdit] = useState(false)

  return (
    <div>
        <button className="editSongBtn" onClick={() => setShowSongEdit(true)}>Edit</button>
        {showSongEdit && (
          <Modal onClose={() => setShowSongEdit(false)}>
            <EditSongForm setShowSongEdit={setShowSongEdit}/>
          </Modal>
        )}
    </div>
  )
}

export default EditSongBtn;
