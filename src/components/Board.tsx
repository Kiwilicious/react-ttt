import { useEffect, useState } from 'react'
import { defineSVGDefs, generateCircle, generateCross } from './BoardShapes'

type Player = 'x' | 'o'
type BoardValues = Array<Player>
type Winner = Player | 'draw'

const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const createNewBoard = () => new Array(9).fill('')

const Board = () => {
  const [boardValues, setBoardValues] = useState<BoardValues>(createNewBoard())
  const [currentPlayer, setCurrentPlayer] = useState<Player>('x')
  const [winner, setWinner] = useState<Winner>()

  const handleOnClick = (idx: number) => {
    if (boardValues[idx] || winner) return

    setBoardValues((prev) => {
      const copy = prev.slice()
      copy[idx] = currentPlayer
      return copy
    })
    setCurrentPlayer((prev) => {
      return prev === 'x' ? 'o' : 'x'
    })
  }

  const calculateWinner = (): Player | null => {
    for (let line of winLines) {
      const [a, b, c] = line

      if (
        boardValues[a] &&
        boardValues[a] === boardValues[b] &&
        boardValues[b] === boardValues[c]
      )
        return boardValues[a]
    }

    return null
  }

  const resetBoard = () => {
    setBoardValues(createNewBoard())
    setCurrentPlayer('x')
    setWinner(undefined)
  }

  useEffect(() => {
    const currentWinner = calculateWinner()
    const full = boardValues.every((square) => !!square)

    if (currentWinner) {
      setWinner(currentWinner)
    } else if (full) {
      setWinner('draw')
    }
  }, [boardValues])

  return (
    <>
      <div
        className="flex flex-wrap aspect-square min-w-[40%]
    w-60"
      >
        {defineSVGDefs()}
        {boardValues.map((boardValue, idx) => (
          <div
            className="aspect-square border flex basis-1/3 justify-center items-center cursor-pointer select-none"
            onClick={() => handleOnClick(idx)}
            key={idx}
          >
            {boardValue === 'x' && generateCross()}
            {boardValue === 'o' && generateCircle()}
          </div>
        ))}
      </div>
      {!winner && <div className="my-4 text-lg">{currentPlayer} to place</div>}
      {winner && (
        <div className="flex flex-col items-center text-lg">
          <div className="my-4">
            {winner === 'draw' ? 'Draw' : `${winner} wins`}
          </div>
          <button
            onClick={resetBoard}
            className="border-2 border-indigo-300 rounded-lg px-4 py-2"
          >
            Reset Game
          </button>
        </div>
      )}
    </>
  )
}

export default Board
