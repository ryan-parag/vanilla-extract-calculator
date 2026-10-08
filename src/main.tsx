import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.tsx'
import { ease } from './lib/motion'

// reducedMotion="user" drops movement (keeping fades) when the OS asks for less motion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user" transition={ease}>
      <App />
    </MotionConfig>
  </StrictMode>,
)
