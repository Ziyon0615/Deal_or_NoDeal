import React from 'react'

interface PlayerBoxDisplayProps {
  boxNumber: number
  briefcaseAmount: number
  dealOffer: number | null
  gameOver: boolean
  winner: number | null
  dealAccepted: boolean
}

function formatPiso(amount: number) {
  return `Piso ${amount.toLocaleString()}`
}

export default function PlayerBoxDisplay({
  boxNumber,
  briefcaseAmount,
  dealOffer,
  gameOver,
  winner,
  dealAccepted,
}: PlayerBoxDisplayProps) {
  return (
    <section className="rounded-lg border-2 border-gold/70 bg-black/80 p-4 shadow-lg shadow-amber-900/30 md:p-5">
      <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-amber-500/60 bg-amber-500/10 p-4 text-center">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-amber-300">Selected Briefcase</p>
          <div className="mx-auto flex h-24 max-w-[10rem] items-center justify-center rounded-md border-2 border-gold bg-gradient-to-b from-gold to-amber-600 shadow-inner shadow-white/20">
            {gameOver ? (
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-black">Case #{boxNumber}</p>
                <p className="mt-1 text-2xl font-black text-black md:text-3xl">{formatPiso(briefcaseAmount)}</p>
              </div>
            ) : (
              <span className="text-5xl font-black text-black">#{boxNumber}</span>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-amber-500/60 bg-zinc-950 p-4 text-center">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-amber-300">
            {gameOver ? 'Result' : "Banker's Offer"}
          </p>
          <div className="flex min-h-24 items-center justify-center rounded-md border border-gold/50 bg-gold/10 px-3 py-4">
            {gameOver && winner !== null ? (
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-amber-200">
                  {dealAccepted ? 'You accepted the deal' : 'Your briefcase value'}
                </p>
                <p className="mt-1 text-3xl font-black text-gold md:text-4xl">{formatPiso(winner)}</p>
                {dealAccepted && (
                  <p className="mt-2 text-sm font-semibold text-amber-100">
                    Your briefcase had {formatPiso(briefcaseAmount)}
                  </p>
                )}
              </div>
            ) : dealOffer !== null ? (
              <p className="text-3xl font-black text-gold animate-offer-pop md:text-4xl">
                {formatPiso(dealOffer)}
              </p>
            ) : (
              <p className="text-sm font-semibold text-amber-100">Waiting for the first banker offer</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
