import React from 'react'

interface GameBoardProps {
  boxes: number
  boxValues: number[]
  playerBox: number | null
  selectedBoxes: number[]
  onSelectBox: (boxIndex: number) => void
  onRevealBox: (boxIndex: number) => void
  gameStarted: boolean
  gameActive: boolean
  gameOver: boolean
  round: number
  totalRounds: number
  boxesRemainingThisRound: number
  revealPlayerBox: boolean
}

function formatCompactPiso(amount: number) {
  if (amount >= 1000) return `${amount / 1000}K`
  return amount.toLocaleString()
}

export default function GameBoard({
  boxes,
  boxValues,
  playerBox,
  selectedBoxes,
  onSelectBox,
  onRevealBox,
  gameStarted,
  gameActive,
  gameOver,
  round,
  totalRounds,
  boxesRemainingThisRound,
  revealPlayerBox,
}: GameBoardProps) {
  const boxArray = Array.from({ length: boxes }, (_, index) => index)
  const isChoosingPlayerBox = gameStarted && playerBox === null && !gameOver

  return (
    <section className="rounded-lg border-2 border-amber-500/70 bg-black/80 p-4 shadow-2xl shadow-amber-900/30 backdrop-blur md:p-6">
      <div className="mb-5 flex flex-col gap-2 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-300">
            Briefcases 1 to 26
          </p>
          <h2 className="text-2xl font-black uppercase tracking-wider text-gold md:text-3xl">
            {playerBox === null ? 'Select Your Briefcase' : 'Open Briefcases'}
          </h2>
        </div>
        {playerBox !== null && !gameOver && (
          <div className="rounded-md border border-amber-500/50 bg-amber-500/10 px-4 py-2 text-sm font-bold text-amber-100">
            Round {round + 1}/{totalRounds}: open {boxesRemainingThisRound} more
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7">
        {boxArray.map((index) => {
          const isPlayerBox = playerBox === index
          const isRevealed = selectedBoxes.includes(index) || (isPlayerBox && revealPlayerBox)
          const canSelect = isChoosingPlayerBox
          const canReveal = gameActive && !isPlayerBox && !isRevealed
          const disabled = (!canSelect && !canReveal) || gameOver

          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                if (canSelect) onSelectBox(index)
                if (canReveal) onRevealBox(index)
              }}
              disabled={disabled}
              title={
                isRevealed
                  ? `Briefcase ${index + 1}: Piso ${boxValues[index].toLocaleString()}`
                  : isPlayerBox
                  ? `Your briefcase ${index + 1}`
                  : `Briefcase ${index + 1}`
              }
              className={`
                briefcase-button group relative h-20 overflow-visible rounded-md border transition duration-300 md:h-24
                ${isPlayerBox ? 'briefcase-owned border-gold shadow-lg shadow-amber-500/50' : ''}
                ${isRevealed ? 'briefcase-opened border-red-500/70' : ''}
                ${canSelect || canReveal ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/40' : 'cursor-not-allowed'}
                ${!gameStarted ? 'opacity-50' : ''}
              `}
            >
              <span className="briefcase-handle" />
              <span className="briefcase-lid" />
              <span className="briefcase-body">
                <span className="briefcase-number">
                  {isRevealed ? (
                    <>
                      <span className="text-[10px] uppercase tracking-wider text-red-100">Piso</span>
                      <span className="text-sm md:text-base">{formatCompactPiso(boxValues[index])}</span>
                    </>
                  ) : isPlayerBox ? (
                    <>
                      <span className="text-[10px] uppercase tracking-wider text-black">Yours</span>
                      <span>{index + 1}</span>
                    </>
                  ) : (
                    index + 1
                  )}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {playerBox !== null && !gameOver && (
        <div className="mt-6 rounded-lg border border-amber-500/50 bg-amber-950/35 p-4">
          <p className="text-center text-sm font-semibold text-amber-100 md:text-base">
            Your briefcase is #{playerBox + 1}. Open the requested briefcases to trigger the banker offer.
          </p>
        </div>
      )}

      {gameOver && playerBox !== null && (
        <div className="mt-6 rounded-lg border border-gold/70 bg-gold/10 p-4">
          <p className="text-center text-sm font-black uppercase tracking-wider text-gold md:text-base">
            Game complete
          </p>
        </div>
      )}
    </section>
  )
}
