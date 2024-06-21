import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import css from './Home.module.scss'
import { FC } from 'react'

export const Home: FC = () => {
  return (
    <main>
      <Header />
      <div className={css.main}>
        <Outlet />
      </div>
    </main>
  )
}
