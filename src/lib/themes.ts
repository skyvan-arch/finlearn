export interface Theme {
  slug: string
  name: string
  emoji: string
  description: string
  color: string       // accent color for cards / badges
  bg: string          // light tint for card background
}

export const THEMES: Theme[] = [
  {
    slug: "foundations",
    name: "Derivatives Foundations",
    emoji: "🏗️",
    description: "What derivatives are, how futures markets work, and how to hedge with them.",
    color: "#1a4a8a",
    bg: "#eff6ff",
  },
  {
    slug: "pricing-theory",
    name: "Pricing Theory",
    emoji: "📐",
    description: "Risk-neutral pricing, Black-Scholes-Merton, Itô's lemma, binomial trees, martingales.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    slug: "interest-rates",
    name: "Interest Rates",
    emoji: "💰",
    description: "Yield curves, duration, swaps, OIS discounting, SOFR, and fixed income mechanics.",
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    slug: "options",
    name: "Options",
    emoji: "📈",
    description: "Option mechanics, properties, strategies, employee options, and futures options.",
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    slug: "volatility",
    name: "Volatility & Greeks",
    emoji: "🌊",
    description: "The Greeks, volatility smiles, GARCH, EWMA, and stochastic volatility models.",
    color: "#dc2626",
    bg: "#fef2f2",
  },
  {
    slug: "rate-models",
    name: "Interest Rate Models",
    emoji: "🔬",
    description: "Hull-White, BDT, Black-Karasinski, HJM, the LIBOR Market Model, and calibration.",
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    slug: "credit",
    name: "Credit",
    emoji: "⚠️",
    description: "Credit spreads, CDS, CVA/DVA, Merton structural model, securitization, and CDOs.",
    color: "#9333ea",
    bg: "#faf5ff",
  },
  {
    slug: "risk",
    name: "Risk Management",
    emoji: "🛡️",
    description: "VaR, Expected Shortfall, Basel regulations, model risk, and risk-adjusted capital.",
    color: "#b45309",
    bg: "#fffbeb",
  },
  {
    slug: "exotics",
    name: "Exotic Options",
    emoji: "🎭",
    description: "Barrier, Asian, lookback, compound, chooser options and IR exotics like CMS.",
    color: "#c2410c",
    bg: "#fff7ed",
  },
]

export const THEME_MAP: Record<string, Theme> = Object.fromEntries(THEMES.map((t) => [t.slug, t]))
