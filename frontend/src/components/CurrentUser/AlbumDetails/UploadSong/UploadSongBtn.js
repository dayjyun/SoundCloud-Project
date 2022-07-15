import { useState } from "react"
import { Modal } from "../../../../context/Modal";
import UploadSongForm from "./UploadSongForm";
import './UploadSongBtn.css'

export default function UploadSongBtn() {
    const [showUploadBtn, setShowUploadBtn] = useState(false);

  return (
    <div>
      <button className="uploadSongBtn" onClick={() => setShowUploadBtn(true)}>Upload</button>
      {showUploadBtn && (
        <Modal onClose={() => setShowUploadBtn(false)}>
          <UploadSongForm setShowUploadBtn={setShowUploadBtn} />
        </Modal>
      )}
    </div>
  )
}
