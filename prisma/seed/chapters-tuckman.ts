// Tuckman & Serrat "Fixed Income Securities: Tools for Today's Markets" — 6 core chapters

export const tuckmanChapters = [
  {
    slug: "ch01-discount-factors",
    chapterNumber: 1,
    title: "Prices, Discount Factors, and Arbitrage",
    partTitle: "Part One: The Time Value of Money",
    estimatedMins: 22,
    sortOrder: 1,
    lessonContent: `## Prices, Discount Factors, and Arbitrage

A fixed income security promises a sequence of future cash flows. Its price today equals the sum of each future cash flow multiplied by the appropriate **discount factor**. The discount factor $d(t)$ is the present value of $1 to be received at time $t$. Formally:

$$P = \\sum_{i} c_i \\cdot d(t_i)$$

where $c_i$ is the cash flow at time $t_i$. Discount factors are always between 0 and 1 (assuming positive interest rates) and are declining functions of maturity.

### Bootstrapping Discount Factors

In practice, discount factors are extracted from observed bond prices. If we know the prices of bonds with different maturities, we can solve for the discount factors sequentially — a process called **bootstrapping**. Start with the shortest maturity bond; its price gives $d(0.5)$ or $d(1)$ directly. Then use that to strip the next cash flow, and so on.

### The Law of One Price and No-Arbitrage

The **law of one price** states that two portfolios with identical future cash flows must have the same price today. If they didn't, an arbitrageur could sell the expensive one, buy the cheap one, and lock in a riskless profit — an **arbitrage**. In liquid fixed income markets, arbitrage opportunities are fleeting; pricing models therefore build on the no-arbitrage assumption.

### Replication

Rather than appealing to abstract principles, practitioners price derivatives by **replication**: constructing a portfolio of traded instruments that exactly mimics the derivative's cash flows. The derivative's price must equal the cost of the replicating portfolio. This is the foundation of modern fixed income pricing.`,
  },
  {
    slug: "ch02-spot-forward-rates",
    chapterNumber: 2,
    title: "Spot, Forward, and Par Rates",
    partTitle: "Part One: The Time Value of Money",
    estimatedMins: 25,
    sortOrder: 2,
    lessonContent: `## Spot, Forward, and Par Rates

There are three equivalent ways to describe the yield curve, each useful for different purposes.

### Spot Rates (Zero Rates)

The **spot rate** $s(t)$ (also called the zero rate or zero-coupon rate) is the yield on a zero-coupon bond maturing at time $t$. It satisfies:

$$d(t) = e^{-s(t)\\cdot t} \\quad \\text{(continuous)} \\qquad \\text{or} \\qquad d(t) = \\frac{1}{(1+s(t))^t} \\quad \\text{(annual)}$$

Spot rates are the cleanest measure of time value at each horizon because they are unaffected by coupon reinvestment assumptions.

### Forward Rates

The **forward rate** $f(t_1, t_2)$ is the interest rate agreed today for borrowing or lending between future dates $t_1$ and $t_2$. It is implied by the spot rates:

$$f(t_1, t_2) = \\frac{s(t_2)\\cdot t_2 - s(t_1)\\cdot t_1}{t_2 - t_1} \\quad \\text{(continuous compounding)}$$

The **instantaneous forward rate** $f(t)$ is the limit as $t_2 \\to t_1$. When the yield curve is upward-sloping, forward rates lie above spot rates. When the curve is inverted, forward rates lie below.

### Par Rates

The **par rate** $y(T)$ for maturity $T$ is the coupon rate that prices a bond at par (price = face value). Par rates are the standard market convention for quoting swap rates and are most relevant for pricing coupon-paying instruments.

### The Relationship

All three representations carry the same information — given any one, you can derive the others. The choice depends on the application: spot rates for pricing zero-coupon cash flows, forward rates for hedging and pricing forward-starting instruments, par rates for quoting and comparing swap instruments.`,
  },
  {
    slug: "ch03-duration-convexity",
    chapterNumber: 3,
    title: "Duration, DV01, and Convexity",
    partTitle: "Part Two: Price Sensitivity",
    estimatedMins: 28,
    sortOrder: 3,
    lessonContent: `## Duration, DV01, and Convexity

Fixed income risk management requires precise measures of how bond prices respond to interest rate movements.

### DV01 (Dollar Value of 01)

**DV01** (also called PVBP — Price Value of a Basis Point) measures the dollar change in a bond's price when its yield falls by 1 basis point (0.01%):

$$DV01 = -\\frac{\\Delta P}{\\Delta y} \\times 0.0001$$

DV01 is the most direct and practical hedge ratio. To hedge a position with DV01 = $5,000, you need an offsetting position with the same DV01.

### Modified Duration

**Modified duration** $D_{mod}$ is the percentage price change per unit change in yield:

$$\\frac{\\Delta P}{P} \\approx -D_{mod} \\cdot \\Delta y$$

So $DV01 = D_{mod} \\times P \\times 0.0001$. For a zero-coupon bond maturing in $T$ years, modified duration equals $T/(1+y)$. Coupon bonds have shorter durations because they receive cash flows prior to maturity.

### Macaulay Duration

**Macaulay duration** is the weighted average time to receipt of a bond's cash flows, where weights are the present values of those cash flows as a fraction of the bond's total price. It relates to modified duration by:

$$D_{mac} = D_{mod} \\times (1 + y/m)$$

where $m$ is the compounding frequency.

### Convexity

Duration is a first-order (linear) approximation. **Convexity** captures the curvature of the price-yield relationship:

$$\\frac{\\Delta P}{P} \\approx -D_{mod} \\cdot \\Delta y + \\frac{1}{2} \\cdot C \\cdot (\\Delta y)^2$$

Convexity is always positive for standard (non-callable) bonds — a bond with higher convexity outperforms a lower-convexity bond of equal duration whether rates rise or fall. Callable bonds can exhibit **negative convexity** at low yield levels because the call option limits price appreciation.`,
  },
  {
    slug: "ch04-swaps",
    chapterNumber: 4,
    title: "Interest Rate Swaps",
    partTitle: "Part Three: Swaps and Derivatives",
    estimatedMins: 25,
    sortOrder: 4,
    lessonContent: `## Interest Rate Swaps

An **interest rate swap** is an agreement between two parties to exchange cash flows on a notional principal. In the most common form — the **plain vanilla swap** — one party pays a fixed rate and receives a floating rate (typically SOFR or historically LIBOR) on the same notional.

### Cash Flow Structure

On each payment date, the net payment is:

$$\\text{Net} = (\\text{Fixed rate} - \\text{Floating rate}) \\times \\text{Notional} \\times \\text{Day count fraction}$$

The party paying fixed is said to be **long the swap** (benefits if rates rise); the party receiving fixed is **short the swap** (benefits if rates fall).

### Valuation as Two Bonds

A pay-fixed swap can be decomposed into:
- **Short a fixed-rate bond** (paying fixed coupons)
- **Long a floating-rate bond** (receiving floating coupons)

The value of a floating-rate bond resets to par at each coupon date (since its coupon equals the market rate). Therefore, the floating leg value is always par on reset dates. The swap value equals the difference between the two bond prices.

### The Par Swap Rate

The **par swap rate** is the fixed rate that makes the swap value zero at inception. It equals the par rate implied by the discount curve:

$$K = \\frac{1 - d(T)}{\\sum_{i=1}^{n} \\alpha_i \\cdot d(t_i)}$$

where $\\alpha_i$ are the day count fractions and $d(t_i)$ are discount factors.

### Forward Rate Agreements (FRAs)

A **FRA** is a single-period swap: one payment based on the difference between a fixed rate and a floating rate observed at a future date. FRAs are the building blocks of swap pricing; a swap is simply a portfolio of FRAs.`,
  },
  {
    slug: "ch05-mortgages-mbs",
    chapterNumber: 5,
    title: "Mortgages and Mortgage-Backed Securities",
    partTitle: "Part Four: Structured Products",
    estimatedMins: 30,
    sortOrder: 5,
    lessonContent: `## Mortgages and Mortgage-Backed Securities

The mortgage market is the largest fixed income sector in the US. Understanding prepayment risk is central to MBS analysis.

### Mortgage Cash Flows

A standard fixed-rate mortgage requires equal monthly payments over its life (fully amortizing). Each payment covers interest on the outstanding balance plus principal repayment:

$$\\text{Monthly payment} = L \\cdot \\frac{r(1+r)^N}{(1+r)^N - 1}$$

where $L$ is the loan balance, $r$ is the monthly rate, and $N$ is the number of months. Early in the mortgage, most of the payment is interest; as the balance declines, more goes to principal.

### Prepayment Risk

Borrowers have the option to prepay their mortgages at any time, typically when refinancing at lower rates. This creates **prepayment risk**:
- When rates fall, borrowers prepay → investors receive principal early and must reinvest at lower rates (**contraction risk**)
- When rates rise, prepayments slow → the weighted-average life extends (**extension risk**)

This optionality means MBS exhibit **negative convexity**: prices rise less than expected when rates fall (because prepayments accelerate) and fall more than expected when rates rise (because prepayments slow).

### Pass-Throughs and CMOs

A **pass-through** MBS passes all principal and interest from a pool of mortgages to investors pro-rata. A **Collateralized Mortgage Obligation (CMO)** restructures the cash flows into tranches with different priority claims on prepayments. Sequential-pay tranches create instruments with more stable average lives; Z-tranches accrue interest without receiving cash flows until senior tranches are paid off.

### OAS Analysis

The **Option-Adjusted Spread (OAS)** strips out the embedded prepayment option to measure the spread to the risk-free curve for bearing credit and liquidity risk. OAS allows comparison across mortgage products with different prepayment profiles.`,
  },
  {
    slug: "ch06-term-structure-models",
    chapterNumber: 6,
    title: "Term Structure Models",
    partTitle: "Part Five: Models",
    estimatedMins: 30,
    sortOrder: 6,
    lessonContent: `## Term Structure Models

Term structure models describe the evolution of interest rates over time. They are used to price interest rate derivatives and to analyze the yield curve under different economic scenarios.

### Short-Rate Models

Short-rate models specify the dynamics of the instantaneous short rate $r_t$. Under the risk-neutral measure, the price of any zero-coupon bond is:

$$P(t, T) = E^Q\\left[e^{-\\int_t^T r_s\\, ds}\\right]$$

**Vasicek model**: $dr = a(b - r)dt + \\sigma dW$. Mean-reverting with constant volatility. Yields are affine in $r$. Rates can go negative — a limitation.

**Cox-Ingersoll-Ross (CIR)**: $dr = a(b - r)dt + \\sigma\\sqrt{r}\\, dW$. Mean-reverting with volatility proportional to $\\sqrt{r}$, ensuring rates stay positive. Also affine.

### No-Arbitrage vs Equilibrium Models

**Equilibrium models** (Vasicek, CIR) start with assumptions about preferences and production. They are parsimonious but may not fit the current observed yield curve exactly.

**No-arbitrage models** (Ho-Lee, Hull-White) are calibrated to match the current term structure exactly. The Hull-White model extends Vasicek with a time-dependent drift:

$$dr = [\\theta(t) - ar]dt + \\sigma dW$$

where $\\theta(t)$ is chosen to fit today's yield curve. This makes it useful for pricing derivatives consistently with market prices.

### Multi-Factor Models

One-factor models imply perfect correlation across maturities. In practice, the yield curve moves in multiple ways (parallel shifts, slope changes, curvature changes). Two- and three-factor models capture these patterns. The **Nelson-Siegel** framework parameterizes the curve with level, slope, and curvature factors that are intuitive for scenario analysis.`,
  },
]
