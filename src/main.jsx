import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/index.css'
import Karavan from './Karavan.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Karavan />
  // </StrictMode>
)