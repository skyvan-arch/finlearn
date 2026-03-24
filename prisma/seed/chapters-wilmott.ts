// Wilmott "Paul Wilmott Introduces Quantitative Finance" — 6 core chapters

export const wilmottChapters = [
  {
    slug: "ch01-random-walk",
    chapterNumber: 1,
    title: "The Random Walk Hypothesis",
    partTitle: "Part One: Foundations",
    estimatedMins: 22,
    sortOrder: 1,
    lessonContent: `## The Random Walk Hypothesis

At the heart of quantitative finance is a model for how asset prices evolve over time. The starting point is the **random walk** — a process where successive price changes are independent and identically distributed.

### Brownian Motion

**Standard Brownian motion** (Wiener process) $W_t$ has three key properties:
1. $W_0 = 0$
2. Increments $W_{t+\\Delta t} - W_t$ are normally distributed with mean 0 and variance $\\Delta t$
3. Non-overlapping increments are independent

The key feature: the standard deviation of the path grows as $\\sqrt{T}$, not $T$. This is why uncertainty scales as the square root of time in options pricing.

### Geometric Brownian Motion (GBM)

Stock prices are better modelled as **geometric Brownian motion** to ensure non-negativity:

$$dS = \\mu S\\, dt + \\sigma S\\, dW$$

Dividing by $S$: $dS/S = \\mu\\, dt + \\sigma\\, dW$. So **log-returns** are normally distributed:

$$\\ln\\left(\\frac{S_{t+\\Delta t}}{S_t}\\right) \\sim N\\left((\\mu - \\frac{\\sigma^2}{2})\\Delta t,\\; \\sigma^2 \\Delta t\\right)$$

The $-\\sigma^2/2$ term (Ito correction) arises from Jensen's inequality — because $\\ln$ is concave, the mean of $\\ln(S)$ is below $\\ln$(mean of $S$).

### Itô's Lemma

When a function $f(S, t)$ depends on a stochastic variable $S$, its dynamics are given by **Itô's lemma**:

$$df = \\left(\\frac{\\partial f}{\\partial t} + \\mu S \\frac{\\partial f}{\\partial S} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 f}{\\partial S^2}\\right)dt + \\sigma S \\frac{\\partial f}{\\partial S} dW$$

The extra $\\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 f}{\\partial^2 S}$ term (the Itô correction) distinguishes stochastic calculus from ordinary calculus and is fundamental to all option pricing.`,
  },
  {
    slug: "ch02-bsm-equation",
    chapterNumber: 2,
    title: "The Black-Scholes-Merton Equation",
    partTitle: "Part One: Foundations",
    estimatedMins: 30,
    sortOrder: 2,
    lessonContent: `## The Black-Scholes-Merton Equation

The Black-Scholes-Merton (BSM) model is the cornerstone of options pricing. It derives a partial differential equation (PDE) for the value of any derivative on a stock following GBM.

### The Derivation: Delta Hedging

Consider a portfolio of one long option $V(S, t)$ and a short position of $\\Delta$ shares. The portfolio value is $\\Pi = V - \\Delta S$.

By Itô's lemma:
$$d\\Pi = \\left(\\frac{\\partial V}{\\partial t} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2}\\right)dt + \\left(\\frac{\\partial V}{\\partial S} - \\Delta\\right)dW$$

Choosing $\\Delta = \\frac{\\partial V}{\\partial S}$ eliminates the random term. The portfolio is then instantaneously risk-free and must earn the risk-free rate:

$$d\\Pi = r\\Pi\\, dt$$

Substituting and rearranging gives the **Black-Scholes PDE**:

$$\\frac{\\partial V}{\\partial t} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} + rS\\frac{\\partial V}{\\partial S} - rV = 0$$

### The BSM Formula

For a European call with strike $K$ and expiry $T$:

$$C = S N(d_1) - K e^{-r T} N(d_2)$$

$$d_1 = \\frac{\\ln(S/K) + (r + \\sigma^2/2)T}{\\sigma\\sqrt{T}}, \\quad d_2 = d_1 - \\sigma\\sqrt{T}$$

$N(\\cdot)$ is the standard normal CDF. The formula is independent of the expected return $\\mu$ — it was replaced by $r$ in the derivation through the delta-hedging argument. The only unobservable input is $\\sigma$.

### Key Assumptions

BSM assumes: continuous trading, no transaction costs, constant volatility, log-normal returns, no dividends, frictionless markets, and a constant risk-free rate. In practice all are violated to some degree, motivating extensions like stochastic volatility models.`,
  },
  {
    slug: "ch03-greeks",
    chapterNumber: 3,
    title: "The Greeks",
    partTitle: "Part Two: Risk Management",
    estimatedMins: 25,
    sortOrder: 3,
    lessonContent: `## The Greeks

The Greeks are partial derivatives of the option price with respect to various inputs. They quantify the sensitivities that options traders must manage.

### Delta and Gamma

**Delta** ($\\Delta = \\partial V / \\partial S$): Change in option value per $1 change in the underlying. For a call, $\\Delta = N(d_1) \\in [0,1]$; for a put, $\\Delta = N(d_1) - 1 \\in [-1, 0]$. Delta is the hedge ratio: holding $\\Delta$ shares hedges the option's directional risk.

**Gamma** ($\\Gamma = \\partial^2 V / \\partial S^2$): Rate of change of delta with respect to $S$; measures curvature of the option value. Gamma is always positive for long options. High gamma means the delta hedge needs frequent rebalancing. Gamma peaks at-the-money near expiry.

### Theta and Vega

**Theta** ($\\Theta = \\partial V / \\partial t$): Time decay — how much value the option loses per day purely from time passing. For long options, theta is negative (you lose value as expiry approaches). Short options have positive theta.

**Vega** ($\\mathcal{V} = \\partial V / \\partial \\sigma$): Sensitivity to volatility. Both calls and puts have positive vega — higher volatility increases option value. Vega is highest for at-the-money options with long time to expiry.

### The Delta-Gamma-Theta Relationship

For a delta-hedged portfolio, the BSM PDE reduces to:

$$\\Theta + \\frac{1}{2}\\sigma^2 S^2 \\Gamma = rV - rS\\Delta$$

Roughly: $\\Theta \\approx -\\frac{1}{2}\\sigma^2 S^2 \\Gamma$ for near-zero-interest-rate at-the-money options. **Gamma and theta trade off** — a long-gamma position loses theta. Options traders describe being "long gamma, short theta" (paying daily decay to benefit from large moves) or the reverse.

### Rho and Vanna

**Rho** ($\\rho = \\partial V / \\partial r$): Sensitivity to the risk-free rate. Important for long-dated options; less so for short-dated ones.

**Vanna** ($\\partial \\Delta / \\partial \\sigma$): How delta changes with volatility. Important for dynamic hedging in volatile regimes.`,
  },
  {
    slug: "ch04-delta-hedging",
    chapterNumber: 4,
    title: "Delta Hedging in Practice",
    partTitle: "Part Two: Risk Management",
    estimatedMins: 25,
    sortOrder: 4,
    lessonContent: `## Delta Hedging in Practice

In theory, continuous delta hedging eliminates all risk from an option position. In practice, it is costly, imperfect, and reveals the true nature of volatility trading.

### Discrete Rebalancing and Hedging Error

Continuous rebalancing is impossible — traders rebalance at discrete intervals (daily, or more frequently for near-expiry options). The resulting **hedging error** depends on gamma: the larger the gamma, the more the option moves in a non-linear fashion between rebalances, causing P&L leakage.

Over a small interval $\\delta t$, the P&L of a delta-hedged option position is approximately:

$$P\\&L \\approx \\frac{1}{2}\\Gamma(\\delta S)^2 - \\Theta \\delta t$$

This is the **gamma P&L** minus **theta cost**. If realized volatility exceeds implied volatility, the gamma gains outweigh the theta cost and the position profits.

### Implied vs Realized Volatility

The BSM model prices options using **implied volatility** ($\\sigma_{imp}$) — the volatility that makes the model price equal to the market price. The actual volatility that occurs is **realized volatility** ($\\sigma_{real}$).

A delta-hedged long-vega (long option) position profits when $\\sigma_{real} > \\sigma_{imp}$: gamma gains exceed theta cost. It loses when $\\sigma_{real} < \\sigma_{imp}$. **Volatility trading** is therefore a bet on the difference between implied and realized vol.

### Transaction Costs

Every rebalance incurs bid-ask spread costs. With a spread of $2s$ on the underlying, each rebalance of $|\\Delta\\delta|$ shares costs $2s|\\Delta\\delta|$. Over a large number of rebalances, total transaction costs grow as $\\sqrt{n}$ where $n$ is the number of rebalances — creating a tradeoff between hedge accuracy and cost. Practitioners hedge to a tolerance band rather than to an exact delta.`,
  },
  {
    slug: "ch05-volatility-surface",
    chapterNumber: 5,
    title: "Volatility Smiles and the Volatility Surface",
    partTitle: "Part Three: Beyond Black-Scholes",
    estimatedMins: 28,
    sortOrder: 5,
    lessonContent: `## Volatility Smiles and the Volatility Surface

If BSM were literally true, implied volatility would be the same for all strikes and maturities. It is not. The **volatility surface** — implied vol as a function of strike and expiry — is the central object of modern options practice.

### The Volatility Smile

In equity markets, implied volatility is typically higher for **low-strike (OTM put)** options than for high-strike options. This pattern is called the **volatility skew** or "smirk." It reflects two market realities:
1. **Fat left tails**: equity returns have larger downside moves than the lognormal model implies (crash risk)
2. **Supply/demand**: portfolio managers buy OTM puts for downside protection, driving up their implied vol

In FX markets, the smile is more symmetric: both OTM calls and puts trade at higher implied vol than ATM, reflecting the possibility of large moves in either direction.

### Term Structure of Volatility

Implied vol also varies by expiry. In normal times, long-dated options trade at lower vol than short-dated (vol mean reverts). In stress periods, short-dated vol spikes while long-dated vol moves less — the term structure inverts.

### Models Beyond BSM

Several approaches extend BSM to better fit the observed surface:
- **Local volatility** (Dupire): $\\sigma = \\sigma(S, t)$ — vol is a deterministic function of spot and time, calibrated to fit all market prices. Exactly fits the surface but predicts flat forward vol smiles.
- **Stochastic volatility** (Heston, SABR): vol itself follows a random process. SABR is dominant in interest rate options (caps/floors, swaptions) due to its tractable implied vol formula.
- **Jump-diffusion** (Merton): adds Poisson jumps to GBM, naturally generating fat tails and skew.`,
  },
  {
    slug: "ch06-numerical-methods",
    chapterNumber: 6,
    title: "Numerical Methods: Finite Differences and Monte Carlo",
    partTitle: "Part Four: Numerical Methods",
    estimatedMins: 28,
    sortOrder: 6,
    lessonContent: `## Numerical Methods: Finite Differences and Monte Carlo

Most real-world options lack closed-form BSM solutions: they are American, path-dependent, or have complex payoffs. Numerical methods are therefore essential.

### Finite Difference Methods (FDM)

FDM solves the BSM PDE numerically by discretising the $(S, t)$ grid. The key schemes:

**Explicit scheme**: Uses known values at the current time step to advance to the next. Simple to code but conditionally stable — requires small time steps ($\\Delta t \\leq \\Delta S^2 / \\sigma^2 S^2$) to avoid oscillations.

**Implicit scheme** (Crank-Nicolson): Averages explicit and fully implicit steps. Unconditionally stable and second-order accurate in both $\\Delta S$ and $\\Delta t$. Standard in practice. Requires solving a tridiagonal system at each time step.

**Early exercise (American options)**: At each grid node, the option value is set to $\\max(\\text{continuation value}, \\text{intrinsic value})$ — the holder exercises if it is optimal to do so.

### Monte Carlo Simulation

Monte Carlo simulates thousands of random paths for the underlying and averages the discounted payoff:

$$V \\approx e^{-rT} \\cdot \\frac{1}{N} \\sum_{i=1}^{N} \\text{Payoff}(S_T^{(i)})$$

Each path is generated as: $S_{t+\\Delta t} = S_t \\exp\\left((r - \\frac{\\sigma^2}{2})\\Delta t + \\sigma\\sqrt{\\Delta t}\\, Z\\right)$ where $Z \\sim N(0,1)$.

**Variance reduction**: Antithetic variates (for each path $Z$, also simulate $-Z$) roughly halves variance. Control variates use a known analytical solution (e.g., European option) to reduce error.

**Path-dependent options**: Monte Carlo handles path-dependent payoffs (Asian, barrier, lookback) naturally — FDM requires adding state variables, making them harder to apply.`,
  },
]
