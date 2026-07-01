import React from 'react'

interface GameControlsProps {
  gameActive: boolean
  playerBoxSelected: boolean
  gameOver: boolean
  onStart: () => void
  revealedCount: number
  totalToOpen: number
  round: number
  totalRounds: number
  boxesRemainingThisRound: number
}

export default function GameControls({
  gameActive,
  playerBoxSelected,
  gameOver,
  onStart,
  revealedCount,
  totalToOpen,
  round,
  totalRounds,
  boxesRemainingThisRound,
}: GameControlsProps) {
  const progress = Math.min(100, (revealedCount / totalToOpen) * 100)

  return (
    <section className="space-y-4">
      <button
        type="button"
        onClick={onStart}
        className="w-full rounded-md border-2 border-gold bg-gradient-to-r from-gold to-amber-600 px-6 py-4 text-lg font-black uppercase tracking-wider text-black shadow-lg shadow-amber-500/30 transition duration-300 hover:-translate-y-0.5 hover:from-amber-300 hover:to-gold md:text-xl"
      >
        {gameActive ? 'Start New Game' : 'Start Game'}
      </button>

      {gameActive && playerBoxSelected && (
        <div className="rounded-lg border border-amber-500/50 bg-black/80 p-4">
          <div className="mb-2 flex flex-col gap-1 text-sm font-bold text-amber-100 sm:flex-row sm:items-center sm:justify-between">
            <span>Round {Math.min(round + 1, totalRounds)} of {totalRounds}</span>
            <span>{gameOver ? 'Finished' : `${boxesRemainingThisRound} to open before banker offer`}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-zinc-900 ring-1 ring-amber-500/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-gold to-amber-300 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-center text-xs font-semibold text-stone-400">
            {revealedCount} of {totalToOpen} scheduled briefcases opened
          </p>
        </div>
      )}

      {gameActive && !playerBoxSelected && (
        <div className="rounded-lg border border-amber-500/50 bg-amber-950/30 p-4 text-center">
          <p className="font-semibold text-amber-100">Select one briefcase to keep as yours.</p>
        </div>
      )}
    </section>
  )
}
