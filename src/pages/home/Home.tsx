import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import css from './Home.module.scss'
// import { useHls } from '../../services/hls-hook/useHls';

export interface VideoOptionsType {
  autoplay: boolean
  controls: boolean
  responsive: boolean
  fluid: boolean
  sourceUrl: string
  sources: Array<{
    src: string
    type: string[]
  }>
}

export const Home = () => {
  return (
    <main>
      <Header />
      <div className={css.main}>
        <Outlet />
      </div>
    </main>
  )
}
