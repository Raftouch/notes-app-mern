import { useState } from 'react'
import { Link } from 'react-router-dom'

function NewNote() {
  const url = `${import.meta.env.VITE_SERVER_URL}/api/notes`
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const addNewNote = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
        }),
      })

      if (response.ok) {
        setTitle('')
        setDescription('')
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 2000)
      } else {
        console.log('Failed to submit')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full p-10">
      <Link to="/">Back to Notes</Link>

      <form onSubmit={addNewNote}>
        <div className="flex flex-col bg-yellow-300 gap-5 p-5 mt-5 mb-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            className="bg-yellow-300"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            rows="10"
            cols="50"
            className="bg-yellow-300"
          ></textarea>
        </div>
        <input
          className="bg-green-600 w-full py-2 text-white cursor-pointer"
          type="submit"
          value={submitted ? 'Saving note...' : 'Add new note'}
          disabled={submitted}
        />
        <p className="text-center mt-3">
          {submitted && <div>Note has been added successfully</div>}
        </p>
      </form>
    </div>
  )
}

export default NewNote
