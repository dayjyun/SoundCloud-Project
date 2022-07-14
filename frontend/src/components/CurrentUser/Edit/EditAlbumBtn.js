import { useState } from "react"
import { Modal } from "../../../context/Modal";
import EditAlbumForm from "./EditAlbumForm";

export default function EditAlbumBtn() {
    const [showAlbumEdit, setShowAlbumEdit] = useState(false);

  return (
    <div>
      <button style={{ cursor: "pointer" }} onClick={() => setShowAlbumEdit(true)}>Edit</button>
      {showAlbumEdit && (
        <Modal onClose={() => setShowAlbumEdit(false)}>
            <EditAlbumForm setShowAlbumEdit={setShowAlbumEdit}/>
        </Modal>
        )}
    </div>
  );
}
