// Hull "Options, Futures, and Other Derivatives" — all 28 chapters
// Each chapter has: slug, chapterNumber, title, partTitle, lessonContent, estimatedMins, sortOrder

export const hullChapters = [
  {
    slug: "ch01-introduction",
    theme: "foundations",
    chapterNumber: 1,
    title: "Introduction",
    partTitle: "Part One: Introduction",
    estimatedMins: 20,
    sortOrder: 1,
    lessonContent: `## Introduction to Derivatives

A **derivative** is a financial instrument whose value depends on (or is derived from) the value of some other underlying variable. The underlying asset can be a stock, bond, commodity, currency, index, or even another derivative. Derivatives are traded both on organized exchanges and in over-the-counter (OTC) markets.

### Exchange-Traded vs. OTC Derivatives

**Exchange-traded derivatives** are standardized contracts traded on regulated exchanges such as the Chicago Mercantile Exchange (CME). The exchange acts as intermediary, eliminating counterparty credit risk through a central clearing system and daily margin requirements.

**OTC derivatives** are privately negotiated between two parties (e.g., a bank and a corporate client). They are more flexible—terms can be customized—but carry counterparty credit risk. The 2008 financial crisis highlighted systemic risks in OTC markets, leading to regulatory reform requiring many OTC contracts to be centrally cleared.

### The Three Main Derivative Instruments

1. **Futures** (and forwards): Agreements to buy or sell an asset at a future date for a price agreed today. Futures are exchange-traded and standardized; forwards are OTC and customizable.

2. **Options**: Give the holder the *right but not the obligation* to buy (call) or sell (put) an asset at a specified price (strike) on or before a specified date (expiry).

3. **Swaps**: Agreements to exchange cash flows over a period. The most common is a plain vanilla interest rate swap: one party pays fixed, the other pays floating (LIBOR or SOFR).

### Market Participants

- **Hedgers** use derivatives to reduce risk. A wheat farmer might sell wheat futures to lock in a price.
- **Speculators** take positions to profit from anticipated price movements.
- **Arbitrageurs** exploit price discrepancies across markets for riskless profit.

Derivatives serve crucial economic functions: price discovery, risk transfer, and market efficiency. However, they can also amplify risk when used improperly—as demonstrated by Barings Bank (1995), Long-Term Capital Management (1998), and the 2008 subprime crisis.`,
  },
  {
    slug: "ch02-futures-markets",
    theme: "foundations",
    chapterNumber: 2,
    title: "Mechanics of Futures Markets",
    partTitle: "Part One: Introduction",
    estimatedMins: 25,
    sortOrder: 2,
    lessonContent: `## Mechanics of Futures Markets

A **futures contract** is an agreement to buy or sell an asset at a certain time in the future for a certain price. Unlike forwards, futures are traded on exchanges, standardized, and subject to daily settlement.

### Opening and Closing Positions

A trader who agrees to buy the underlying in a futures contract is said to take a **long position**; one who agrees to sell takes a **short position**. Most futures contracts are closed out before delivery—the trader enters an offsetting trade.

### Margin System

The futures exchange requires both parties to post **initial margin** (a performance bond, typically 5–15% of contract value). At the end of each trading day, **daily settlement** (mark-to-market) occurs: gains are added to the margin account and losses are subtracted. If the margin account falls below the **maintenance margin**, the trader receives a **margin call** requiring top-up to the initial margin.

This daily settlement essentially eliminates counterparty risk: losses are collected before they accumulate.

### Basis and Convergence

The **basis** is the difference between the spot price and the futures price: Basis = S - F. At expiry, the futures price must converge to the spot price (basis → 0). Prior to expiry, the basis can be positive (backwardation) or negative (contango).

### Forward vs. Futures Prices

For most underlying assets, forward prices and futures prices are approximately equal. They differ due to:
- The daily settlement cash-flow effect (futures involve intermediate cash flows)
- When the underlying asset is positively correlated with interest rates, futures prices exceed forward prices (and vice versa)

### Delivery

Futures contracts specify the delivery month and procedures. The **short** position chooses the exact delivery time and, in some contracts, the grade of the asset. This **quality option** and **timing option** have value to the short.`,
  },
  {
    slug: "ch03-hedging",
    theme: "foundations",
    chapterNumber: 3,
    title: "Hedging Strategies Using Futures",
    partTitle: "Part Two: Futures and Forward Markets",
    estimatedMins: 30,
    sortOrder: 3,
    lessonContent: `## Hedging Strategies Using Futures

Hedging uses futures to reduce exposure to price risk. A **long hedge** is used when you need to purchase an asset in the future and want to lock in the price. A **short hedge** is appropriate when you own an asset and want to protect against price declines.

### Basis Risk

A **perfect hedge** would eliminate all risk, but perfect hedges are rare. **Basis risk** arises because:
1. The asset being hedged may not match the futures contract exactly (cross hedging)
2. The hedger may be uncertain about the timing of the hedging need
3. The futures contract may need to be closed before its delivery month

Basis = Spot price of asset being hedged − Futures price of contract used

At initiation: b₁ = S₁ − F₁
At close-out: b₂ = S₂ − F₂

### Optimal Hedge Ratio

The **minimum variance hedge ratio** minimizes the variance of the hedged position:

$$h^* = \\rho \\times \\frac{\\sigma_S}{\\sigma_F}$$

Where ρ is the correlation between spot and futures price changes, σ_S is the standard deviation of spot price changes, and σ_F is the standard deviation of futures price changes.

The **optimal number of contracts** = h* × (Value of portfolio / Value of one futures contract)

### Cross Hedging

When no futures contract on the exact asset exists, traders use futures on a closely related asset. The effectiveness is measured by the R² of the regression of spot on futures price changes—higher R² means better hedge quality.

### Rolling the Hedge

If the hedging horizon exceeds available futures maturities, the hedger can **roll** the hedge: close the near-term futures and open a new longer-dated position. Each roll introduces additional basis risk.

### Hedging Equity Portfolios

To hedge an equity portfolio with index futures:
Number of contracts = β × (Portfolio value / Futures price × contract multiplier)

To change portfolio beta from β to β*, adjust the number of contracts accordingly: (β* − β) × (P / A)`,
  },
  {
    slug: "ch04-interest-rates",
    theme: "interest-rates",
    chapterNumber: 4,
    title: "Interest Rates",
    partTitle: "Part Two: Futures and Forward Markets",
    estimatedMins: 35,
    sortOrder: 4,
    lessonContent: `## Interest Rates

Interest rates are fundamental to the pricing of almost all derivatives. Understanding different compounding conventions and rate measures is essential.

### Compounding Conventions

Given a principal A and annual interest rate R:
- **Annual compounding**: A(1 + R)^n after n years
- **m-times per year**: A(1 + R/m)^(mn)
- **Continuous compounding**: Ae^(Rn)

To convert from m-times-per-year compounding R_m to continuous R_c:
R_c = m × ln(1 + R_m/m)
R_m = m × (e^(R_c/m) − 1)

### Zero Rates (Spot Rates)

The **n-year zero rate** (or spot rate) is the rate of interest for an investment with no intermediate payments. Zero rates are extracted from bond prices using the **bootstrap method**: start with short-maturity instruments and work forward.

### Forward Rates

The **forward rate** is the rate of interest implied by current zero rates for a period between two future dates. For continuous compounding:

R_F = (R₂T₂ − R₁T₁) / (T₂ − T₁)

where R₁ and R₂ are zero rates for maturities T₁ and T₂.

### Duration and Convexity

**Duration** (specifically Macaulay duration) measures the weighted average time to receive cash flows. **Modified duration** D* relates price sensitivity to yield changes:

ΔB ≈ −D* × B × Δy

**Convexity** captures the second-order effect:
ΔB ≈ −D* × B × Δy + ½ × C × B × (Δy)²

where C is convexity. High convexity bonds outperform low convexity bonds when yields change significantly in either direction.

### DV01

**DV01** (Dollar Value of a basis point) = −∂B/∂y × 0.0001 = D* × B × 0.0001

DV01 is widely used in practice for expressing interest rate sensitivity.

### OIS and SOFR

Post-2008 reform shifted from LIBOR to overnight risk-free rates. **SOFR** (Secured Overnight Financing Rate) is now the primary USD benchmark. **OIS** (Overnight Index Swap) rates are used for discounting collateralized derivatives.`,
  },
  {
    slug: "ch05-forward-futures-prices",
    theme: "pricing-theory",
    chapterNumber: 5,
    title: "Determination of Forward and Futures Prices",
    partTitle: "Part Two: Futures and Forward Markets",
    estimatedMins: 35,
    sortOrder: 5,
    lessonContent: `## Determination of Forward and Futures Prices

The key relationship: **no-arbitrage pricing**. If the forward price deviates from the theoretical value, arbitrageurs will trade to restore it.

### Investment Asset (No Income)

For a non-dividend-paying stock or zero-coupon bond:
**F₀ = S₀ × e^(rT)**

If F₀ > S₀e^(rT): borrow, buy spot, sell forward (cash-and-carry arbitrage).
If F₀ < S₀e^(rT): short spot, invest, buy forward (reverse cash-and-carry).

### Investment Asset with Known Income

If the asset pays known cash income with present value I:
**F₀ = (S₀ − I) × e^(rT)**

### Investment Asset with Known Yield

If the asset pays a continuous dividend yield q:
**F₀ = S₀ × e^((r−q)T)**

For stock indices, q = dividend yield. For currencies, q = foreign risk-free rate r_f (covered interest rate parity): F₀ = S₀ × e^((r−r_f)T).

### Consumption Assets: Convenience Yield

For commodities held for consumption (oil, gold), futures prices can be below the carry model due to the **convenience yield** y—the benefit of holding the physical commodity:
**F₀ = S₀ × e^((r+u−y)T)**

where u is storage cost as a fraction of spot price.

### Backwardation and Contango

- **Normal backwardation**: F₀ < E[S_T] (futures price below expected future spot)
- **Contango**: F₀ > E[S_T]
- **Backwardation** (cost of carry): F₀ < S₀ (futures below current spot—strong convenience yield)

### Value of Forward Contracts

After inception, a forward contract has value. A long forward with delivery price K and current forward price F₀:
**f = (F₀ − K) × e^(−rT)**

This means the value is zero at inception (K = F₀) but fluctuates as F₀ changes.`,
  },
  {
    slug: "ch06-interest-rate-futures",
    theme: "interest-rates",
    chapterNumber: 6,
    title: "Interest Rate Futures",
    partTitle: "Part Two: Futures and Forward Markets",
    estimatedMins: 30,
    sortOrder: 6,
    lessonContent: `## Interest Rate Futures

### Eurodollar / SOFR Futures

**Eurodollar futures** (now transitioning to SOFR futures) are based on 3-month LIBOR/SOFR rates. The contract price is quoted as 100 minus the annualized interest rate. The contract size is $1,000,000.

The **convexity adjustment** reconciles futures rates with forward rates. Because futures are marked to market daily and interest rates are correlated with futures prices, futures rates tend to be *higher* than forward rates. The adjustment is approximately:

Convexity adjustment ≈ ½ × σ² × T₁ × T₂

where σ is the volatility of short rates, T₁ is the futures expiration, and T₂ is the end of the reference period.

### Treasury Bond Futures

The **T-Bond futures contract** (CME) specifies delivery of a Treasury bond with a face value of $100,000. Because many bonds are eligible for delivery, the exchange uses a **conversion factor (CF)** system.

Invoice price = (Futures settlement price × CF) + Accrued interest

The short delivers whichever bond minimizes their cost—this is the **cheapest-to-deliver (CTD) bond**. The CTD is identified by minimizing: Quoted bond price − CF × Futures price.

### Duration-Based Hedging

To hedge a bond portfolio against interest rate movements:
Number of futures contracts = (P × D_P) / (F × D_F)

where P is portfolio value, D_P is portfolio duration, F is futures price, D_F is futures duration (typically of CTD bond / CF).

To change duration from D_P to D_T:
Number of contracts = [(D_T − D_P) × P] / [D_F × F]

### Federal Funds Rate Futures

Fed Funds futures allow participants to speculate on or hedge against Federal Reserve policy rate decisions. Each contract settles against the average daily Fed Funds rate for the delivery month.`,
  },
  {
    slug: "ch07-swaps",
    theme: "interest-rates",
    chapterNumber: 7,
    title: "Swaps",
    partTitle: "Part Three: Swaps",
    estimatedMins: 35,
    sortOrder: 7,
    lessonContent: `## Swaps

A **swap** is an OTC agreement between two parties to exchange cash flows at specified future dates. The cash flows are typically based on a notional principal amount that itself is not exchanged.

### Plain Vanilla Interest Rate Swap

The most common swap: Party A pays a **fixed rate** to Party B, who pays a **floating rate** (e.g., 3-month SOFR) to Party A. Both rates apply to the same notional principal, settled net.

**Why enter a swap?** A company with floating-rate debt can swap to fixed; a bank with fixed-rate assets can swap to floating. Swaps allow parties to transform the nature of their liabilities.

### Swap Valuation

A plain vanilla IRS can be valued as a **portfolio of forward rate agreements (FRAs)** or as the difference between two bond positions:

Value to fixed-rate payer = B_float − B_fixed

where B_float is the value of a floating-rate bond and B_fixed is the value of a fixed-rate bond with the swap's coupon.

### OIS Discounting

Post-crisis, **OIS rates** (Overnight Index Swap rates, now SOFR-based) are used to discount collateralized derivative cash flows. LIBOR discounting has been replaced. For a collateralized swap, cash flows are discounted at OIS rates, while forward SOFR rates are projected from the SOFR curve.

### Currency Swaps

A **currency swap** involves exchanging principal and interest payments in two different currencies. Unlike interest rate swaps, the principal amounts are exchanged at the start and the end.

Valuation: Each leg is valued as a bond in the respective currency; the swap value is the difference.

### Credit Risk in Swaps

The credit risk exposure of a swap is roughly proportional to its duration × notional × volatility. Netting agreements and collateral (ISDA CSA) reduce exposure substantially. Central clearing now handles most standardized swaps.`,
  },
  {
    slug: "ch08-securitization",
    theme: "credit",
    chapterNumber: 8,
    title: "Securitization and the Credit Crisis of 2007",
    partTitle: "Part Three: Swaps",
    estimatedMins: 25,
    sortOrder: 8,
    lessonContent: `## Securitization and the Credit Crisis of 2007

### What is Securitization?

**Securitization** is the process of pooling assets (mortgages, auto loans, credit card receivables) and issuing securities backed by those cash flows. The pooled assets are transferred to a **Special Purpose Vehicle (SPV)**, which issues tranches of debt with different seniority.

### CDOs and the Subprime Crisis

**Collateralized Debt Obligations (CDOs)** pool existing asset-backed securities. **CDO²** pools tranches from other CDOs. The demand for AAA-rated instruments (driven by regulation and investor mandates) led to increasingly complex structures where sub-investment-grade mortgages were repackaged into ostensibly safe securities.

Key failure points:
1. **Correlation risk**: All tranches were exposed to the same systematic mortgage risk; diversification was illusory
2. **Model risk**: Gaussian copula models severely underestimated tail correlation
3. **Agency problems**: Originators (mortgage brokers) had no skin-in-the-game; they sold loans immediately
4. **Rating agency failures**: AAA ratings were granted to instruments with embedded systemic risk

### ABCP and Liquidity

Asset-backed commercial paper (ABCP) conduits funded long-term mortgage assets with short-term commercial paper. When money market funds refused to roll over CP in August 2007, conduits collapsed, forcing banks to bring SPVs onto balance sheets.

### Regulatory Response

Post-crisis reforms included:
- Basel III: Higher capital requirements, leverage ratios, liquidity coverage ratios
- Dodd-Frank Act: Mandatory central clearing for standardized OTC derivatives, skin-in-the-game rules for securitizers
- Volcker Rule: Restrictions on proprietary trading by deposit-taking banks`,
  },
  {
    slug: "ch09-ois-discounting",
    theme: "interest-rates",
    chapterNumber: 9,
    title: "OIS Discounting, Credit Issues, and Funding Costs",
    partTitle: "Part Three: Swaps",
    estimatedMins: 30,
    sortOrder: 9,
    lessonContent: `## OIS Discounting, Credit Issues, and Funding Costs

### The Transition from LIBOR

Pre-2012, derivatives were discounted using LIBOR rates. The discovery that LIBOR was being manipulated (the "LIBOR scandal") and recognition that LIBOR included bank credit risk led to a fundamental shift: collateralized derivatives should be discounted at risk-free rates.

### OIS Discounting

For a **fully collateralized derivative** under a daily-margined CSA, the appropriate discount rate is the **overnight rate** (Fed Funds, SOFR). An OIS swap has cash flows tied to the compounded overnight rate.

The key insight: when a derivative is collateralized, the collateral earns the overnight rate. The opportunity cost of that collateral is the OIS rate. Therefore, the present value of future cash flows should use OIS rates as discount rates.

### Multi-Curve Framework

Post-transition, practitioners build:
1. **Discount curve**: OIS rates (SOFR in USD, ESTR in EUR)
2. **Projection curves**: One per tenor (1M SOFR, 3M SOFR, etc.)

Forward rates for floating legs come from the projection curves; discount factors come from the OIS curve.

### CVA, DVA, and FVA

**CVA (Credit Valuation Adjustment)**: The reduction in derivative value due to counterparty default risk. CVA = −LGD × ∫ PD(t) × EE(t) × D(t) dt

**DVA (Debt Valuation Adjustment)**: The positive adjustment due to own credit risk. DVA is the counterparty's CVA.

**FVA (Funding Valuation Adjustment)**: The cost of funding uncollateralized derivatives. FVA = ∫ [u(t) − r_f(t)] × FCA(t) × D(t) dt

These "xVA" adjustments are now standard in derivative pricing desks and have significant P&L impact.`,
  },
  {
    slug: "ch10-options-mechanics",
    theme: "options",
    chapterNumber: 10,
    title: "Mechanics of Options Markets",
    partTitle: "Part Four: Options",
    estimatedMins: 25,
    sortOrder: 10,
    lessonContent: `## Mechanics of Options Markets

### Call and Put Options

A **call option** gives the holder the right (but not the obligation) to *buy* an asset at the **strike price K** on or before the **expiry date T**. A **put option** gives the right to *sell*.

**American options** can be exercised at any time up to expiry. **European options** can only be exercised at expiry. Most exchange-traded equity options are American.

### Payoffs

At expiry:
- Long call payoff: max(S_T − K, 0)
- Long put payoff: max(K − S_T, 0)
- Short call payoff: −max(S_T − K, 0)
- Short put payoff: −max(K − S_T, 0)

### Moneyness

- **In the money (ITM)**: Exercise would be profitable: S > K for call, S < K for put
- **At the money (ATM)**: S ≈ K
- **Out of the money (OTM)**: Exercise would not be profitable

### Intrinsic and Time Value

**Intrinsic value** = max(S − K, 0) for calls, max(K − S, 0) for puts. It's the payoff if exercised immediately.

**Time value** = Option price − Intrinsic value. Time value is always ≥ 0 (an option is worth at least its intrinsic value). It reflects the value of the optionality remaining before expiry.

### Exchange Mechanics

Exchange-traded options have:
- Standardized strikes and expiries (monthly, weekly)
- Margin requirements for short positions
- Central clearing through the OCC (Options Clearing Corporation)
- Bid-ask spreads quoted in dollars per share

Options are quoted as price per share; standard contract covers 100 shares.`,
  },
  {
    slug: "ch11-option-properties",
    theme: "options",
    chapterNumber: 11,
    title: "Properties of Stock Options",
    partTitle: "Part Four: Options",
    estimatedMins: 35,
    sortOrder: 11,
    lessonContent: `## Properties of Stock Options

### Factors Affecting Option Prices

| Factor | Call | Put |
|--------|------|-----|
| Stock price S↑ | ↑ | ↓ |
| Strike K↑ | ↓ | ↑ |
| Time to expiry T↑ | ↑ (usually) | ↑ (usually) |
| Volatility σ↑ | ↑ | ↑ |
| Risk-free rate r↑ | ↑ | ↓ |
| Dividends↑ | ↓ | ↑ |

### Upper and Lower Bounds

For non-dividend-paying stocks:

**Call bounds**:
- Upper: c ≤ S
- Lower (European): c ≥ max(S − Ke^(−rT), 0)

**Put bounds**:
- Upper (European): p ≤ Ke^(−rT)
- Lower (European): p ≥ max(Ke^(−rT) − S, 0)

### Put-Call Parity

For European options on non-dividend-paying stocks:
**c + Ke^(−rT) = p + S**

This is derived by comparing two portfolios: (1) long call + PV(K) and (2) long put + stock. Both have identical payoffs at expiry, so they must have equal present value.

For American options: S − K ≤ C − P ≤ S − Ke^(−rT)

### Early Exercise

**American calls on non-dividend-paying stocks** should never be exercised early (it's always better to sell). A call is worth more alive than dead because:
1. Interest is earned on K if exercise is delayed
2. Time value is lost upon exercise
3. Downside is protected

**American puts** can optimally be exercised early when deep in the money (the interest earned on K outweighs time value and downside protection). Thus C = c for non-dividend-paying stocks, but P > p generally.`,
  },
  {
    slug: "ch12-option-strategies",
    theme: "options",
    chapterNumber: 12,
    title: "Trading Strategies Involving Options",
    partTitle: "Part Four: Options",
    estimatedMins: 30,
    sortOrder: 12,
    lessonContent: `## Trading Strategies Involving Options

### Spreads

A **spread** involves positions in two or more options of the same type (all calls or all puts).

**Bull call spread**: Buy call K₁, sell call K₂ (K₂ > K₁). Limits both upside and cost.
- Max profit: K₂ − K₁ − net premium
- Max loss: net premium paid
- Breakeven: K₁ + net premium

**Bear put spread**: Buy put K₂, sell put K₁ (K₂ > K₁). Profits from moderate decline.

**Butterfly spread**: Buy K₁ call, sell 2 K₂ calls, buy K₃ call (K₁ < K₂ < K₃, equally spaced). Profits if stock stays near K₂. Limited risk and reward.

### Combinations

**Straddle**: Buy call and put at same K and T. Profits from large moves in either direction. Expensive because you pay two premiums.

**Strangle**: Buy OTM call and OTM put. Cheaper than straddle; requires larger move to profit.

**Strip**: Two puts + one call (bearish bias). **Strap**: Two calls + one put (bullish bias).

### Covered Call and Protective Put

**Covered call**: Long stock + short call. Generates premium income; limits upside. This is equivalent to a short put (by put-call parity).

**Protective put**: Long stock + long put = portfolio insurance. Equivalent to a long call + bonds.

### Calendar Spreads

**Calendar spread**: Sell near-dated option, buy far-dated option at same strike. Profits from time decay of near option if stock stays near strike. The position has positive theta initially but becomes complex near near-expiry.`,
  },
  {
    slug: "ch13-binomial-trees",
    theme: "pricing-theory",
    chapterNumber: 13,
    title: "Binomial Trees",
    partTitle: "Part Four: Options",
    estimatedMins: 40,
    sortOrder: 13,
    lessonContent: `## Binomial Trees

The binomial tree is a discrete-time model for option pricing that converges to the Black-Scholes formula as the number of steps increases.

### One-Step Model

A stock is currently worth S₀. Over one period Δt, it either rises to Su (up factor u) or falls to Sd (down factor d).

**Risk-neutral pricing**: Under the risk-neutral measure, the probability of an up-move is:
**p = (e^(rΔt) − d) / (u − d)**

The option is priced as the discounted expected payoff under this measure:
**f = e^(−rΔt) [p × f_u + (1−p) × f_d]**

### Delta and Replication

The **option delta** (Δ) is the number of shares in the replicating portfolio:
**Δ = (f_u − f_d) / (Su − Sd)**

Key insight: we can replicate any option payoff with a position in the stock plus borrowing/lending. The option price equals the cost of this replicating portfolio, regardless of real-world probabilities.

### Multi-Step Trees

For an n-step tree, we work backwards: value the option at each terminal node, then discount back one step at a time using the risk-neutral probabilities.

### CRR Parameterization

Cox-Ross-Rubinstein (1979):
u = e^(σ√Δt), d = 1/u = e^(−σ√Δt)

This ensures the tree matches the true volatility of the underlying.

### American Options on Trees

At each node, compare the intrinsic value (immediate exercise) against the continuation value (discounted expected future value). Take the maximum:
**f = max(intrinsic, e^(−rΔt)[p×f_u + (1−p)×f_d])**

### Dividends on Trees

Known discrete dividends: subtract PV of dividends from current stock price before building the tree. This preserves the recombining property.`,
  },
  {
    slug: "ch14-wiener-ito",
    theme: "pricing-theory",
    chapterNumber: 14,
    title: "Wiener Processes and Itô's Lemma",
    partTitle: "Part Four: Options",
    estimatedMins: 45,
    sortOrder: 14,
    lessonContent: `## Wiener Processes and Itô's Lemma

### Markov Property

A **Markov process** has the property that only the current state matters for predicting future values—past history is irrelevant. Stock prices are assumed to follow a Markov process (reflecting the weak form of market efficiency).

### Wiener Process (Standard Brownian Motion)

A **Wiener process** z(t) satisfies:
1. Δz = ε√Δt where ε ~ N(0,1)
2. Values of Δz for non-overlapping intervals are independent
3. z(0) = 0

Properties: E[Δz] = 0, Var[Δz] = Δt, so the standard deviation grows as √T (not T).

### Generalized Brownian Motion (GBM)

**dx = a dt + b dz**

where a is the **drift** and b is the **diffusion coefficient**. For a stock price:
**dS = μS dt + σS dz**

This is **Geometric Brownian Motion** — the percentage changes are normally distributed. Equivalently:
**d(ln S) = (μ − σ²/2)dt + σdz**

So ln(S_T/S₀) ~ N[(μ − σ²/2)T, σ²T].

### Itô's Lemma

For a function G(S, t) where S follows dS = a dt + b dz:

**dG = (∂G/∂S × a + ∂G/∂t + ½ × ∂²G/∂S² × b²)dt + ∂G/∂S × b × dz**

The extra term ½∂²G/∂S² × b² dt is the **Itô correction** — absent in ordinary calculus. It arises because (dz)² = dt (not zero).

### Application to Lognormal Stock Prices

Applying Itô's lemma to G = ln(S):
d(ln S) = (μ − σ²/2)dt + σdz

Thus: ln(S_T) − ln(S₀) ~ N[(μ − σ²/2)T, σ²T]

Stock prices are **lognormally distributed** under GBM, with the key consequence that the *continuously compounded* return over T years has mean (μ − σ²/2)T.`,
  },
  {
    slug: "ch15-black-scholes",
    theme: "pricing-theory",
    chapterNumber: 15,
    title: "The Black-Scholes-Merton Model",
    partTitle: "Part Four: Options",
    estimatedMins: 50,
    sortOrder: 15,
    lessonContent: `## The Black-Scholes-Merton Model

### Assumptions

The BSM model assumes:
1. The stock price follows GBM with constant μ and constant σ
2. No dividends during the option's life
3. No transaction costs or taxes
4. Continuous trading is possible
5. The risk-free rate r is constant and the same for all maturities
6. There are no arbitrage opportunities

### The Black-Scholes-Merton PDE

Using delta-hedging arguments (or the replicating portfolio), BSM derived that any derivative f(S, t) must satisfy:

**∂f/∂t + rS∂f/∂S + ½σ²S²∂²f/∂S² = rf**

The boundary condition determines the specific derivative.

### Option Pricing Formulas

For a European call on a non-dividend-paying stock:
**c = S₀N(d₁) − Ke^(−rT)N(d₂)**

For a European put:
**p = Ke^(−rT)N(−d₂) − S₀N(−d₁)**

Where:
**d₁ = [ln(S₀/K) + (r + σ²/2)T] / (σ√T)**
**d₂ = d₁ − σ√T**

N(·) is the cumulative standard normal distribution.

### Interpretation

- **N(d₂)**: Risk-neutral probability that the call expires in the money
- **N(d₁)**: Delta of the call; the expected value of S_T given S_T > K, discounted at the risk-free rate, divided by S₀
- The term S₀N(d₁) is the expected benefit of receiving the stock conditional on exercise
- Ke^(−rT)N(d₂) is the PV of paying K conditional on exercise

### With Dividends (Merton Extension)

For a continuous dividend yield q:
**c = S₀e^(−qT)N(d₁) − Ke^(−rT)N(d₂)**

where d₁ = [ln(S₀/K) + (r − q + σ²/2)T] / (σ√T)

### Implied Volatility

The one parameter not directly observable is σ. **Implied volatility** (IV) is the value of σ that makes the BSM formula equal the observed market price. IV is the market's consensus forecast of future volatility.`,
  },
  {
    slug: "ch16-employee-options",
    theme: "options",
    chapterNumber: 16,
    title: "Employee Stock Options",
    partTitle: "Part Four: Options",
    estimatedMins: 20,
    sortOrder: 16,
    lessonContent: `## Employee Stock Options

### Structure of ESOs

**Employee Stock Options (ESOs)** are call options granted by a company to its employees, giving them the right to buy company shares at the **grant price** (usually the stock price at grant date) after a **vesting period** (typically 3–4 years).

Unlike exchange-traded options, ESOs cannot be sold or transferred. Employees must exercise and sell the stock, or hold the shares. If an employee leaves before vesting, unvested options are forfeited.

### Accounting for ESOs (ASC 718 / IFRS 2)

Under GAAP (ASC 718) and IFRS 2, companies must **expense** the fair value of ESOs at the grant date, amortized over the vesting period. The expense is based on an option pricing model (usually BSM or a binomial model with adjustments).

### Adjustments to Standard BSM

Key adjustments for ESO valuation:
1. **Early exercise**: Employees often exercise early (diversification, liquidity needs). The **expected life** approach uses the expected time to exercise, shorter than option maturity, as an input to BSM.
2. **Non-transferability**: Since ESOs cannot be sold, holders cannot "lock in" gains without exercising. This effectively reduces value relative to a marketable option.
3. **Forfeiture**: If the employee leaves, unvested options are forfeited. Forfeiture rates must be estimated.

### Dilution

When employees exercise ESOs, new shares are issued, diluting existing shareholders. Diluted EPS must account for potentially diluted shares from ESOs using the **treasury stock method**.

### Backdating Scandal

The 2006 options backdating scandal involved companies retroactively selecting grant dates when stock prices were lower, effectively granting in-the-money options while claiming they were at-the-money. This understated compensation expense.`,
  },
  {
    slug: "ch17-index-currency-options",
    theme: "options",
    chapterNumber: 17,
    title: "Options on Stock Indices and Currencies",
    partTitle: "Part Five: Options Pricing",
    estimatedMins: 25,
    sortOrder: 17,
    lessonContent: `## Options on Stock Indices and Currencies

### Index Options

Index options (e.g., S&P 500 options, SPX) are **European-style** (at expiry only) and **cash-settled** (no physical delivery of 500 stocks). The S&P 500 index treats dividends continuously; its options use the continuous dividend yield version of BSM:

**c = S₀e^(−qT)N(d₁) − Ke^(−rT)N(d₂)**

The dividend yield q of the index is typically around 1.5–2%. Portfolio managers use index put options to protect against market declines; this is the most common form of "portfolio insurance."

### Portfolio Insurance

A portfolio manager holding a portfolio worth A can create a floor at A* by buying put options: number of puts = A/S_index × (1 + cushion factor). The cost is the put premium; the trade-off is sacrificing some upside.

Dynamic portfolio insurance (replicating puts with futures, as in 1987 "portfolio insurance") contributed to the Black Monday crash when all managers tried to sell simultaneously.

### Currency Options

Currency options can be valued using the **Garman-Kohlhagen** model, a direct application of BSM with the foreign interest rate r_f playing the role of the dividend yield q:

**c = S₀e^(−r_f T)N(d₁) − Ke^(−rT)N(d₂)**

Where S₀ is the spot exchange rate (domestic/foreign), d₁ = [ln(S₀/K) + (r − r_f + σ²/2)T] / (σ√T).

### Covered Interest Rate Parity

Currency forward prices: F₀ = S₀e^((r−r_f)T). This links spot rates, forward rates, and interest rate differentials. Deviations from covered interest parity (CIP) imply arbitrage opportunities—in practice, CIP violations arise from funding costs and balance sheet constraints.`,
  },
  {
    slug: "ch18-futures-options",
    theme: "options",
    chapterNumber: 18,
    title: "Futures Options and Black's Model",
    partTitle: "Part Five: Options Pricing",
    estimatedMins: 25,
    sortOrder: 18,
    lessonContent: `## Futures Options and Black's Model

### Futures Options

A **futures option** gives the holder the right to enter into a futures contract at a specified futures price. On exercise of a call, the holder receives a long futures at price K plus a cash payment of F − K (the difference between current futures price F and strike K).

Futures options are popular because:
1. Futures contracts are more liquid than the underlying in many markets
2. Lower margin requirements
3. Daily settlement of both the futures and the option

### Put-Call Parity for Futures Options

c + Ke^(−rT) = p + F₀e^(−rT)

or equivalently: c − p = (F₀ − K)e^(−rT)

This differs from spot put-call parity by replacing S₀ with F₀e^(−rT).

### Black's Model (1976)

Fischer Black adapted BSM to price European options on futures:

**c = e^(−rT)[F₀N(d₁) − KN(d₂)]**
**p = e^(−rT)[KN(−d₂) − F₀N(−d₁)]**

Where: d₁ = [ln(F₀/K) + σ²T/2] / (σ√T) and d₂ = d₁ − σ√T

**Key insight**: Black's model replaces S₀ with F₀e^(−rT) — the futures price acts as the forward price. In Black's model, the forward price of the futures is F₀ itself (futures have zero cost of carry).

### Applications of Black's Model

Black's model is the market standard for pricing:
- Caps and floors (interest rate options)
- Swaptions
- Bond options
- Any option where the market quotes in terms of a forward/futures price

Its simplicity and widespread use make it the lingua franca of options desks.`,
  },
  {
    slug: "ch19-greeks",
    theme: "volatility",
    chapterNumber: 19,
    title: "The Greek Letters",
    partTitle: "Part Five: Options Pricing",
    estimatedMins: 45,
    sortOrder: 19,
    lessonContent: `## The Greek Letters

The Greeks measure the sensitivities of option prices to changes in inputs. They are essential for risk management of options books.

### Delta (Δ)

**Δ = ∂V/∂S** — sensitivity to underlying price.

- Call delta: N(d₁) ∈ (0, 1)
- Put delta: N(d₁) − 1 ∈ (−1, 0)

A delta-neutral portfolio has Δ_portfolio = 0. To maintain delta neutrality as S changes requires continuous rebalancing — **dynamic delta hedging**. The cost of this hedging equals the theta (time decay) of the option.

### Gamma (Γ)

**Γ = ∂²V/∂S² = ∂Δ/∂S** — rate of change of delta.

High gamma means delta changes rapidly — frequent rebalancing needed. Gamma is largest for ATM options near expiry. Long gamma positions profit from large moves; short gamma positions (like short options) suffer large losses from large moves.

**Key relationship**: For a delta-hedged portfolio: ΔΠ = ½ΓΔS²

### Theta (Θ)

**Θ = ∂V/∂t** — sensitivity to time passing (usually quoted as value loss per day).

Long option positions have negative theta (lose value as time passes). **Theta-gamma relationship**: For a delta-hedged position, θ + ½Γσ²S² = rV (from BSM PDE). Being long gamma costs theta; being short gamma earns theta.

### Vega (ν)

**ν = ∂V/∂σ** — sensitivity to volatility. Both calls and puts have positive vega. Vega is highest for ATM options and decreases as options move deep ITM or OTM.

### Rho (ρ)

**ρ = ∂V/∂r** — sensitivity to interest rate changes. Calls have positive rho (higher rates make calls more valuable); puts have negative rho.

### Portfolio Greeks

Greeks are additive. For a portfolio, Δ_portfolio = Σ Δᵢ × nᵢ. To hedge gamma, you must add options (not just the underlying). To hedge vega, you also need options.`,
  },
  {
    slug: "ch20-volatility-smiles",
    theme: "volatility",
    chapterNumber: 20,
    title: "Volatility Smiles",
    partTitle: "Part Five: Options Pricing",
    estimatedMins: 35,
    sortOrder: 20,
    lessonContent: `## Volatility Smiles

### Implied Volatility

**Implied volatility (IV)** is the σ that, plugged into BSM, reproduces the observed market price. If BSM were correct, all options on the same underlying with the same expiry would have the same IV. In practice, they do not.

### The Volatility Smile

A plot of IV vs. strike K (or moneyness) for a given expiry typically shows:

**Equity options (volatility skew/smirk)**:
- IV increases monotonically as K decreases (puts have higher IV than calls)
- This reflects fear of downside: the left tail of the stock price distribution is heavier than lognormal
- Caused by crash risk, leverage effect (falling prices → higher volatility)

**Currency options (volatility smile)**:
- IV is higher for both deep OTM calls and deep OTM puts
- Symmetric shape (two tails are heavier than normal)
- Both extreme appreciations and depreciations are more likely than lognormal

### Term Structure of Volatility

IV also varies by expiry — the **volatility surface** is a function of both K and T. Short-term IV tends to be more volatile (mean-reverts); long-term IV is more stable.

### Risk-Neutral Distribution

The volatility smile reveals the **risk-neutral probability density** implied by option prices. Using the Breeden-Litzenberger formula:
g(K, T) = e^(rT) × ∂²c/∂K²

A heavier left tail (equity skew) corresponds to a negatively skewed, fat-tailed risk-neutral distribution.

### Modeling the Smile

Models that can generate realistic smiles:
1. **Stochastic volatility** (Heston): σ itself follows a diffusion
2. **Jump diffusion** (Merton): Stock price can jump discontinuously
3. **Local volatility** (Dupire): σ(S,t) is a deterministic function calibrated to all market prices
4. **SABR model**: Stochastic volatility with correlation between vol and spot`,
  },
  {
    slug: "ch21-numerical-methods",
    theme: "pricing-theory",
    chapterNumber: 21,
    title: "Basic Numerical Procedures",
    partTitle: "Part Five: Options Pricing",
    estimatedMins: 40,
    sortOrder: 21,
    lessonContent: `## Basic Numerical Procedures

When closed-form solutions don't exist (American options, barrier options, complex payoffs), numerical methods are essential.

### Binomial Trees (Revisited)

For American options, the tree approach is the most intuitive. Key improvement: **trinomial trees** are often more accurate for the same number of steps, especially for barrier options.

**Control variate technique**: Use the known European price to calibrate tree errors. If the tree prices a European at c_tree and BSM gives c_BSM, adjust American price: c_american_adjusted = c_american_tree + (c_BSM − c_tree).

### Finite Difference Methods

Finite difference methods solve the BSM PDE on a grid of S and t values.

**Explicit method**: ∂f/∂t is approximated by a forward difference. Easy to implement but conditionally stable (requires small time steps).

**Implicit method (Crank-Nicolson)**: Uses a combination of forward and backward differences. Unconditionally stable, second-order accurate in both time and space.

The implicit method reduces to solving a tridiagonal system at each time step — highly efficient.

### Monte Carlo Simulation

**Monte Carlo (MC)** simulates many paths of S under the risk-neutral measure and averages the discounted payoffs.

For GBM: S(t+Δt) = S(t) × exp[(r − σ²/2)Δt + σ√Δt × ε]

MC has standard error ∝ 1/√N. **Variance reduction** techniques:
- Antithetic variates: Run paired simulations (ε and −ε), average payoffs
- Control variates: Use the European option price to adjust estimates
- Quasi-Monte Carlo: Use low-discrepancy sequences instead of pseudo-random numbers

### Path-Dependent Options

MC is well-suited for path-dependent options (Asian, lookback, barrier) where the payoff depends on the path of S, not just the terminal value.`,
  },
  {
    slug: "ch22-value-at-risk",
    theme: "risk",
    chapterNumber: 22,
    title: "Value at Risk",
    partTitle: "Part Six: Risk Management",
    estimatedMins: 35,
    sortOrder: 22,
    lessonContent: `## Value at Risk

### Definition

**Value at Risk (VaR)** is the loss amount such that the probability of exceeding it over a given time horizon T at confidence level α is 1 − α.

Formally: P(Loss > VaR) = 1 − α

For example: 10-day 99% VaR of $1M means there's a 1% probability of losing more than $1M over 10 days.

### Historical Simulation

1. Collect N days of historical returns on each risk factor
2. For each historical day, compute the hypothetical P&L on today's portfolio
3. Sort the P&L distribution; VaR is the (1−α)th percentile

Advantages: Captures non-linear exposures and non-normal distributions. Disadvantage: Backward-looking; unusual regimes may not be in history.

### Model-Building (Variance-Covariance) Approach

Assume P&L is normally distributed with standard deviation σ_P:
- Daily VaR (99%) = 2.326 × σ_P
- Daily VaR (95%) = 1.645 × σ_P

**Scaling rule**: N-day VaR ≈ √N × 1-day VaR (only exactly true under independence)

For a portfolio, σ_P² = w^T Σ w (variance-covariance matrix).

### Stressed VaR and Expected Shortfall

**Stressed VaR**: VaR computed using a historically stressed period (2008 crisis, etc.). Required under Basel 2.5.

**Expected Shortfall (ES/CVaR)**: The expected loss *given* the loss exceeds VaR. ES is coherent (satisfies mathematical properties VaR lacks) and is now required under Basel III (FRTB):
ES_α = E[Loss | Loss > VaR_α]

### Backtesting

**Backtesting** checks whether actual losses exceeded VaR the expected number of times. With 250 trading days and 99% VaR, we expect ~2.5 exceedances. The **traffic light system** flags excessive exceedances.`,
  },
  {
    slug: "ch23-estimating-volatilities",
    theme: "volatility",
    chapterNumber: 23,
    title: "Estimating Volatilities and Correlations",
    partTitle: "Part Six: Risk Management",
    estimatedMins: 30,
    sortOrder: 23,
    lessonContent: `## Estimating Volatilities and Correlations

### Historical Volatility

The simplest approach: compute daily log returns uᵢ = ln(Sᵢ/Sᵢ₋₁), then:

σ² ≈ (1/(m−1)) × Σ(uᵢ − ū)²

For derivatives pricing, ū ≈ 0 (drift is negligible over short periods):
σ² ≈ (1/m) × Σ uᵢ²

The estimate depends heavily on the lookback window m — a fundamental limitation of simple historical estimates.

### EWMA (Exponentially Weighted Moving Average)

**EWMA** assigns greater weight to recent observations:
σₙ² = λσₙ₋₁² + (1−λ)uₙ₋₁²

where λ ∈ (0,1) is the decay factor (RiskMetrics uses λ = 0.94 for daily data). EWMA responds faster to large recent moves.

### GARCH(1,1)

**GARCH** (Generalized Autoregressive Conditional Heteroskedasticity) is the workhorse of volatility modelling:

σₙ² = ω + αuₙ₋₁² + βσₙ₋₁²

Parameters: ω ≥ 0, α ≥ 0, β ≥ 0, α + β < 1 (stationarity).

The **long-run average variance**: VL = ω/(1 − α − β)

GARCH exhibits **volatility clustering** (high vol follows high vol) and **mean reversion** toward VL. The half-life of a volatility shock = ln(0.5)/ln(α+β).

### Correlation Estimation

Correlation between assets X and Y:
ρ = Cov(X,Y) / (σ_X × σ_Y)

The covariance can be estimated using EWMA:
Cov_n = λ × Cov_{n-1} + (1−λ) × u^X_{n-1} × u^Y_{n-1}

**Cholesky decomposition** is used to generate correlated random samples for Monte Carlo simulation.`,
  },
  {
    slug: "ch24-credit-risk",
    theme: "credit",
    chapterNumber: 24,
    title: "Credit Risk",
    partTitle: "Part Six: Risk Management",
    estimatedMins: 35,
    sortOrder: 24,
    lessonContent: `## Credit Risk

### Credit Risk Basics

**Credit risk** is the risk that a counterparty will fail to meet its financial obligations. Key measures:

- **Probability of Default (PD)**: Probability the borrower defaults within a specified period
- **Loss Given Default (LGD)**: Proportion of exposure lost if default occurs; LGD = 1 − Recovery Rate
- **Exposure at Default (EAD)**: Amount outstanding at time of default

**Expected Loss**: EL = PD × LGD × EAD

### Estimating Default Probabilities

**From bond prices**: The credit spread s = r_bond − r_risk-free ≈ PD × LGD.
More precisely: hazard rate h ≈ s/LGD

**Actuarial approach**: Use historical default rates from rating agencies (Moody's, S&P). Investment-grade bonds have very low annual PD (<0.1%); speculative grade can exceed 5%.

### Credit Default Swaps (CDS)

A CDS is insurance against default: the protection buyer pays a periodic spread (in bps), and the protection seller pays LGD if default occurs.

**CDS spread** ≈ h × LGD where h is the hazard rate. CDS spreads are the market's real-time assessment of credit risk.

**Recovery rates**: Typically 40% for senior secured bonds, lower for subordinated; highly variable.

### Merton Model

In the Merton (1974) structural model, equity is a call option on firm assets:
- Equity value E = A × N(d₁) − De^(−rT) × N(d₂)
- PD = N(−d₂) under risk-neutral measure

where A is asset value, D is face value of debt, T is debt maturity.

### Counterparty Credit Risk in Derivatives

**CVA** (Credit Valuation Adjustment) adjusts derivative fair value for counterparty default risk. CVA = LGD × ∫ EE(t) × h(t) × D(t) dt, where EE(t) is expected positive exposure at time t.`,
  },
  {
    slug: "ch25-credit-derivatives",
    theme: "credit",
    chapterNumber: 25,
    title: "Credit Derivatives",
    partTitle: "Part Six: Risk Management",
    estimatedMins: 30,
    sortOrder: 25,
    lessonContent: `## Credit Derivatives

### Credit Default Swaps (CDS)

A standard **CDS** has a notional of N, maturity T, and a spread s paid quarterly by the protection buyer. If the reference entity defaults, the protection seller pays N × LGD. CDS are the fundamental building block of the credit derivatives market.

**CDS valuation**: The fair CDS spread equates the PV of spread payments to the PV of expected loss payment:
s × Σ D(tᵢ) × N × Δtᵢ × (1−PD_cum(tᵢ)) = Σ [PD_cum(tᵢ) − PD_cum(tᵢ₋₁)] × LGD × D(tᵢ) × N

### Index CDS

**CDX (North America)** and **iTraxx (Europe)** are equally weighted portfolios of 125 single-name CDS. They provide liquid exposure to credit as an asset class. Tranches of CDX provide leveraged/de-leveraged credit exposure.

### CDO Pricing and the Gaussian Copula

**Synthetic CDO** tranches take credit risk on the CDX portfolio.

The **Gaussian copula** model (Li, 2000) models joint default times via a factor structure: each company's default time is driven by a common factor (market) and an idiosyncratic factor, correlated via a correlation parameter ρ.

For the equity tranche (absorbs first losses), high correlation reduces risk (all companies default together or none do). For senior tranches, high correlation increases risk (all companies can default simultaneously). This is the **correlation smile** problem: market-observed tranche spreads imply different ρ values across tranches.

### CDS Options and Swaptions

A **payer swaption** on a CDS gives the right to enter a CDS paying a specified spread. It's equivalent to an option on a credit spread. Pricing uses Black's model with the forward spread as the underlying.`,
  },
  {
    slug: "ch26-exotic-options",
    theme: "exotics",
    chapterNumber: 26,
    title: "Exotic Options",
    partTitle: "Part Seven: Further Topics",
    estimatedMins: 40,
    sortOrder: 26,
    lessonContent: `## Exotic Options

Exotic options have non-standard features not captured by vanilla puts and calls. They are typically OTC products.

### Packages

A **package** is a portfolio of European calls, puts, and forwards. Bull spreads, straddles, and risk reversals are packages. No new pricing machinery needed—just combine BSM values.

### Asian Options

**Asian options** payoff depends on the *average* price of the underlying over the option's life:
- Average price call: max(S_avg − K, 0) — less volatile than vanilla call → cheaper
- Average strike call: max(S_T − S_avg, 0) — useful for hedging average purchase cost

Asian options cannot be priced with closed forms in general; Monte Carlo or approximation methods (Turnbull-Wakeman for geometric average) are used.

### Barrier Options

**Barrier options** are activated (knock-in) or deactivated (knock-out) when the underlying crosses a barrier level H.

- **Down-and-out call**: Standard call that is extinguished if S falls to H < K. Cheaper than a vanilla call.
- **Up-and-in call**: Only activated if S rises to H > K (deep OTM).

Put-call parity: knock-in + knock-out = vanilla (for the same strike and barrier).

BSM-like closed-form solutions exist for single-barrier options. Double barriers require numerical methods.

### Lookback Options

**Lookback call**: max(S_T − S_min, 0) where S_min is the minimum price over the option's life. Always ITM at expiry (but expensive). **Floating lookback call**: S_T − S_min.

### Compound and Chooser Options

**Compound option**: An option on an option (e.g., a call on a call). Used to hedge uncertain future hedging needs.

**Chooser option**: After time T₀, the holder chooses whether it becomes a call or put. Priced as a put plus call combination.`,
  },
  {
    slug: "ch27-more-models",
    theme: "pricing-theory",
    chapterNumber: 27,
    title: "More on Models and Numerical Procedures",
    partTitle: "Part Seven: Further Topics",
    estimatedMins: 45,
    sortOrder: 27,
    lessonContent: `## More on Models and Numerical Procedures

### Alternatives to BSM

**Constant Elasticity of Variance (CEV)**: dS = μS dt + σS^β dz. When β < 1, volatility rises as S falls (leverage effect). Closed-form available.

**Jump Diffusion (Merton 1976)**: dS/S = (μ − λk̄)dt + σ dz + J dN, where N is a Poisson process with rate λ, and J is the random jump size. Generates heavier tails and volatility smiles.

**Stochastic Volatility (Heston 1993)**:
dS/S = μ dt + √v dz_S
dv = κ(θ − v)dt + ξ√v dz_v

where dz_S and dz_v are correlated. The Heston model has a semi-closed-form solution via characteristic functions and is calibrated to the volatility surface.

**SABR Model** (Hagan et al. 2002): Widely used for interest rate options. The dynamics are:
dF = σ F^β dz, dσ = ασ dw
with correlation ρ between dz and dw. The SABR model has a widely-used approximate IV formula.

### Finite Difference for American Options

The **linear complementarity condition** at each grid point:
either f = max(S − K, 0) (exercise) or ∂f/∂t + ... = rf (BSM PDE holds, no early exercise)

This can be solved using a penalty method or projected SOR.

### Monte Carlo for American Options

The key difficulty: American options require optimal stopping, but MC naturally prices European options. Solutions:
- **Longstaff-Schwartz (LSM)**: Regress continuation value on basis functions of current state at each exercise point. Work backwards to find optimal exercise boundary.
- **Parametric approaches**: Assume exercise boundary has a parametric form and optimize.`,
  },
  {
    slug: "ch28-martingales",
    theme: "pricing-theory",
    chapterNumber: 28,
    title: "Martingales and Measures",
    partTitle: "Part Seven: Further Topics",
    estimatedMins: 50,
    sortOrder: 28,
    lessonContent: `## Martingales and Measures

### The Risk-Neutral World

In the risk-neutral world, all assets earn the risk-free rate r. The risk-neutral measure Q is constructed so that discounted asset prices are martingales: E^Q[S_T / B_T] = S_0 / B_0, where B_t = e^(rt) is the money-market account.

Under Q, the drift of S changes from μ (the real-world drift) to r. This is the **Girsanov transformation**: by changing the probability measure, we change the drift.

### Equivalent Martingale Measures

**First Fundamental Theorem of Asset Pricing**: No-arbitrage ↔ existence of an equivalent martingale measure (EMM). **Second Fundamental Theorem**: Completeness ↔ uniqueness of EMM.

In an incomplete market (e.g., with stochastic volatility), there are infinitely many EMMs—the option is not uniquely priced by no-arbitrage alone.

### Change of Numeraire

A **numeraire** is a reference asset used for pricing. The risk-neutral measure uses the money-market account as numeraire. We can choose other numeraires:

**T-forward measure**: Use the zero-coupon bond P(t,T) as numeraire. Under this measure, the forward rate F(t,T) is a martingale. This simplifies pricing of interest rate derivatives: discount at the bond price, price as expected value under the T-forward measure.

**Annuity measure (swap measure)**: Use the annuity (sum of discount factors) as numeraire. The swap rate is a martingale under this measure. Key for swaption pricing.

### Log-Normal Forward Models

Under the T-forward measure, if F(t,T) follows:
dF = σF dz^T

then the forward price has lognormal dynamics, and BSM applies with F₀ replacing S₀. This is the foundation for Black's formula and the LIBOR Market Model.`,
  },
]
