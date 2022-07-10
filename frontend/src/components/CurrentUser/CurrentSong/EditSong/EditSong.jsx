import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function EditCurrentSong() {
  const { songId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songs[songId]);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [validationErrors, setValidationErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const errors = [];

    if (title.length < 1) {
      errors.push("Please provide a title for the track");
    }

    setValidationErrors(errors);
  }, [title, description]);

  const onSubmit = e => {
      e.preventDefault()
      setSubmitted(true)

      if(validationErrors.length > 0) return alert('Clear requirements before saving')

      const updatedSong = {
          title,
          description
      }

      setSubmitted(false)

      return updatedSong
  }

  return (
    <div>
      <h1>EditSong.jsx</h1>
      {submitted && validationErrors.length > 0 && (
        <div>Errors
            <ul>
                {validationErrors.map(error => (
                    <li>{error}</li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
}

// grab the song that pertains to the user. Import CurrentSong.jsx component?

// use the song card

// button to edit the song

// form? 28:1

// onChange(e => setTitle(e.target.value))
// onChange(e => setDescription(e.target.value))

// Save Button



// Delete Song button?
