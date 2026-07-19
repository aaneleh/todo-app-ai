import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import { Home, All, Chat, Settings } from './pages'
import Navbar from './components/Navbar';
import { TasksProvider } from './contexts/tasksContext';
import '../i18n.js'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TasksProvider>
      <Navbar/>
      <main>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/all" element={<All/>} />
            <Route path="/chat" element={<Chat/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="*" element={<>Página não encontrada!</>} />
        </Routes>
      </main>
    </TasksProvider>
  </BrowserRouter>,
)
