import { ChangeEventHandler, useEffect, useState } from 'react'
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
  const [boardHistory, setBoardHistory] = useState<BoardValues[]>([])
  const [viewingHistory, setViewingHistory] = useState(false)

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

  const handleHistoryScrubber: ChangeEventHandler<HTMLInputElement> = (e) => {
    setViewingHistory(true)

    const position = +e.target.value
    const stepValue = 1 / boardHistory.length

    const historyIdx = Math.min(
      Math.floor(position / stepValue),
      boardHistory.length - 1
    )

    setBoardValues(boardHistory[historyIdx])
  }

  const resetBoard = () => {
    setBoardValues(createNewBoard())
    setCurrentPlayer('x')
    setWinner(undefined)
    setBoardHistory([])
    setViewingHistory(false)
  }

  useEffect(() => {
    if (viewingHistory) return

    const currentWinner = calculateWinner()
    const full = boardValues.every((square) => !!square)

    if (currentWinner) {
      setWinner(currentWinner)
    } else if (full) {
      setWinner('draw')
    }

    setBoardHistory([...boardHistory, boardValues])
  }, [boardValues, viewingHistory])

  return (
    <>
      {defineSVGDefs()}
      <div
        className="flex flex-wrap aspect-square min-w-[40%]
    w-60 gap-2"
      >
        {boardValues.map((boardValue, idx) => (
          <div
            className="aspect-square border flex basis-[30%] justify-center items-center cursor-pointer select-none grow hover:shadow-md"
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
          <div className="flex">
            <label className="flex flex-col items-center mr-4">
              Game History
              <input
                type="range"
                min="0"
                max="1"
                step="any"
                onChange={handleHistoryScrubber}
              />
            </label>
            <button
              onClick={resetBoard}
              className="lato_bold border-2 border-indigo-300 rounded-lg px-4 py-2 shadow-md hover:scale-105 active:translate-y-1"
            >
              Reset Board
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Board
