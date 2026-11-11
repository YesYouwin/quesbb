import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Practice from './practice'
import Library from './library'
import About from './about'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App