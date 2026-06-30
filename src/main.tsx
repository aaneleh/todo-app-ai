import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import { Home, All, New, Settings } from './pages'
import Sidebar from './components/Sidebar';
import { TasksProvider } from './contexts/tasksContext';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TasksProvider>
      <Sidebar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/all" element={<All/>} />
          <Route path="/new" element={<New/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="*" element={<>Página não encontrada!</>} />
        </Routes>
      </main>
    </TasksProvider>
  </BrowserRouter>,
)
