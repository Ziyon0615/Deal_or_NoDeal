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
}: PrizePanelProps) {
  const sortedPrizes = [...prizes].sort((a, b) => b - a)
  const averageRemaining =
    remainingBoxes.length > 0
      ? Math.floor(remainingBoxes.reduce((total, value) => total + value, 0) / remainingBoxes.length)
      : 0

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
            Average Remaining
          </p>
          <p className="text-2xl font-black text-amber-100">{formatPiso(averageRemaining)}</p>
          <p className="mt-1 text-xs font-semibold text-stone-400">{remainingBoxes.length} briefcases still hidden</p>
        </div>
      )}

      <div className="rounded-lg border-2 border-amber-500/70 bg-black/80 p-4 backdrop-blur">
        <h3 className="sticky top-0 mb-3 bg-black py-1 text-xs font-black uppercase tracking-[0.32em] text-amber-300">
          Prize Amounts
        </h3>
        <div className="grid max-h-96 grid-cols-2 gap-2 overflow-y-auto pr-1">
          {sortedPrizes.map((prize) => {
            const prizeIndex = prizes.indexOf(prize)
            const isRevealed = revealedBoxes.includes(prizeIndex)
            const isFinalPlayerPrize = gameOver && !dealAccepted && playerBox === prizeIndex

            return (
              <div
                key={prize}
                className={`
                  flex min-h-9 items-center justify-between rounded-md px-2 py-2 text-[11px] font-black transition-all duration-300 md:text-xs
                  ${isFinalPlayerPrize
                    ? 'border-2 border-gold bg-gold/20 text-gold shadow-md shadow-amber-500/20'
                    : isRevealed
                    ? 'border border-red-500/45 bg-red-950/45 text-red-300/60 line-through opacity-60'
                    : 'border border-amber-500/35 bg-zinc-950 text-stone-100'
                  }
                `}
              >
                <span>{formatPiso(prize)}</span>
                <span>{isFinalPlayerPrize ? 'Final' : isRevealed ? 'Out' : ''}</span>
              </div>
            )
          })}
        </div>
      </div>

      {playerBox !== null && (
        <div className="rounded-lg border border-amber-500/50 bg-black/80 p-4 text-stone-200">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between gap-3">
              <span className="font-semibold">Revealed:</span>
              <span className="font-black text-amber-100">
                {revealedBoxes.length}/{totalRoundReveals}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-900 ring-1 ring-amber-500/40">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-gold to-amber-300 transition-all"
                style={{ width: `${Math.min(100, (revealedBoxes.length / totalRoundReveals) * 100)}%` }}
              />
            </div>
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
