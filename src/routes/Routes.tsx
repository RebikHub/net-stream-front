import { Route, Routes } from "react-router-dom"
import { Tv } from "../pages/Tv"
import { Main } from "../pages/Main"
import { Stream } from "../pages/Stream"
import VueStream from "../pages/VueStream"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path='/tv' element={<Tv />} />
      <Route path="/video" element={<Stream />} />
      <Route path="/stream" element={<VueStream />} />
    </Routes>
  )
}