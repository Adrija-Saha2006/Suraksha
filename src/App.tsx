import { Route, Routes } from 'react-router-dom'

import { AppLayout } from './components/layout/AppLayout'
import ClaimTracking from './pages/ClaimTracking'
import Claims from './pages/Claims'
import Disaster from './pages/Disaster'
import Home from './pages/Home'
import Operations from './pages/Operations'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="claims" element={<Claims />} />
        <Route path="claims/:claimId" element={<ClaimTracking />} />
        <Route path="disaster" element={<Disaster />} />
        <Route path="operations" element={<Operations />} />
      </Route>
    </Routes>
  )
}
