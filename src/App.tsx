import Board from './components/Board'

function App() {
  return (
    <div className="flex flex-col container mx-auto p-8 items-center lato_regular">
      <h1 className="text-3xl mb-16">React TicTacToe</h1>
      <Board />
    </div>
  )
}

export default App
