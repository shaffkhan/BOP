"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const features = [
  { id: "transfer", title: "Funds Transfer", icon: "💸", href: "/dashboard/transfer" },
  { id: "bill", title: "Bill Payment", icon: "📄", href: "#" },
  { id: "mobile", title: "Mobile Payment", icon: "📱", href: "#" },
  { id: "accounts", title: "Accounts", icon: "📊", href: "#" },
  { id: "cards", title: "Cards", icon: "💳", href: "#" },
  { id: "zakat", title: "Zakat / Donation", icon: "🤲", href: "#" },
  { id: "services", title: "Services", icon: "🏛️", href: "#" },
  { id: "roshan", title: "Roshan Digital Account", icon: "✨", href: "#" },
  { id: "vouchers", title: "Vouchers and MiniApps", icon: "🎫", href: "#" },
]

export function FeatureGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6"
    >
      {features.map((feature) => (
        <Link key={feature.id} href={feature.href}>
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h3 className="text-sm font-medium text-gray-900">{feature.title}</h3>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  )
}

