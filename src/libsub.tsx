import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from './components/Layout'
import supabase from './supabase'
import './css/libsub.css'
import { useMemo } from 'react'

type Question = {
  question: string
  answer: string
  xp: number
  unit: number
}

type SubjectInfo = {
  subject_short_name: string
  subject_full_name: string
  des: string
}

function SubjectQuestions() {
  const { subjectId } = useParams()
  const [subject, setSubject] = useState<SubjectInfo | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const byUnit = useMemo(() => {
    const map = new Map<number, Question[]>()
    for (const q of questions) {
      if (!map.has(q.unit)) map.set(q.unit, [])
      map.get(q.unit)!.push(q)
    }
    return [...map.entries()].sort(([a], [b]) => a - b)
  }, [questions])

  useEffect(() => { 
    let cancelled = false

    async function load() { 
      const [subRes, qRes] = await Promise.all([
        supabase.from('subject')
          .select('subject_short_name, subject_full_name, des')
          .eq('id', subjectId)
          .maybeSingle(),
        supabase.from('questions')
          .select('question, answer, xp, unit')
          .eq('subject', subjectId)
          .order('unit', {ascending: true})
      ])
      if (cancelled) { return }
      if (subRes.error || qRes.error) {
        setErrorMessage((subRes.error || qRes.error)!.message)
      } else { 
        setSubject(subRes.data)
        setQuestions(qRes.data ?? []) 
      }
      setLoading(false)
    }
    load()
    return () => { cancelled = true}
  }, [subjectId])

  return (
    <Layout>
        <Link className="back_but" to="/library">← Back To Library</Link>

        {loading && <p>Loading questions...</p>}
        {errorMessage && <p>Error: {errorMessage}</p>}
        {!loading && !errorMessage && !subject && <p>Subject not found.</p>}

        {subject && (
          <div className="everythong">
          <h1>{subject.subject_short_name}</h1>
          <h2>{subject.subject_full_name}</h2>
        
          {questions.length === 0 && <p>No questions yet.</p>}
        <div className="card-arranger">
          {byUnit.map(([unit, qs]) => (<section key={unit}>
              <h3 className="unit-head">Unit {unit}</h3>
          
          {qs.map((q, i) => (
            
            <div className="qa-card" key={i}>
              <p className="qa-question"> Q. {q.question} <span className="qa-xp">[{q.xp} XP]</span></p>
              <p className="qa-answer"> {q.answer}</p>
              </div>
          ))}
        </section>
          ))}
        </div>
      </div>
      )}
    </Layout>
  )
}

export default SubjectQuestions