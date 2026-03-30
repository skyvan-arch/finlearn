// Hull "Risk Management and Financial Institutions" — 6 core chapters

export const hullRiskChapters = [
  {
    slug: "ch01-risk-introduction",
    theme: "risk",
    chapterNumber: 1,
    title: "Introduction: Risk vs. Return",
    partTitle: "Part One: Financial Institutions",
    estimatedMins: 20,
    sortOrder: 1,
    lessonContent: `## Introduction: Risk vs. Return

Risk management in financial institutions involves identifying, measuring, and controlling the risks taken in pursuit of return. A key insight is that risk is not inherently bad — it is the source of return. The goal is to ensure that risks are **intentional**, **well-understood**, and **compensated**.

### Types of Financial Risk

- **Market risk**: losses from adverse movements in prices, rates, or volatilities. Includes interest rate risk, equity risk, FX risk, and commodity risk.
- **Credit risk**: losses when a counterparty fails to meet its obligations. Includes default risk, migration risk, and settlement risk.
- **Liquidity risk**: inability to meet cash flow needs (funding liquidity) or to exit a position without significant market impact (market liquidity).
- **Operational risk**: losses from failed processes, systems, people, or external events. Defined under Basel II as explicitly requiring capital.

### The Risk-Return Tradeoff

**Economic capital** is the amount of equity a firm needs to hold to remain solvent at a given confidence level (e.g., 99.9%) over a given horizon (e.g., 1 year). Risk-adjusted performance measures like **RAROC** (Risk-Adjusted Return on Capital) allow comparison across business lines with different risk profiles:

$$RAROC = \\frac{\\text{Risk-adjusted revenue}}{\\text{Economic capital}}$$

### Systematic vs Idiosyncratic Risk

**Systematic risk** (beta risk) is correlated with the broad market and cannot be diversified away — investors demand a premium. **Idiosyncratic risk** is specific to a firm or asset and can be diversified. In a large, well-diversified portfolio, only systematic risk matters for pricing. Financial institutions nevertheless hold capital against both, since their books are not perfectly diversified.`,
  },
  {
    slug: "ch02-value-at-risk",
    theme: "risk",
    chapterNumber: 2,
    title: "Value at Risk",
    partTitle: "Part Two: Market Risk",
    estimatedMins: 28,
    sortOrder: 2,
    lessonContent: `## Value at Risk

**Value at Risk (VaR)** answers the question: "What is the maximum loss I will suffer over a given time horizon with a given confidence level?" Formally, the 1-day 99% VaR is a number $V$ such that:

$$P(\\text{loss} > V) = 1\\%$$

VaR is widely used because it summarizes risk in a single, intuitive dollar figure. It is embedded in Basel capital requirements and internal risk reporting at most major banks.

### Three Main Approaches

**1. Historical simulation**: Collect the last $N$ days of P&L (or risk factor changes). Sort them. The VaR is the loss at the appropriate percentile. Pros: non-parametric, captures fat tails and correlations automatically. Cons: dependent on the historical window chosen; slow to adapt to regime changes.

**2. Model-building (variance-covariance)**: Assume portfolio returns are normally distributed. $VaR = \\sigma \\cdot z_\\alpha \\cdot \\sqrt{\\Delta t}$, where $\\sigma$ is the portfolio standard deviation and $z_\\alpha$ is the normal quantile. Fast and analytically tractable. Fails when returns are non-normal or options are present.

**3. Monte Carlo simulation**: Simulate thousands of scenarios for risk factors, reprice the portfolio in each, and compute the percentile loss. Most flexible, but computationally expensive.

### The Square Root of Time Rule

To scale a 1-day VaR to a $T$-day VaR, Basel allows multiplying by $\\sqrt{T}$ — valid only when daily P&Ls are i.i.d. normally distributed. This assumption is questionable in practice.

### Limitations of VaR

VaR tells you nothing about losses **beyond** the threshold. A portfolio with 99% VaR of $10M could have worst-case losses of $11M or $1B — VaR cannot distinguish. More fundamentally, VaR is **not sub-additive**: the VaR of a combined portfolio can exceed the sum of individual VaRs, violating the intuition that diversification reduces risk.`,
  },
  {
    slug: "ch03-expected-shortfall",
    theme: "risk",
    chapterNumber: 3,
    title: "Expected Shortfall and Coherent Risk Measures",
    partTitle: "Part Two: Market Risk",
    estimatedMins: 22,
    sortOrder: 3,
    lessonContent: `## Expected Shortfall and Coherent Risk Measures

### Expected Shortfall (ES)

**Expected Shortfall** (also called Conditional VaR, CVaR, or ETL — Expected Tail Loss) measures the **average loss in the worst scenarios**. The 99% ES is the expected loss conditional on the loss exceeding the 99% VaR:

$$ES_{\\alpha} = E[\\text{loss} \\mid \\text{loss} > VaR_{\\alpha}]$$

ES gives a complete picture of tail risk. Under the **Basel IV / FRTB** framework (2023+), regulators replaced VaR with a 97.5% ES as the primary market risk capital measure, noting that 97.5% ES captures roughly the same magnitude as 99% VaR for normal distributions while providing tail information.

### Coherent Risk Measures

Artzner et al. (1999) defined four axioms a good risk measure should satisfy:
1. **Monotonicity**: if portfolio A always loses more than B, $\\rho(A) \\geq \\rho(B)$
2. **Translation invariance**: adding cash reduces risk by that amount
3. **Positive homogeneity**: scaling a position scales risk proportionally
4. **Sub-additivity**: $\\rho(A+B) \\leq \\rho(A) + \\rho(B)$ — diversification never increases risk

VaR fails **sub-additivity** in general. ES satisfies all four axioms and is therefore a coherent risk measure.

### Practical Implications

The shift to ES in FRTB creates challenges: ES is harder to backtest than VaR (because by definition you have few observations in the tail). The FRTB framework addresses this by backtesting the underlying VaR rather than ES directly, while requiring ES for capital calculations.`,
  },
  {
    slug: "ch04-credit-risk",
    theme: "credit",
    chapterNumber: 4,
    title: "Credit Risk: Default Probabilities",
    partTitle: "Part Three: Credit Risk",
    estimatedMins: 28,
    sortOrder: 4,
    lessonContent: `## Credit Risk: Default Probabilities

Credit risk is the risk of loss due to a borrower's failure to make promised payments. Quantifying credit risk requires estimating three key parameters: **Probability of Default (PD)**, **Loss Given Default (LGD)**, and **Exposure at Default (EAD)**.

$$\\text{Expected Loss} = PD \\times LGD \\times EAD$$

### Historical vs Risk-Neutral Default Probabilities

**Historical (real-world) default probabilities** are estimated from rating agency data on historical default rates. For example, Moody's tracks the fraction of Baa-rated bonds that defaulted each year over decades.

**Risk-neutral default probabilities** are implied from market prices (bond spreads or CDS spreads). They tend to be significantly higher than historical probabilities because they embed a **risk premium** — investors demand extra compensation for bearing credit risk beyond the actuarial expected loss. For pricing derivatives, risk-neutral probabilities are used; for scenario analysis and regulatory capital, historical probabilities may be preferred.

### The Merton Model

Robert Merton (1974) modeled a firm's equity as a **call option on the firm's assets** with strike equal to the face value of debt. Under this framework:

$$\\text{Equity} = \\max(V - D, 0)$$

where $V$ is firm value and $D$ is debt. Default occurs when $V < D$ at maturity. This structural approach links credit risk to observable equity market data and is the basis for commercial models like KMV/Moody's Analytics.

### CDS Spreads

A **Credit Default Swap (CDS)** is insurance against default: the protection buyer pays a periodic spread; the protection seller pays the notional minus recovery upon default. CDS spreads are the purest market-based measure of credit risk and are related to bond spreads by:

$$\\text{CDS spread} \\approx \\text{Bond yield} - \\text{Risk-free rate}$$`,
  },
  {
    slug: "ch05-basel",
    theme: "risk",
    chapterNumber: 5,
    title: "Basel I, II, and III",
    partTitle: "Part Four: Regulation",
    estimatedMins: 30,
    sortOrder: 5,
    lessonContent: `## Basel I, II, and III

The Basel Accords are international banking regulations developed by the Basel Committee on Banking Supervision (BCBS) to ensure banks hold sufficient capital to absorb losses.

### Basel I (1988)

Basel I introduced a simple **8% minimum capital ratio**: banks must hold Tier 1 + Tier 2 capital equal to at least 8% of risk-weighted assets (RWA). Risk weights were crude: sovereigns = 0%, banks = 20%, mortgages = 50%, corporate = 100%. Market risk was addressed in the 1996 Amendment, allowing banks to use internal VaR models.

### Basel II (2004)

Basel II introduced three pillars:
- **Pillar 1**: Minimum capital for credit risk (standardized or **IRB approach**), market risk, and operational risk
- **Pillar 2**: Supervisory review process — regulators assess adequacy of a bank's own risk assessment
- **Pillar 3**: Market discipline — public disclosure requirements

The **Internal Ratings-Based (IRB) approach** allows banks to use their own PD, LGD, and EAD estimates to compute credit risk capital, subject to supervisory approval. Advanced IRB allows all three inputs to be internal; Foundation IRB only PD.

### Basel III (2010–2023)

Basel III responded to the 2008 crisis with:
- Higher **Tier 1 capital** requirements (4.5% CET1, up from 2%)
- **Capital conservation buffer** of 2.5% (must be met with CET1)
- **Countercyclical buffer**: 0–2.5%, set by national regulators
- **Leverage ratio**: minimum 3% (non-risk-based backstop)
- **Liquidity Coverage Ratio (LCR)**: sufficient HQLA to cover 30-day stress outflows
- **Net Stable Funding Ratio (NSFR)**: stable funding to cover 1-year illiquid assets

**Basel IV / CRR3** (finalized 2017, phasing in through 2028) adds output floors limiting the benefit banks can gain from internal models vs. the standardized approach.`,
  },
  {
    slug: "ch06-market-risk-capital",
    theme: "risk",
    chapterNumber: 6,
    title: "Market Risk and the Trading Book",
    partTitle: "Part Four: Regulation",
    estimatedMins: 25,
    sortOrder: 6,
    lessonContent: `## Market Risk and the Trading Book

Banks hold assets in either the **trading book** (mark-to-market, held for trading or hedging) or the **banking book** (accrual accounting, held to maturity/collection). Market risk capital requirements apply primarily to the trading book.

### The Internal Models Approach (Pre-FRTB)

Under Basel 2.5, approved banks could use internal VaR models:
- **10-day 99% VaR** as the primary measure
- Capital = max(VaR, multiplier × 60-day average VaR), where the multiplier starts at 3 and increases if backtesting reveals poor model performance
- **Stressed VaR**: VaR recalculated using a 12-month stress period (2008 crisis window typically)
- **Incremental Risk Charge (IRC)**: captures default and migration risk for credit-sensitive instruments in the trading book

### Backtesting

Banks must backtest their VaR models daily: compare the model's 1-day 99% VaR against actual P&L. If more than 4 exceptions occur in 250 days (the "red zone"), the multiplier increases. The **traffic light approach** classifies 0–4 exceptions as green, 5–9 as yellow, and 10+ as red.

### FRTB (Fundamental Review of the Trading Book)

Basel's **FRTB** framework (part of Basel IV) overhauled market risk capital:
- Replaced 99% VaR with **97.5% ES** on a 10-day horizon (with liquidity horizon add-ons up to 120 days for illiquid instruments)
- Tightened the boundary between trading and banking books
- Introduced **P&L attribution tests** (new requirement) to validate internal models
- Strengthened the standardized approach as an output floor`,
  },
]
