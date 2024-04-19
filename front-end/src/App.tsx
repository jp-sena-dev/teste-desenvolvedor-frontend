import './App.scss';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { LeafletForm } from './components/pages/leaflet-form ';
import { LeafletResults } from './components/pages/leaflet-results';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/bulario/name/:name?/company/:company?/id/:id?" element={<LeafletResults />}/>
        <Route path="/" element={<LeafletForm />} />
      </>
    )
  );

  return (
    // <>
    //   <h1>Consultas</h1>
    //   <div className='divider'/>
    //   <main>
    <RouterProvider router={router} />
    //   </main>
    // </>
  )
}

export default App
