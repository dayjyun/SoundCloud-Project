

export default function CreateAlbum() {
  return (
    <div className='create-album-component'>
        <form>
            <label htmnlFor='title'>Album Title</label>
            <input
                className="create-input"
                type='text'
            />
        </form>
    </div>
  )
}
