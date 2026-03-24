// Damodaran "Investment Valuation: Tools and Techniques for Determining the Value of Any Asset" — 6 core chapters

export const damodaranChapters = [
  {
    slug: "ch01-intro-valuation",
    chapterNumber: 1,
    title: "Introduction to Valuation",
    partTitle: "Part One: Foundations",
    estimatedMins: 20,
    sortOrder: 1,
    lessonContent: `## Introduction to Valuation

Valuation is at the core of everything done in finance. Whether you are an investor trying to decide which stocks to buy, a manager evaluating a capital investment, or a banker pricing a merger, you need to estimate value. The fundamental principle is simple: an asset is worth the present value of the cash flows it is expected to generate.

### Three Approaches to Valuation

**1. Intrinsic (DCF) valuation**: Value is determined by expected future cash flows discounted at a rate that reflects their risk. This approach is theoretically sound and forces rigorous thinking about fundamentals, but requires many assumptions.

**2. Relative valuation**: Value is estimated by looking at how comparable assets are priced in the market — using multiples like P/E, EV/EBITDA, or P/B. It is faster and reflects current market sentiment, but embeds market mispricing and requires finding truly comparable firms.

**3. Contingent claim (option) valuation**: Some assets have option-like payoffs — equity in a levered firm, a patent, a natural resource reserve. Options pricing models (Black-Scholes, binomial) are used. This is the most complex approach.

### When Valuations Go Wrong

Valuations can be biased by the analyst's prior belief ("reverse engineering" the assumptions to justify a desired conclusion), over-precision (false accuracy from detailed models), and narrative failure (a spreadsheet that does not reflect a coherent business story). Damodaran emphasises that a good valuation requires both a **narrative** (business story) and a **model** (numbers that flow from that story) — neither alone is sufficient.

### The Role of Uncertainty

Uncertainty is not the enemy of valuation — it is simply part of it. Every DCF contains embedded assumptions about the future. The goal is not to eliminate uncertainty (impossible) but to be explicit about it, run scenarios, and understand what assumptions the market is already pricing in.`,
  },
  {
    slug: "ch02-dcf-valuation",
    chapterNumber: 2,
    title: "Discounted Cash Flow Valuation",
    partTitle: "Part Two: DCF Valuation",
    estimatedMins: 30,
    sortOrder: 2,
    lessonContent: `## Discounted Cash Flow Valuation

DCF valuation calculates the intrinsic value of an asset as the present value of its expected future cash flows:

$$V = \\sum_{t=1}^{n} \\frac{CF_t}{(1+r)^t} + \\frac{Terminal Value}{(1+r)^n}$$

### Free Cash Flow to Equity (FCFE) vs FCFF

**FCFF** (Free Cash Flow to the Firm) is the cash available to all capital providers before debt payments:
$$FCFF = EBIT(1-t) + D\\&A - CapEx - \\Delta Working Capital$$

Discount FCFF at the WACC to get enterprise value. Subtract net debt to get equity value.

**FCFE** (Free Cash Flow to Equity) is the cash remaining after debt obligations:
$$FCFE = Net Income + D\\&A - CapEx - \\Delta Working Capital + Net Borrowing$$

Discount FCFE at the cost of equity to get equity value directly.

### Terminal Value

Most of a firm's value comes from the terminal value — the present value of cash flows beyond the explicit forecast horizon:

$$TV = \\frac{FCFF_{n+1}}{WACC - g}$$

where $g$ is the stable long-run growth rate (≤ nominal GDP growth for most firms). The terminal value can represent 60–80% of total value for growth firms, making the growth rate assumption critical.

### Common DCF Mistakes

- Using book value of debt rather than market value in WACC
- Applying a "risk premium" to the discount rate without reflecting it in cash flows too (double-counting risk)
- Using a stable terminal growth rate that exceeds the economy's growth rate (mathematically implies the firm eventually becomes larger than the economy)
- Ignoring the **reinvestment** needed to sustain growth (high growth requires high capital expenditure)`,
  },
  {
    slug: "ch03-cost-of-capital",
    chapterNumber: 3,
    title: "Cost of Capital and WACC",
    partTitle: "Part Two: DCF Valuation",
    estimatedMins: 28,
    sortOrder: 3,
    lessonContent: `## Cost of Capital and WACC

The discount rate in a DCF should reflect the risk of the cash flows being discounted. For FCFF, the appropriate rate is the **Weighted Average Cost of Capital (WACC)**.

### WACC

$$WACC = \\frac{E}{E+D} \\cdot k_e + \\frac{D}{E+D} \\cdot k_d(1-t)$$

where $E$ is market value of equity, $D$ is market value of debt, $k_e$ is cost of equity, $k_d$ is pre-tax cost of debt, and $t$ is the marginal tax rate. Note: **market values**, not book values, should be used as weights.

### Cost of Equity: CAPM

The **Capital Asset Pricing Model** remains the most widely used approach:

$$k_e = r_f + \\beta(ERP)$$

where $r_f$ is the risk-free rate, $\\beta$ is the systematic risk of the equity, and ERP is the **Equity Risk Premium** — the extra return investors demand for bearing equity risk over risk-free assets.

### Beta Estimation

Beta is estimated by regressing the stock's returns against market returns. Problems:
- **Short history**: beta estimates have large standard errors
- **Mean reversion**: estimated betas tend to revert toward 1
- **Private firms**: no market price to regress

Practitioners often use **fundamental betas** (from comparable public companies, unlevered and re-levered for the target capital structure) or **sector betas** to reduce noise.

### Cost of Debt

The cost of debt is the rate the firm would pay on new borrowings. It can be estimated from the firm's bond yield, its credit rating (using a synthetic rating approach), or recent loan terms. The tax shield on interest (the $(1-t)$ term) reflects the deductibility of interest payments.`,
  },
  {
    slug: "ch04-equity-risk-premium",
    chapterNumber: 4,
    title: "The Equity Risk Premium",
    partTitle: "Part Two: DCF Valuation",
    estimatedMins: 25,
    sortOrder: 4,
    lessonContent: `## The Equity Risk Premium

The **Equity Risk Premium (ERP)** is the excess return that equity investors demand above the risk-free rate for bearing equity risk. It is the single most important input in valuation — a 1% change in the ERP can move valuations by 15–25%.

### Historical Premium

One approach is to use the long-run average historical excess return of equities over risk-free bonds. Using US data since 1928, Damodaran estimates a geometric average excess return of ~4.4% over T-bonds. Problems: requires a long history, geometric vs arithmetic mean debate, and past returns may not reflect future risk appetite.

### Implied ERP

A more forward-looking approach backs out the ERP implied by current market prices. If you know the current index price, expected dividends/buybacks, and a long-run growth assumption, you can solve for the implied discount rate:

$$S\\&P_0 = \\sum_{t=1}^{5} \\frac{CF_t}{(1+r)^t} + \\frac{CF_5(1+g)}{(r-g)(1+r)^5}$$

Solving for $r$ and subtracting the risk-free rate gives the implied ERP. As of 2023, implied ERPs for the US market typically run 4–6%.

### Country Risk

For valuations outside the US, an additional **country risk premium** is added to reflect political, economic, and currency risks specific to that market:

$$k_e = r_f + \\beta(ERP) + CRP$$

Country risk premiums can be estimated from sovereign credit spreads (adjusted for equity vs bond volatility) or from direct survey data. Emerging markets carry significantly higher CRPs than developed markets.`,
  },
  {
    slug: "ch05-relative-valuation",
    chapterNumber: 5,
    title: "Relative Valuation: Multiples",
    partTitle: "Part Three: Relative Valuation",
    estimatedMins: 25,
    sortOrder: 5,
    lessonContent: `## Relative Valuation: Multiples

Relative valuation values a firm by comparing it to similar firms using standardised pricing ratios called **multiples**. It is the dominant approach used by equity analysts and in investment banking.

### Equity Multiples

**Price/Earnings (P/E)**: Most widely used. Numerator is stock price; denominator is EPS. Driven by expected growth, payout ratio, and cost of equity. High-growth firms command higher P/E ratios.

**Price/Book (P/B)**: Compares market value to book value of equity. Driven by ROE and cost of equity:
$$P/B = \\frac{ROE - g}{k_e - g}$$
Firms that earn above their cost of equity should trade above book value.

### Enterprise Value Multiples

**EV/EBITDA**: Enterprise value divided by EBITDA (earnings before interest, tax, D&A). Less affected by capital structure and depreciation policy differences across firms. Standard in M&A and leveraged buyouts.

**EV/Sales**: Used when earnings are negative (e.g., early-stage companies). Driven by profit margin and growth.

### The Hidden Danger: Controlling for Differences

The biggest mistake in relative valuation is comparing multiples across firms with different fundamentals. A 15x P/E is cheap for a firm growing at 25% but expensive for one growing at 5%. The **PEG ratio** (P/E ÷ growth rate) partially controls for this but is a crude fix. Better: build a regression of P/E against growth, payout, and risk across comparable firms, and use the regression estimate as a "fair value" multiple.

### Relative vs Intrinsic Valuation

Relative valuation tells you whether a firm is cheap or expensive **relative to the market**. If the entire market is overvalued, a stock can be cheap on multiples and still be expensive in absolute terms. DCF valuation is independent of market sentiment — it anchors to fundamentals.`,
  },
  {
    slug: "ch06-growth-reinvestment",
    chapterNumber: 6,
    title: "Estimating Growth and Reinvestment",
    partTitle: "Part Two: DCF Valuation",
    estimatedMins: 22,
    sortOrder: 6,
    lessonContent: `## Estimating Growth and Reinvestment

Growth is the engine of value creation, but growth without return above the cost of capital destroys value. The relationship between growth, reinvestment, and return is the foundation of rigorous DCF valuation.

### The Fundamental Growth Equation

$$g = Reinvestment Rate \\times Return on Capital$$

where the reinvestment rate is the fraction of after-tax operating income ploughed back into the business:

$$Reinvestment Rate = \\frac{CapEx - D\\&A + \\Delta Working Capital}{EBIT(1-t)}$$

A firm that earns 15% on invested capital and reinvests 40% of earnings grows at 6%. Crucially, growth without reinvestment is unsustainable.

### Sources of Growth Estimates

1. **Historical growth**: Useful as a starting point, but past growth does not predict future growth for high-growth firms and mean-reverts over time
2. **Analyst estimates**: Useful for 1–2 year horizon; consensus estimates are better than individual analyst estimates on average; unreliable beyond 3 years
3. **Fundamental estimate**: Use the reinvestment rate × ROIC formula — the most internally consistent approach for DCF models

### The Growth-Value Relationship

Value is created only when $ROIC > WACC$. If a firm earns exactly its cost of capital, growth does not create or destroy value — you are simply reinvesting at a fair rate. This insight explains why "growth" stocks are not inherently more valuable; what matters is **value-creating** growth (above-WACC returns).

### Fade Rate and Competitive Advantage Period

Most firms cannot sustain high returns indefinitely — competition erodes excess returns. The **competitive advantage period** is the number of years before ROIC converges to WACC. Valuation models should explicitly model this fade and avoid assuming permanently high ROICs except for firms with durable competitive moats.`,
  },
]
