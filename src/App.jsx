import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './components/pages/Home.jsx'
import Header from './components/Header.jsx'
import GameRoom from './components/pages/GameRoom.jsx'
import CreateRoom from "./components/pages/CreateRoom.jsx";
import Error404Page from "./components/pages/Error404Page.jsx";
import Test from "./tests/TestSingingSong.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error404Page /> // TODO : change page
  },
  {
    path: '/new',
    element: <CreateRoom />
  },
  {
    path: '/room/:roomId',
    element: <GameRoom />,
  },
  {
    path: '/test', // TODO : TEMP !!
    element: <Test />
  },
  {
    path: '*',
    element: <Error404Page />,
  }
]);

function App() {
  return (
    <>
      <Header/>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
