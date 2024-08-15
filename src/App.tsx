import Board from './components/Board'

function App() {
  return (
    <div className="flex flex-col container mx-auto p-8 items-center">
      <h1 className="text-2xl mb-2">React TicTacToe</h1>
      <Board />
    </div>
  )
}

export default App
