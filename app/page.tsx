'use client'

import { useRef, useState } from 'react'
import GameBoard from '@/components/GameBoard'
import PrizePanel from '@/components/PrizePanel'
import GameControls from '@/components/GameControls'
import DealModal from '@/components/DealModal'
import BankerPanel from '@/components/BankerPanel'
import PlayerBoxDisplay from '@/components/PlayerBoxDisplay'

const BASE_PRIZE_AMOUNTS = [
  2000, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 125, 150,
  175, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900,
  950, 1000,
]

const TOTAL_BOXES = 26
const TOTAL_ROUND_REVEALS = TOTAL_BOXES - 2
const ROUNDS = [6, 5, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1]

function shufflePrizes() {
  const prizes = [...BASE_PRIZE_AMOUNTS]

  for (let index = prizes.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const current = prizes[index]
    prizes[index] = prizes[randomIndex]
    prizes[randomIndex] = current
  }

  return prizes
}

function formatPiso(amount: number) {
  return `Piso ${amount.toLocaleString()}`
}

function roundOffer(amount: number) {
  if (amount >= 100) return Math.max(1, Math.round(amount / 10) * 10)
  return Math.max(1, Math.round(amount))
}

export default function Home() {
  const [gameActive, setGameActive] = useState(false)
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([])
  const [boxValues, setBoxValues] = useState<number[]>(BASE_PRIZE_AMOUNTS)
  const [playerBox, setPlayerBox] = useState<number | null>(null)
  const [dealOffer, setDealOffer] = useState<number | null>(null)
  const [showDealModal, setShowDealModal] = useState(false)
  const [isFinalOffer, setIsFinalOffer] = useState(false)
  const [dealAccepted, setDealAccepted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<number | null>(null)
  const [bankerMessage, setBankerMessage] = useState('')
  const [round, setRound] = useState(0)
  const [isFinalStageReady, setIsFinalStageReady] = useState(false)
  const [isFinalRevealPending, setIsFinalRevealPending] = useState(false)
  const [finalDuelAmounts, setFinalDuelAmounts] = useState<{ player: number; remaining: number } | null>(null)
  const finalRevealTimerRef = useRef<number | null>(null)

  const revealedBeforeRound = ROUNDS.slice(0, round).reduce((total, count) => total + count, 0)
  const openedThisRound = Math.max(0, selectedBoxes.length - revealedBeforeRound)
  const boxesRemainingThisRound = Math.max(0, ROUNDS[round] - openedThisRound)

  const playSound = (type: 'reveal' | 'offer' | 'deal' | 'win' | 'select') => {
    try {
      const AudioContextClass =
        window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

      if (!AudioContextClass) return

      const audioContext = new AudioContextClass()

      if (type === 'reveal') {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()
        osc.connect(gain)
        gain.connect(audioContext.destination)
        osc.frequency.value = 720
        gain.gain.setValueAtTime(0.25, audioContext.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.18)
        osc.start(audioContext.currentTime)
        osc.stop(audioContext.currentTime + 0.18)
      } else if (type === 'offer') {
        const duration = 1
        const pulseInterval = 0.32
        const pulseLength = 0.18
        const oscLow = audioContext.createOscillator()
        const oscHigh = audioContext.createOscillator()
        const gain = audioContext.createGain()

        oscLow.type = 'sine'
        oscHigh.type = 'sine'
        oscLow.frequency.value = 440
        oscHigh.frequency.value = 480
        oscLow.connect(gain)
        oscHigh.connect(gain)
        gain.connect(audioContext.destination)
        gain.gain.setValueAtTime(0, audioContext.currentTime)

        for (let tick = 0; tick < duration; tick += pulseInterval) {
          const start = audioContext.currentTime + tick
          const end = Math.min(start + pulseLength, audioContext.currentTime + duration)
          gain.gain.linearRampToValueAtTime(0.26, start + 0.02)
          gain.gain.setValueAtTime(0.26, end)
          gain.gain.linearRampToValueAtTime(0, Math.min(end + 0.04, audioContext.currentTime + duration))
        }

        oscLow.start(audioContext.currentTime)
        oscHigh.start(audioContext.currentTime)
        oscLow.stop(audioContext.currentTime + duration)
        oscHigh.stop(audioContext.currentTime + duration)
        oscHigh.onended = () => void audioContext.close()
      } else if (type === 'deal') {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()
        osc.connect(gain)
        gain.connect(audioContext.destination)
        osc.frequency.setValueAtTime(980, audioContext.currentTime)
        osc.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.35)
        gain.gain.setValueAtTime(0.35, audioContext.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.35)
        osc.start(audioContext.currentTime)
        osc.stop(audioContext.currentTime + 0.35)
      } else if (type === 'win') {
        const notes = [660, 880, 1100]
        notes.forEach((freq, index) => {
          const osc = audioContext.createOscillator()
          const gain = audioContext.createGain()
          osc.connect(gain)
          gain.connect(audioContext.destination)
          osc.frequency.value = freq
          gain.gain.setValueAtTime(0.2, audioContext.currentTime + index * 0.1)
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.25)
          osc.start(audioContext.currentTime + index * 0.1)
          osc.stop(audioContext.currentTime + index * 0.1 + 0.25)
        })
      }
    } catch {
      // Audio is optional; keep the game playable if the browser blocks it.
    }
  }

  const calculateBankerOffer = (revealedBoxes: number[], roundIndex: number) => {
    const remainingValues = boxValues.filter((_, index) => !revealedBoxes.includes(index))
    const average = remainingValues.reduce((total, value) => total + value, 0) / remainingValues.length
    const confidenceFactor = Math.min(0.62 + roundIndex * 0.07, 0.92)

    return roundOffer(average * confidenceFactor)
  }

  const makeBankerOffer = (revealedBoxes: number[], roundIndex: number) => {
    const offer = calculateBankerOffer(revealedBoxes, roundIndex)
    const finalOffer = revealedBoxes.length >= TOTAL_ROUND_REVEALS

    setDealOffer(offer)
    setIsFinalOffer(finalOffer)
    playSound('offer')

    setBankerMessage(finalOffer ? 'Last banker offer before the final stage...' : 'The banker is calculating the offer...')

    window.setTimeout(() => {
      setBankerMessage(
        finalOffer
          ? `Last offer: ${formatPiso(offer)}. Deal or No Deal?`
          : `The banker offers ${formatPiso(offer)}. Deal or No Deal?`
      )
      setShowDealModal(true)
    }, 650)
  }

  const startGame = () => {
    if (finalRevealTimerRef.current !== null) {
      window.clearTimeout(finalRevealTimerRef.current)
      finalRevealTimerRef.current = null
    }

    setGameActive(true)
    setSelectedBoxes([])
    setBoxValues(shufflePrizes())
    setPlayerBox(null)
    setDealOffer(null)
    setShowDealModal(false)
    setIsFinalOffer(false)
    setDealAccepted(false)
    setGameOver(false)
    setWinner(null)
    setRound(0)
    setIsFinalStageReady(false)
    setIsFinalRevealPending(false)
    setFinalDuelAmounts(null)
    setBankerMessage('Select your lucky briefcase from 1 to 26.')
  }

  const selectPlayerBox = (boxIndex: number) => {
    if (!gameActive || playerBox !== null) return

    setPlayerBox(boxIndex)
    setBankerMessage(`Briefcase ${boxIndex + 1} is yours. Open ${ROUNDS[0]} briefcases.`)
    playSound('select')
  }

  const revealBox = (boxIndex: number) => {
    if (!gameActive || gameOver || showDealModal || isFinalRevealPending || isFinalStageReady || playerBox === null) return
    if (boxIndex === playerBox || selectedBoxes.includes(boxIndex) || boxesRemainingThisRound === 0) return

    playSound('reveal')

    const newSelected = [...selectedBoxes, boxIndex]
    const revealedAmount = boxValues[boxIndex]
    setSelectedBoxes(newSelected)

    const messages = [
      `${formatPiso(revealedAmount)} is out of play.`,
      `Briefcase ${boxIndex + 1} had ${formatPiso(revealedAmount)}.`,
      `${formatPiso(revealedAmount)} has been removed from the board.`,
      `Opened briefcase ${boxIndex + 1}: ${formatPiso(revealedAmount)}.`,
    ]
    setBankerMessage(messages[Math.floor(Math.random() * messages.length)])

    const cumulativeTarget = ROUNDS.slice(0, round + 1).reduce((total, count) => total + count, 0)

    if (newSelected.length === cumulativeTarget) {
      makeBankerOffer(newSelected, round)
    }
  }

  const acceptDeal = () => {
    if (dealOffer === null) return

    playSound('deal')
    setShowDealModal(false)
    setDealAccepted(true)
    setBankerMessage(`Deal accepted. You won ${formatPiso(dealOffer)}.`)
    setGameOver(true)
    setWinner(dealOffer)
  }

  const revealFinal = () => {
    if (playerBox === null || !isFinalStageReady) return

    const remainingIndex = boxValues.findIndex((_, index) => index !== playerBox && !selectedBoxes.includes(index))
    if (remainingIndex < 0) return

    const finalAmount = boxValues[playerBox]
    const remainingAmount = boxValues[remainingIndex]
    if (typeof finalAmount !== 'number' || typeof remainingAmount !== 'number') return

    setShowDealModal(false)
    setDealAccepted(false)
    setFinalDuelAmounts({ player: finalAmount, remaining: remainingAmount })
    setWinner(Math.max(finalAmount, remainingAmount))
    setIsFinalRevealPending(true)
    setBankerMessage('Revealing the final two briefcases...')

    setSelectedBoxes((currentSelected) =>
      currentSelected.includes(remainingIndex) ? currentSelected : [...currentSelected, remainingIndex]
    )

    if (finalRevealTimerRef.current !== null) {
      window.clearTimeout(finalRevealTimerRef.current)
    }

    finalRevealTimerRef.current = window.setTimeout(() => {
      playSound('win')
      setBankerMessage(
        `Final comparison: your briefcase has ${formatPiso(finalAmount)} and the last briefcase has ${formatPiso(remainingAmount)}.`
      )
      setGameOver(true)
      setIsFinalRevealPending(false)
      setIsFinalStageReady(false)
      finalRevealTimerRef.current = null
    }, 1100)
  }

  const rejectDeal = () => {
    setShowDealModal(false)

    if (isFinalOffer) {
      setIsFinalStageReady(true)
      setBankerMessage('Final stage: only two briefcases remain. Reveal the final case when ready.')
      return
    }

    const nextRound = round + 1
    setRound(nextRound)
    setIsFinalOffer(false)
    setBankerMessage(`No Deal. Open ${ROUNDS[nextRound]} briefcase${ROUNDS[nextRound] === 1 ? '' : 's'}.`)
  }

  const remainingBoxes = boxValues.filter((_, index) => index !== playerBox && !selectedBoxes.includes(index))
  const finalCaseBoxIndex = boxValues.findIndex((_, index) => index !== playerBox && !selectedBoxes.includes(index))
  const isFinalStage = playerBox !== null && !gameOver && isFinalStageReady && remainingBoxes.length === 1
  const finalCaseBox = isFinalStage && finalCaseBoxIndex >= 0 ? finalCaseBoxIndex : null

  return (
    <main className="relative isolate min-h-screen bg-[radial-gradient(circle_at_top,#3a2a05_0%,#090909_38%,#000000_100%)] p-4 text-stone-100 md:p-8">
      {isFinalStage && !gameOver && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08)_0%,rgba(0,0,0,0.45)_42%,rgba(0,0,0,0.85)_100%)]" />
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center animate-slide-in md:mb-10">
          <p className="mb-2 text-3xl font-black uppercase tracking-[0.45em] text-amber-300">INFORMATICS COLLEGE MANILA</p>
          <h1 className="mb-2 text-5xl font-black tracking-wide text-gold drop-shadow-[0_0_18px_rgba(255,215,0,0.45)] md:text-7xl">
            DEAL OR NO DEAL
          </h1>
          <p className="text-base font-semibold text-amber-100 md:text-xl">
            26 briefcases. One banker. One final decision.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <PrizePanel
              prizes={boxValues}
              revealedBoxes={selectedBoxes}
              playerBox={playerBox}
              remainingBoxes={remainingBoxes}
              dealOffer={dealOffer}
              gameOver={gameOver}
              winner={winner}
              dealAccepted={dealAccepted}
              totalRoundReveals={TOTAL_ROUND_REVEALS}
            />
          </div>

          <div className="space-y-4 lg:col-span-3">
            <BankerPanel bankerMessage={bankerMessage || 'Press Start New Game to begin.'} />

            <GameBoard
              boxes={TOTAL_BOXES}
              boxValues={boxValues}
              playerBox={playerBox}
              selectedBoxes={selectedBoxes}
              onSelectBox={selectPlayerBox}
              onRevealBox={revealBox}
              gameStarted={gameActive}
              gameActive={gameActive && playerBox !== null && !showDealModal && !gameOver && !isFinalRevealPending && !isFinalStageReady}
              gameOver={gameOver}
              round={round}
              totalRounds={ROUNDS.length}
              boxesRemainingThisRound={boxesRemainingThisRound}
              revealPlayerBox={gameOver}
              isFinalStage={isFinalStage}
              finalCaseBox={finalCaseBox}
            />

            {playerBox !== null && (
              <PlayerBoxDisplay
                boxNumber={playerBox + 1}
                briefcaseAmount={boxValues[playerBox]}
                dealOffer={dealOffer}
                gameOver={gameOver}
                winner={winner}
                dealAccepted={dealAccepted}
                isFinalRevealPending={isFinalRevealPending}
                finalDuelAmounts={finalDuelAmounts}
              />
            )}

            <GameControls
              gameActive={gameActive}
              playerBoxSelected={playerBox !== null}
              gameOver={gameOver}
              onStart={startGame}
              finalStageReady={isFinalStageReady}
              onRevealFinal={revealFinal}
              revealedCount={selectedBoxes.length}
              totalToOpen={TOTAL_ROUND_REVEALS}
              round={round}
              totalRounds={ROUNDS.length}
              boxesRemainingThisRound={boxesRemainingThisRound}
            />
          </div>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-4 text-center text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/80">
          Developed by DSA
        </footer>
      </div>

      {showDealModal && dealOffer !== null && (
        <DealModal
          offer={dealOffer}
          isFinalOffer={isFinalOffer}
          onAccept={acceptDeal}
          onReject={rejectDeal}
        />
      )}
    </main>
  )
}
