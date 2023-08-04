import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Notes() {
  const url = `${import.meta.env.VITE_SERVER_URL}/api/notes`

  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Failed to fetch notes')
        }
        const data = await response.json()
        setNotes(data)
        setIsLoading(false)
      } catch (error) {
        setError('Error fetching notes')
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="pt-10 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center mb-10">
          <li className="bg-yellow-300 w-[250px] h-[150px] flex items-center justify-center">
            <Link to={'/new-note'}>+ Add New</Link>
          </li>
          {notes.map((note) => (
            <li
              className="relative bg-yellow-300 w-[250px] h-[150px] p-5"
              key={note._id}
            >
              <Link to={`/notes/${note._id}`}>
                <div className="absolute -top-5 -rotate-12 right-1/2 w-[20px] h-[30px] bg-orange-600"></div>
                <h2 className="font-bold mb-3">{note.title}</h2>
                <p>
                  {note.description.length > 50
                    ? `${note.description.substring(0, 50)}...`
                    : note.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Notes
