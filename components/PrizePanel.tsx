import React from 'react'

interface PrizePanelProps {
  prizes: number[]
  revealedBoxes: number[]
  playerBox: number | null
  remainingBoxes: number[]
  dealOffer: number | null
  gameOver: boolean
  winner: number | null
  dealAccepted: boolean
  totalRoundReveals: number
}

function formatPiso(amount: number) {
  return `Piso ${amount.toLocaleString()}`
}

export default function PrizePanel({
  prizes,
  revealedBoxes,
  playerBox,
  remainingBoxes,
  dealOffer,
  gameOver,
  winner,
  dealAccepted,
  totalRoundReveals,
  showPrizeAmounts = false,
}: PrizePanelProps) {
  return (
    <aside className="space-y-3 lg:sticky lg:top-4">
      {gameOver && winner !== null && (
        <div className="rounded-lg border-2 border-gold bg-gold/10 p-5 shadow-lg shadow-amber-500/20">
          <h3 className="mb-2 text-xs font-black uppercase tracking-[0.32em] text-amber-300">
            {dealAccepted ? 'Deal Accepted' : 'Final Amount'}
          </h3>
          <div className="text-3xl font-black text-gold md:text-4xl">{formatPiso(winner)}</div>
        </div>
      )}

      {dealOffer !== null && !gameOver && (
        <div className="rounded-lg border-2 border-gold bg-gold/10 p-5 shadow-lg shadow-amber-500/20 animate-pulse-glow">
          <h3 className="mb-2 text-xs font-black uppercase tracking-[0.32em] text-amber-300">
            Banker's Offer
          </h3>
          <div className="text-3xl font-black text-gold md:text-4xl">{formatPiso(dealOffer)}</div>
          <p className="mt-2 text-xs font-semibold text-amber-200">Latest offer</p>
        </div>
      )}

      {remainingBoxes.length > 0 && !gameOver && (
        <div className="rounded-lg border border-amber-500/50 bg-black/80 p-4">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.32em] text-amber-300">
            Briefcases Still Hidden
          </p>
          <p className="text-2xl font-black text-amber-100">{remainingBoxes.length}</p>
          <p className="mt-1 text-xs font-semibold text-stone-400">
            {remainingBoxes.length} briefcases still hidden
          </p>
        </div>
      )}

      {playerBox !== null && (
        <div className="rounded-lg border border-amber-500/50 bg-black/80 p-4 text-stone-200">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between gap-3">
              <span className="font-semibold">Revealed:</span>
              <span className="font-black text-amber-100">
                {revealedBoxes.length}/{totalRoundReveals}
              </span>
            </div>
            <progress
              className="reveal-progress h-2 w-full rounded-full ring-1 ring-amber-500/40"
              max={totalRoundReveals}
              value={revealedBoxes.length}
            />
            <div className="flex justify-between gap-3">
              <span className="font-semibold">Hidden:</span>
              <span className="font-black text-amber-100">{remainingBoxes.length}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
