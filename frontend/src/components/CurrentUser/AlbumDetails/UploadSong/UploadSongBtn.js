import { useState } from "react"
import { Modal } from "../../../../context/Modal";
import UploadSongForm from "./UploadSongForm";

export default function UploadSongBtn() {
    const [showUploadBtn, setShowUploadBtn] = useState(false);

  return (
    <div>
      <button style={{ cursor: "pointer" }} onClick={() => setShowUploadBtn(true)}>Upload</button>
      {showUploadBtn && (
        <Modal onClose={() => setShowUploadBtn(false)}>
          <UploadSongForm setShowUploadBtn={setShowUploadBtn} />
        </Modal>
      )}
    </div>
  )
}
