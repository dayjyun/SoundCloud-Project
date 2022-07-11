import { useState } from "react";
import { Modal } from '../../../context/Modal'
import EditSongForm from "./EditSongForm";

function EditSongBtn() {
  const [showSongEdit, setShowSongEdit] = useState(false)

  return (
    <div>
        <button onClick={() => setShowSongEdit(true)}>Edit</button>
        {showSongEdit && (
          <Modal onClose={() => setShowSongEdit(false)}>
            <EditSongForm setShowSongEdit={setShowSongEdit}/>
          </Modal>
        )}
    </div>
  )
}

export default EditSongBtn;
