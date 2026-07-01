"use client"

import React, { useEffect, useState } from 'react'

interface DealModalProps {
  offer: number
  isFinalOffer: boolean
  onAccept: () => void
  onReject: () => void
}

function formatPiso(amount: number) {
  return `Piso ${amount.toLocaleString()}`
}

export default function DealModal({ offer, isFinalOffer, onAccept, onReject }: DealModalProps) {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowAnimation(true), 80)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/86 p-4 backdrop-blur-md">
      <div
        className={`w-full max-w-md overflow-hidden rounded-lg border-2 border-gold bg-zinc-950 shadow-2xl shadow-amber-500/30 transition-all duration-500 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        <div className="border-b-2 border-gold bg-gradient-to-r from-black via-amber-950 to-black p-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.42em] text-amber-300">
            {isFinalOffer ? 'Last Banker Offer' : 'The Banker Calls'}
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-wider text-gold md:text-3xl">
            Deal or No Deal
          </h2>
        </div>

        <div className="p-6 text-center md:p-8">
          <p className="mb-4 text-base font-semibold text-amber-100">The banker is offering you</p>

          <div className="mb-6 rounded-lg border-2 border-gold bg-gold/10 p-6 shadow-lg shadow-amber-500/20">
            <div className="text-4xl font-black text-gold animate-offer-pop md:text-5xl">
              {formatPiso(offer)}
            </div>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.3em] text-amber-200">
              Cash offer
            </p>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-stone-300">
            {isFinalOffer
              ? 'This is the last banker offer before the final stage. Choose Deal to take the money, or No Deal to reveal the final briefcases.'
              : 'Take the guaranteed amount now, or keep opening briefcases for the next banker offer.'}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onAccept}
              className="rounded-md border-2 border-emerald-300 bg-emerald-600 px-4 py-4 text-base font-black uppercase text-white shadow-lg shadow-emerald-900/40 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 md:text-lg"
            >
              Deal
            </button>
            <button
              type="button"
              onClick={onReject}
              className="rounded-md border-2 border-red-300 bg-red-700 px-4 py-4 text-base font-black uppercase text-white shadow-lg shadow-red-950/40 transition duration-300 hover:-translate-y-0.5 hover:bg-red-600 md:text-lg"
            >
              No Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
