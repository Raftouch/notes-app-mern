import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function UpdateNote() {
  const navigate = useNavigate()
  const { id } = useParams()
  const url = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Failed to fetch note')
        }
        const data = await response.json()
        setTitle(data.title)
        setDescription(data.description)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setError('Error fetching note')
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])

  const updateNote = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 2000)
      } else {
        console.log('Failed to submit')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeNote = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      })
      if (response.ok) {
        navigate('/')
        console.log('Note removed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="w-full p-10">
          <div className="flex justify-between">
            <Link to="/">Back to Notes</Link>
            <button className="text-red-500" onClick={removeNote}>
              Delete Note
            </button>
          </div>

          <form onSubmit={updateNote}>
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
              value={submitted ? 'Saving note...' : 'Update note'}
              disabled={submitted}
            />
            <p className="text-center mt-3">
              {submitted && <div>Note has been updated successfully</div>}
            </p>
          </form>
        </div>
      )}
    </>
  )
}

export default UpdateNote
