import { useState } from "react";
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as actions from '../../../../store/songReducer'

export default function EditSongForm({ setShowEdit }) {
  const { songId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const song = useSelector((state) => state.songs[`${songId}`])
  
  const [validationErrors, setValidationErrors] = useState([])
  const [title, setTitle] = useState(song.title)
  const [previewImage, setPreviewImage] = useState(song.previewImage)
  const [url, setUrl] = useState(song.url)

  const handleFormSubmit = async(e) => {
    e.preventDefault()

    setValidationErrors([])

    await dispatch(actions.editSong({
      id: songId,
      title,
      previewImage,
      url,
      userId
    }))
    .then(() => {
    setShowEdit(false)
    history.push('/songs')
  })
  .catch(async res => {
    const err = await res.json()
    if(err) {
      setValidationErrors(err.errors)
    }
  })
  }

  return (
    <div className="edit-form">
      <h1>Make Some Changes Here:</h1>
      <form onSubmit={handleFormSubmit}>
        <ul>
          {Object.values(errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="input-wrapper">
          <label htmlFor="title">Title</label>
          <input
            className="edit-input"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="input-wrapper">
            <label htmlFor="previewImage">Preview Image</label>
            <input
              className="edit-input"
              type="text"
              id="previewImage"
              name="previewImage"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="url">Song URL</label>
            <input
              className="edit-input"
              type="text"
              id="url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <button className="edit-button" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
