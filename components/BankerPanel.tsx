import React, { useEffect, useState } from 'react'

interface BankerPanelProps {
  bankerMessage: string
}

export default function BankerPanel({ bankerMessage }: BankerPanelProps) {
  const [displayMessage, setDisplayMessage] = useState(bankerMessage)

  useEffect(() => {
    setDisplayMessage(bankerMessage)
  }, [bankerMessage])

  return (
    <section className="rounded-lg border-2 border-gold/70 bg-black/80 p-4 shadow-xl shadow-amber-900/30 backdrop-blur md:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border-2 border-gold bg-gradient-to-b from-gold to-amber-700 shadow-lg shadow-amber-500/30 md:h-20 md:w-20">
          <span className="text-2xl font-black text-black md:text-3xl">B</span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="mb-2 text-xs font-black uppercase tracking-[0.32em] text-amber-300">
            Banker's Office
          </h3>
          <div className="relative rounded-lg border border-amber-500/50 bg-zinc-950 p-4">
            <p className="min-h-12 text-base font-semibold leading-relaxed text-stone-100 md:text-lg">
              {displayMessage}
            </p>
            <div className="absolute -left-2 top-4 h-4 w-4 rotate-45 border-b border-l border-amber-500/50 bg-zinc-950" />
          </div>
        </div>
      </div>
    </section>
  )
}
