/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'


const Table = ({matrix, isRowFlipping, flip}) => {
  const [flipRow, setFlipRow] = useState(-1)
  const [flipCol, setFlipCol] = useState(-1)


  const mouseEnterHandler = (rowIndex, colIndex) => () => {
    if(isRowFlipping){
      setFlipRow(rowIndex)
      setFlipCol(-1)
    }
    else {
      setFlipCol(colIndex)
      setFlipRow(-1)
    }
  }

  const mouseLeaveHandler = () => {
    setFlipRow(-1)
    setFlipCol(-1)
  }

  const isCellHighlighted = (rowIndex, colIndex) => {
    const n = matrix.length / 2;
    return rowIndex < n && colIndex < n ? 'highlight' : '';
  }

  const isCurrentCell = (isRowFlipping, rowIndex, colIndex) => {
    if ((isRowFlipping && rowIndex === flipRow) || (!isRowFlipping && colIndex === flipCol)) 
      return ('current')
    return ('')
  }

  return (
    <table className='matrix-table'>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((item, colIndex) => (
              <td key={colIndex}
              className={`cell 
                ${isCellHighlighted(rowIndex, colIndex)}
                ${isCurrentCell(isRowFlipping, rowIndex, colIndex)}`}
              onClick={() => flip(isRowFlipping, rowIndex, colIndex)}
              onMouseEnter={mouseEnterHandler(rowIndex, colIndex)}
              onMouseLeave={mouseLeaveHandler}
              >
                {item}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Sum = ({matrix}) => {
  const [sum, setSum] = useState(0)
  let currentSum = 0
  let maxSum = 0
  const n = matrix.length

  for(let i = 0; i < n / 2; i++){
    for(let j = 0; j < n / 2; j++){
      currentSum += matrix[i][j];
      maxSum += Math.max(matrix[i][j], matrix[i][n - 1 - j],
        matrix[n - 1 - i][j],
        matrix[n - 1 - i][n - 1 - j]
      )
    }
  }

  if (sum != currentSum) setSum(currentSum);

  return (
    <div className='sum'>
      <p>Current Sum : {sum}</p>
      <p>Desired Sum : {maxSum}</p>
    </div>
  )
}

const Matrix = ({isRowFlipping}) =>{
  const [matrix, setMatrix] = useState([
    [10, 20, 60, 70],
    [8, 10, 52, 66],
    [15, 5, 24, 34],
    [99, 13, 68, 44],
  ])

  const flip = (isFlippingRow, row, col) => {
    setMatrix(prevMatrix => {
      const newMatrix = prevMatrix.map(row => [...row]);

      if (isFlippingRow) {
        newMatrix[row] = [...newMatrix[row]].reverse();
      }
      else {
        for (let i = 0; i < newMatrix.length / 2; i++) {
          const temp = newMatrix[i][col]
          newMatrix[i][col] = newMatrix[newMatrix.length - 1 - i][col]
          newMatrix[newMatrix.length - 1 - i][col] = temp
        }
      }
      return newMatrix
    })
  }
  
  return (
    <>
      <Sum matrix={matrix} />
      <Table matrix={matrix} isRowFlipping={isRowFlipping} flip={flip} />
    </>
  )
}

function App() {
  const [isRowFlipping, setIsRowFlipping] = useState(true)

  return (
    <>
      <h1>Matrix flip</h1>
      <Matrix isRowFlipping={isRowFlipping} />
      <button onClick={() => setIsRowFlipping(!isRowFlipping)}>Switch</button>
    </>
  )
}

export default App
