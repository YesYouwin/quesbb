import Layout from './components/Layout'
import { useEffect, useState } from 'react'
import supabase from './supabase'
import './css/library.css'

function Library() {
  const [subject, setSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchSubjects() {
      const { data, error } = await supabase
        .from('subject')
        .select('subject_short_name, subject_full_name, course_name, prof_name, semester, des')

      console.log('Supabase data:', data)
      console.log('Supabase error:', error)

      if (error) {
        setErrorMessage(error.message)
      } else {
        setSubs(data ?? [])
      }

      setLoading(false)
    }

    fetchSubjects()}, [])

  const subjectCards = subject.map((subdata) => ({
    short_name: subdata.subject_short_name,
    full_name: subdata.subject_full_name,
    course_name: subdata.course_name,
    professor_name: subdata.prof_name,
    semester: subdata.semester,
    description: subdata.des,
  }))

  return (
    <Layout>
      <div>
        {loading && <p>Loading subjects...</p>}
        {errorMessage && <p>Supabase error: {errorMessage}</p>}
        {!loading && !errorMessage && subject.length === 0 && (<p>No subjects found.</p>)}
        <p className="semhead">Semester 1</p>
          <div className="lib-content">
            {subjectCards.map((s) => (
              <div className="card" key={s.course_name}>
                <div className="inner-card">
                   <p className="short_name">{s.short_name}</p>
                   <p className="full_name">{s.full_name}</p>
                   <p className="prof">Professor: {s.professor_name || "Unknown"}</p>
                   <p className="des">{s.description}</p>
                 </div>
               </div>
            ))}
            </div>
        </div>
    </Layout>
  )
}

export default Library