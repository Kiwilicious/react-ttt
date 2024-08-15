import { useEffect, useState } from 'react'

type Player = 'x' | 'o'
type BoardValues = Array<Player>

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

const Board = () => {
  const [boardValues, setBoardValues] = useState<BoardValues>(
    new Array(9).fill('')
  )
  const [currentPlayer, setCurrentPlayer] = useState<Player>('x')
  const [winner, setWinner] = useState<Player | 'draw'>()

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
    setBoardValues(new Array(9).fill(''))
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
        className="flex flex-wrap aspect-square min-w-1/2
    w-60"
      >
        {boardValues.map((_, idx) => (
          <div
            className="w-20 aspect-square border flex justify-center items-center cursor-pointer select-none"
            onClick={() => handleOnClick(idx)}
            key={idx}
          >
            <span>{boardValues[idx] || ''}</span>
          </div>
        ))}
      </div>
      {!winner && <div className="m-2">{currentPlayer} to place</div>}
      {winner && (
        <div className="flex flex-col items-center">
          <div className="m-2">
            {winner === 'draw' ? 'Draw' : `${winner} wins`}
          </div>
          <button
            onClick={resetBoard}
            className="border-2 border-indigo-300 rounded p-2"
          >
            Reset Game
          </button>
        </div>
      )}
    </>
  )
}

export default Board
