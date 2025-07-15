"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, type PanInfo } from "framer-motion"

interface CardData {
  id: number
  img: string
}

interface StackProps {
  cardsData: CardData[]
  cardDimensions: { width: number; height: number }
  randomRotation?: boolean
  sensitivity?: number
  sendToBackOnClick?: boolean
  children?: React.ReactNode
}

export default function Stack({
  cardsData,
  cardDimensions,
  randomRotation = true,
  sensitivity = 150,
  sendToBackOnClick = true,
  children,
}: StackProps) {
  const [cards, setCards] = useState(cardsData)
  const [draggedCard, setDraggedCard] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize random rotations
  useEffect(() => {
    if (randomRotation) {
      setCards((prevCards) =>
        prevCards.map((card, index) => ({
          ...card,
          rotation: (Math.random() - 0.5) * 20, // Random rotation between -10 and 10 degrees
          zIndex: prevCards.length - index,
        })),
      )
    }
  }, [randomRotation])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, cardId: number) => {
    const { offset } = info
    const distance = Math.sqrt(offset.x ** 2 + offset.y ** 2)

    if (distance > sensitivity) {
      // Send card to back of stack
      setCards((prevCards) => {
        const draggedCardIndex = prevCards.findIndex((card) => card.id === cardId)
        if (draggedCardIndex === -1) return prevCards

        const draggedCard = prevCards[draggedCardIndex]
        const otherCards = prevCards.filter((card) => card.id !== cardId)

        return [
          {
            ...draggedCard,
            zIndex: 0,
            rotation: randomRotation ? (Math.random() - 0.5) * 20 : 0,
          },
          ...otherCards.map((card, index) => ({
            ...card,
            zIndex: index + 1,
          })),
        ]
      })
    }

    setDraggedCard(null)
  }

  const handleCardClick = (cardId: number) => {
    if (sendToBackOnClick && draggedCard === null) {
      setCards((prevCards) => {
        const clickedCardIndex = prevCards.findIndex((card) => card.id === cardId)
        if (clickedCardIndex === -1) return prevCards

        const clickedCard = prevCards[clickedCardIndex]
        const otherCards = prevCards.filter((card) => card.id !== cardId)

        return [
          {
            ...clickedCard,
            zIndex: 0,
            rotation: randomRotation ? (Math.random() - 0.5) * 20 : 0,
          },
          ...otherCards.map((card, index) => ({
            ...card,
            zIndex: index + 1,
          })),
        ]
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{
        width: cardDimensions.width + 40,
        height: cardDimensions.height + 40,
      }}
    >
      {cards.map((card, index) => {
        const x = 0
        const y = 0
        const rotate = 0

        return (
          <motion.div
            key={card.id}
            className="absolute cursor-grab active:cursor-grabbing"
            style={{
              width: cardDimensions.width,
              height: cardDimensions.height,
              x,
              y,
              rotate,
              zIndex: (card as any).zIndex || cards.length - index,
            }}
            initial={{
              rotate: (card as any).rotation || 0,
              scale: 1 - index * 0.02,
              y: index * -2,
            }}
            animate={{
              rotate: draggedCard === card.id ? 0 : (card as any).rotation || 0,
              scale: draggedCard === card.id ? 1.05 : 1 - index * 0.02,
              y: draggedCard === card.id ? 0 : index * -2,
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragElastic={0.2}
            onDragStart={() => setDraggedCard(card.id)}
            onDragEnd={(event, info) => handleDragEnd(event, info, card.id)}
            onClick={() => handleCardClick(card.id)}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {children ? (
              React.Children.toArray(children)[index]
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{card.img}</span>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
