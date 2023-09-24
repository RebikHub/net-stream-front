import { Link } from "react-router-dom"

export const Main = () => {
  return (
    <div>
      <Link style={{ padding: '2rem' }} to='/tv' >TV</Link>
      <Link style={{ padding: '2rem' }} to='/video' >Video</Link>
      <Link style={{ padding: '2rem' }} to='/stream' >Stream</Link>
    </div>
  )
}