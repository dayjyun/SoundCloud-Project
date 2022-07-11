import { useState } from "react";

function EditSongBtn() {
  const [showEdit, setShowEdit] = useState(false)

  return (
    <div>
        <button onClick={() => setShowEdit(true)}>Edit</button>
        {showEdit && (
          <Modal onClose={() => setShowEdit(false)}>
            <EditSongForm setShowEdit={setShowEdit}/>
          </Modal>
        )}
    </div>
  )
}

export default EditSongBtn;
