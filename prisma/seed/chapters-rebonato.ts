// Rebonato "Interest Rate Option Models" — 14 core chapters

export const rebonatoChapters = [
  {
    slug: "rch01-framework",
    theme: "rate-models",
    chapterNumber: 1,
    title: "The Framework",
    partTitle: "Part One: Foundations",
    estimatedMins: 30,
    sortOrder: 1,
    lessonContent: `## The Framework for Interest Rate Option Models

### Why Interest Rate Models Are Different

Interest rate models are fundamentally more complex than equity models for several reasons:

1. **Mean reversion**: Interest rates tend to revert to long-run levels—a 20% interest rate will likely fall; a 0% rate will likely rise. Equity prices have no such property.
2. **Multiple instruments**: A complete yield curve consists of many maturities, all of which must be modelled consistently.
3. **No-arbitrage within the term structure**: Forward rates implied by the model must be consistent with each other—you cannot have two models that price the same swap differently.

### The Choice of Variables

We can describe the term structure through:
- **Short rate r(t)**: Instantaneous borrowing rate; elegant but not directly observable
- **Discount factors P(t,T)**: The price today of $1 paid at T; directly linked to prices
- **Forward rates f(t,T)**: The continuously compounded rate applying between T and T+dt, agreed at t
- **LIBOR rates L(t,T)**: Simple interest rates for specific tenors; directly market-observable

Rebonato argues that models should be calibrated to *observable* quantities—hence the appeal of LIBOR Market Models over short-rate models.

### Risk-Neutral vs. Forward Measure

For interest rate derivatives, the **T-forward measure** (using P(t,T) as numeraire) is often more natural than the risk-neutral measure, because under the T-forward measure, forward prices are martingales without needing to model the short rate dynamics explicitly.

The **annuity measure** (using the annuity as numeraire) is the natural measure for swap rates—the swap rate is a martingale under this measure, simplifying swaption pricing dramatically.`,
  },
  {
    slug: "rch02-lattice-methods",
    theme: "rate-models",
    chapterNumber: 2,
    title: "Lattice Methods for One-Factor Models",
    partTitle: "Part One: Foundations",
    estimatedMins: 35,
    sortOrder: 2,
    lessonContent: `## Lattice Methods for One-Factor Models

### Building Interest Rate Trees

Interest rate trees discretize the evolution of the short rate. Unlike equity trees (where the underlying is directly modelled), interest rate trees must produce a self-consistent set of discount factors.

### Hull-White Trinomial Tree

The Hull-White model (one-factor) is:
**dr = [θ(t) − ar]dt + σdz**

where a is the mean-reversion speed and σ is volatility. θ(t) is chosen to fit the initial yield curve exactly (this is the "no-arbitrage" condition).

A trinomial tree (up/middle/down moves) is used because it provides more flexibility than a binomial tree:
- At each node, three branches: up (probability p_u), middle (p_m), down (p_d)
- Probabilities are chosen to match the mean and variance of dr
- When the tree reaches extreme rate values, the branching is adjusted to keep rates positive

**Key feature**: The tree automatically fits the current yield curve because θ(t) is calibrated to market discount factors at each time step.

### Arrow-Debreu Prices

**Arrow-Debreu (A-D) securities** pay $1 if a specific node (i, j) is reached and 0 otherwise. Their values Q(i,j) can be computed recursively.

Once A-D prices are known, the price of any interest rate derivative is simply:
P = Σᵢⱼ Q(i,j) × Payoff(i,j)

This makes the valuation of caps, floors, and swaptions on a tree computationally efficient.

### Fitting to Market Data

The free function θ(t) (or equivalently, the mean-reversion level) is calibrated step-by-step to match observed zero prices P(0,T₁), P(0,T₂), etc. This exact fitting distinguishes arbitrage-free models from equilibrium models.`,
  },
  {
    slug: "rch03-short-rate-models",
    theme: "rate-models",
    chapterNumber: 3,
    title: "Calibrating the Models to Caps and Swaptions",
    partTitle: "Part Two: Short Rate Models",
    estimatedMins: 40,
    sortOrder: 3,
    lessonContent: `## Calibrating Short Rate Models to Caps and Swaptions

### The Calibration Problem

Any tractable model has fewer parameters than market instruments. Calibration chooses parameter values to minimize the pricing error across a set of liquid instruments.

For short-rate models, calibration targets are typically:
- **Caps and floors**: Sequences of caplets/floorlets on 3-month rates
- **Swaptions**: Options on swap rates at various maturities and tenors

The model must reproduce cap prices (which pin down the term structure of short-rate volatility) and swaption prices (which depend on the correlation structure of rates across maturities).

### One-Factor Model Limitations

A one-factor model implies **perfect correlation** between moves at all maturities (since there is only one source of randomness). In reality, short rates and long rates are not perfectly correlated.

This means a one-factor model cannot simultaneously fit both caps and swaptions well—it is **over-constrained**. The model will price either caps or swaptions correctly, but not both.

### Vasicek and Hull-White Calibration

For Hull-White: dr = (θ(t) − ar)dt + σdz

Parameters:
- a (mean reversion): Controls the "humped" shape of the cap vol surface
- σ (volatility): Controls the overall level of volatility
- θ(t): Calibrated to the yield curve (not a free parameter for calibration to options)

Swaption prices under Hull-White have an analytical formula (since the bond price is lognormal). Calibrate a and σ by minimizing errors in swaption implied vols.

### The Calibration Instability Problem

Adding more parameters improves fit but reduces stability. Parameters calibrated today may change dramatically tomorrow due to small market moves. This **calibration instability** is a practical problem—a model whose parameters jump around cannot be used for P&L attribution or risk management.`,
  },
  {
    slug: "rch04-bdt-bk",
    theme: "rate-models",
    chapterNumber: 4,
    title: "Black-Derman-Toy and Black-Karasinski Models",
    partTitle: "Part Two: Short Rate Models",
    estimatedMins: 35,
    sortOrder: 4,
    lessonContent: `## Black-Derman-Toy and Black-Karasinski Models

### The Log-Normal Short Rate

A fundamental problem with normal short-rate models (Vasicek, Hull-White) is that interest rates can become negative—a concern even if historically uncommon (less so post-2008). Log-normal models ensure rates stay positive.

### Black-Derman-Toy (BDT) Model

**BDT** (Black, Derman, Toy 1990) models the log of the short rate:
d(ln r) = θ(t) dt + σ(t) dz

The tree has the property: upper node rate / lower node rate = constant at each time step. Two free functions θ(t) and σ(t) allow exact fitting to both the yield curve AND the term structure of cap volatilities.

**Key limitation**: BDT has mean reversion implicitly determined by σ(t). If σ(t) is increasing, the implied mean reversion is negative (rates diverge). This makes BDT poorly suited to risk management over long horizons.

### Black-Karasinski (BK) Model

**BK** separates mean reversion from the volatility term:
d(ln r) = [θ(t) − a(t) ln r]dt + σ(t) dz

This is the log-normal analog of Hull-White. Three free functions θ(t), a(t), σ(t) provide more flexibility. Log-normal rates stay positive. Calibration to caps and/or swaptions is possible.

**Trade-off**: BK requires numerical methods (no analytical formulas for bond prices or option prices), making calibration slower.

### Comparing One-Factor Models

| Model | Rates | Mean Rev | Analytical Bonds | Fit Caps | Fit Swptns |
|-------|-------|----------|-----------------|----------|------------|
| Vasicek | Normal | Yes | Yes | No | No |
| Hull-White | Normal | Yes | Yes | No | Yes |
| BDT | Log-normal | Implicit | No | Yes | No |
| BK | Log-normal | Explicit | No | Yes | No |

All one-factor models share the perfect correlation limitation for simultaneous fitting.`,
  },
  {
    slug: "rch05-two-factor",
    theme: "rate-models",
    chapterNumber: 5,
    title: "Two-Factor Models",
    partTitle: "Part Two: Short Rate Models",
    estimatedMins: 40,
    sortOrder: 5,
    lessonContent: `## Two-Factor Models

### Motivation

One-factor models are inadequate for two main reasons:
1. **Imperfect correlation**: The yield curve can flatten or steepen—long rates and short rates can move independently. This requires at least two factors.
2. **Volatility humps**: Cap volatilities often show a "hump" (peak at 1–3 years) that cannot be reproduced by one-factor models. Two factors naturally generate humped vol structures.

### Longstaff-Schwartz (LS) Model

The LS model has two state variables: the short rate r and its variance V (volatility):
dr = (α − βr + γV)dt + √V dz_1
dV = (δ − εV)dt + ζ√V dz_2

The two factors are correlated via ρ. Analytical formulas for bond prices exist (affine structure). The model generates imperfect correlations across the yield curve.

### Brennan-Schwartz and Other Two-Factor Models

Many two-factor models are **affine** — yields are linear in the state variables. The key property of affine models: P(t,T) = exp(A(T−t) + B(T−t) × r + C(T−t) × V). Analytical bond prices exist.

### G2++ (Two-Factor Hull-White)

The **G2++ model** (Brigo & Mercurio) is the two-factor extension of Hull-White, popular in practice:
r(t) = x(t) + y(t) + φ(t)
dx = −ax dt + σ₁ dz₁
dy = −by dt + σ₂ dz₂
with correlation ρ between dz₁ and dz₂.

Bond prices have analytical formulas; caplet and swaption formulas are approximately analytical. G2++ can simultaneously fit caps and swaptions and generate realistic yield curve dynamics.

### Correlation and Calibration

Two-factor models require calibrating the cross-factor correlation ρ. This is typically done by fitting to the swaption matrix—different entries in the swaption matrix are sensitive to different aspects of the correlation structure.`,
  },
  {
    slug: "rch06-hjm",
    theme: "rate-models",
    chapterNumber: 6,
    title: "The Heath-Jarrow-Morton Framework",
    partTitle: "Part Three: HJM and LMM",
    estimatedMins: 45,
    sortOrder: 6,
    lessonContent: `## The Heath-Jarrow-Morton Framework

### The HJM Approach

Heath, Jarrow, and Morton (1992) proposed modelling the *entire forward rate curve* directly, rather than the short rate. This is the key conceptual advance: instead of one state variable (r), the state space is the whole curve.

**HJM dynamics** (instantaneous forward rates f(t,T)):
df(t,T) = μ(t,T) dt + σ(t,T) dz(t)

where the drift μ and volatility σ can depend on the current state of the yield curve (making HJM a non-Markovian framework in general).

### The HJM No-Arbitrage Condition

The key result of HJM: under the risk-neutral measure, the drift of forward rates is **completely determined** by the volatility structure:

**μ(t,T) = σ(t,T) × ∫_t^T σ(t,s)ds**

This is the HJM drift condition. It says: once you specify the volatility surface σ(t,T), the drift is not a free choice—it is fixed by no-arbitrage.

### Implications

1. Short-rate models (HW, BK, etc.) are special cases of HJM where σ(t,T) has a specific functional form.
2. Any arbitrage-free interest rate model can be written in HJM form.
3. Calibration to the initial curve is automatic—it's built into the HJM structure.

### The Non-Markovian Problem

In general HJM models, the short rate depends on the *path* of the entire forward rate curve—the model is non-Markovian. For computational tractability, most practical implementations restrict σ(t,T) to produce Markovian dynamics (e.g., separable volatility functions).

A Markovian HJM model is equivalent to a short-rate model. The richest Markovian HJM specification with a humped vol is the **two-factor Markovian HJM**, equivalent to G2++.`,
  },
  {
    slug: "rch07-lmm-intro",
    theme: "rate-models",
    chapterNumber: 7,
    title: "The LIBOR Market Model: Introduction",
    partTitle: "Part Three: HJM and LMM",
    estimatedMins: 50,
    sortOrder: 7,
    lessonContent: `## The LIBOR Market Model: Introduction

### Motivation

All previous models (HJM, short-rate models) model **instantaneous** rates that are mathematical abstractions not directly observable in the market. The **LIBOR Market Model** (LMM, also called the BGM model after Brace, Gatarek, Musiela 1997) models **market-observable rates**: LIBOR forward rates for discrete tenors (3-month, 6-month, etc.).

This has profound practical advantages:
1. Cap and floor prices are given by Black's formula (the market standard) *by construction*
2. Model parameters (caplet volatilities) are directly observable in the market
3. The model is intuitive to traders who price caps using Black's formula daily

### LMM Setup

Consider a set of reset dates T₀ < T₁ < ... < Tₙ. Define:
- **L(t;Tₖ)**: the LIBOR rate set at Tₖ for the period [Tₖ, Tₖ₊₁]
- **τₖ**: the length of the period [Tₖ, Tₖ₊₁] (e.g., 0.25 for 3-month rates)

Under the **(k+1)-forward measure** (using P(t, Tₖ₊₁) as numeraire), each forward LIBOR rate is a **martingale**:
dL(t;Tₖ) = σₖ(t) × L(t;Tₖ) × dz^(k+1)(t)

This log-normal dynamics for each rate immediately gives Black's formula for caplets—the model is consistent with market pricing by construction.

### Caplet Pricing

The caplet on L(t;Tₖ) with strike K:
Caplet = τₖ × P(0,Tₖ₊₁) × [L(0;Tₖ) × N(d₁) − K × N(d₂)]

d₁ = [ln(L(0;Tₖ)/K) + ½v²Tₖ] / (v√Tₖ)

where v² = (1/Tₖ) × ∫₀^Tₖ σₖ(t)² dt is the average squared volatility.

This is exactly Black's formula. A cap (a series of caplets) is priced as the sum of Black's formula applied to each caplet.`,
  },
  {
    slug: "rch08-lmm-dynamics",
    theme: "rate-models",
    chapterNumber: 8,
    title: "Dynamics and Calibration of the LMM",
    partTitle: "Part Three: HJM and LMM",
    estimatedMins: 50,
    sortOrder: 8,
    lessonContent: `## Dynamics and Calibration of the LMM

### Terminal vs. Spot Measure

In the LMM, each rate Lₖ has simple dynamics under its natural (k+1)-forward measure. But to simulate *all* rates simultaneously, we need a common measure.

**Terminal measure** (Tₙ-measure): Useful for pricing instruments with a single terminal payoff.

**Spot measure (rolling measure)**: Uses the rolling money-market account as numeraire. The drift of Lₖ under the spot measure is:
μₖ(t) = Σⱼ₌ₖ₊₁^ₙ [ρₖⱼ × τⱼ × σₖ(t) × σⱼ(t) × Lⱼ(t)] / [1 + τⱼ × Lⱼ(t)]

where ρₖⱼ is the correlation between rate k and rate j. This drift is the HJM drift condition expressed in LIBOR terms.

### Parametric Volatility Functions

The volatility σₖ(t) for each rate must be specified. Common parameterizations:

**Rebonato's humped volatility**:
σₖ(t) = [a + b(Tₖ − t)] × exp[−c(Tₖ − t)] + d

where a, b, c, d are constant parameters. This produces the "hump" shape seen in cap markets. Calibration: choose a, b, c, d to minimize errors in cap prices across all maturities.

### Correlation Structure

LMM requires specifying the full correlation matrix {ρₖⱼ}. This is a high-dimensional problem. Practical approaches:

**Rebonato's parametric correlation**:
ρᵢⱼ = exp[−β|Tᵢ − Tⱼ|]

One parameter β controls the rate at which correlation decays with tenor distance. β close to 0 → all rates highly correlated; β large → only adjacent rates correlated.

**Full rank vs. reduced rank**: For simulation, the full n×n correlation matrix can be decomposed into r < n factors via PCA. This reduces dimensionality while capturing most of the variation.

### Swaption Pricing in LMM

Swaptions require the joint distribution of LIBOR rates—no simple closed form exists. The standard approximation (Rebonato's formula) expresses the implied swap rate variance in terms of the LIBOR rate variances and correlations:

σ²_swap ≈ Σᵢ Σⱼ wᵢ wⱼ ρᵢⱼ σᵢ σⱼ

where wᵢ are weights related to the annuity and forward LIBOR rates. This allows fast approximate swaption pricing.`,
  },
  {
    slug: "rch09-swaption-calibration",
    theme: "rate-models",
    chapterNumber: 9,
    title: "Swaption Pricing and Calibration",
    partTitle: "Part Three: HJM and LMM",
    estimatedMins: 45,
    sortOrder: 9,
    lessonContent: `## Swaption Pricing and Calibration

### The Swaption Market

A **swaption** is an option to enter a swap at a specified swap rate K at a future date T_exp. A **payer swaption** gives the right to pay fixed rate K and receive floating; a **receiver swaption** gives the right to receive fixed and pay floating.

Market quotes the **swaption matrix**: rows indexed by option expiry (1m, 3m, 6m, 1y, 2y, 5y, 10y), columns indexed by swap tenor (1y, 2y, 5y, 10y, 20y, 30y).

### Black's Formula for Swaptions

Under the annuity measure (using the annuity A(t) as numeraire), the forward swap rate S(t) is a martingale if modelled as:
dS = σ_swap × S × dz^annuity

Then: Payer Swaption = A(0) × [S(0) × N(d₁) − K × N(d₂)]

where d₁ = [ln(S(0)/K) + ½σ²_swap × T_exp] / (σ_swap × √T_exp)

This is the market standard formula. The swaption matrix reports Black's implied swap rate volatilities.

### LMM Calibration to Swaptions

The LMM caplet prices are exact (by construction). Fitting swaptions requires calibrating the **correlation matrix** ρᵢⱼ.

**Key insight** (Rebonato): The swaption vol σ_swap depends on:
1. Individual caplet vols σᵢ (already fixed by cap calibration)
2. Correlations ρᵢⱼ between different LIBOR rates

Therefore, swaption calibration determines the correlation structure, given that caplet vols are already calibrated.

**Fit procedure**:
1. Calibrate σᵢ(t) to cap prices (cap-calibration step)
2. Using these vols, calibrate ρᵢⱼ (via the parametric form ρᵢⱼ = e^(−β|Tᵢ−Tⱼ|)) to swaption prices

### The Rank-Reduction Approach

Instead of fitting the full correlation matrix, use a reduced-rank (r-factor) approximation. The number of factors r is a model choice balancing accuracy vs. computational cost.

Rebonato advocates choosing r ≥ 3 to capture the main features of yield curve dynamics: parallel shift, slope change (twist), and curvature change (butterfly).`,
  },
  {
    slug: "rch10-smile-models",
    theme: "volatility",
    chapterNumber: 10,
    title: "Smile Modelling: Local Volatility and Beyond",
    partTitle: "Part Four: Smile and Stochastic Volatility",
    estimatedMins: 50,
    sortOrder: 10,
    lessonContent: `## Smile Modelling: Local Volatility and Beyond

### The Smile Problem in Interest Rates

The standard LMM assumes log-normal LIBOR rates, producing flat implied volatility smiles. In reality, cap and swaption markets exhibit pronounced **volatility smiles**:
- OTM caps/floors trade at higher implied vols than ATM instruments
- The smile shape changes with maturity

This indicates the market's risk-neutral distribution is not lognormal—it has heavier tails and possible skew.

### Normal vs. Log-Normal

Post-2008, with rates near zero and occasionally negative, log-normal models became problematic (log-normal dynamics prohibit negative rates). The market shifted toward:

**Shifted lognormal**: Model (L + δ) as lognormal, so L can be as negative as −δ. Simple fix; limited smile flexibility.

**Normal model (Bachelier)**: dL = σ_normal × dz. Rates can be negative; caplet pricing uses the normal distribution formula. Widely used for near-zero rates.

### SABR Model for Rates

The **SABR model** (Hagan et al., 2002) is the industry standard for capturing the smile in interest rate derivatives:
dF = σ × F^β × dW
dσ = α × σ × dZ
E[dW dZ] = ρ dt

Parameters: α (vol of vol), β (elasticity), ρ (correlation), and initial vol σ₀. The famous **Hagan formula** gives an analytical approximation for implied volatility as a function of strike.

### SABR Parameters and Smile Shape

- **β ≈ 0**: Normal-like dynamics; suitable for low/negative rates
- **β ≈ 0.5**: CEV-like dynamics
- **β = 1**: Log-normal dynamics (no smile from β alone)
- **ρ < 0**: Negatively skewed smile (lower strike → higher vol); typical for rates
- **α > 0**: Smile curvature (convexity); higher α → wider smile

### LMM with SABR (SABR-LMM)

The **SABR-LMM** combines the correlation structure of LMM with SABR dynamics for each rate. This produces a full model that fits both the smile surface and the correlation structure. It is the state-of-the-art for exotic IR options.`,
  },
  {
    slug: "rch11-ir-exotics",
    theme: "exotics",
    chapterNumber: 11,
    title: "Interest Rate Exotic Derivatives",
    partTitle: "Part Five: Applications",
    estimatedMins: 45,
    sortOrder: 11,
    lessonContent: `## Interest Rate Exotic Derivatives

### Caps, Floors, and Collars

A **cap** is a series of caplets. A caplet with notional N, rate period [Tₖ, Tₖ₊₁], strike K pays:
N × τₖ × max(Lₖ − K, 0) at Tₖ₊₁

A **floor** pays N × τₖ × max(K − Lₖ, 0). A **collar** is a long cap + short floor (or vice versa)—a common structure for corporates: they buy a cap and sell a floor to partially offset the premium.

**Cap-floor parity**: cap − floor = swap (the floating leg minus the fixed leg of a swap with the same parameters).

### Bermudan Swaptions

A **Bermudan swaption** can be exercised on any of a set of exercise dates, entering into a specific swap. It is more valuable than a European swaption (more exercise flexibility) but less valuable than an American swaption.

Pricing requires:
1. A model calibrated to the swaption surface (capturing correlations)
2. An optimal stopping algorithm (Longstaff-Schwartz, or exercise boundary methods)
3. The exercise boundary typically depends on the current swap rate vs. a threshold

Bermudan swaptions are particularly sensitive to the **correlation** between rates—they are one of the key instruments for calibrating the correlation structure in LMM.

### CMS Products

**Constant Maturity Swap (CMS)**: One leg pays the 10-year swap rate (not LIBOR), reset periodically. The CMS rate is correlated across maturities; pricing requires a full model of the yield curve evolution.

**CMS spread option**: Pays the difference between two CMS rates (e.g., 10y − 2y swap rate), crucial for expressing views on the yield curve shape.

### Range Accruals

A **range accrual** pays a fixed coupon for each day the reference rate lies within a specified range [L, U]. Pricing requires integrating over the conditional distribution of the rate. Highly sensitive to the vol smile and correlation.`,
  },
  {
    slug: "rch12-market-models-advanced",
    theme: "rate-models",
    chapterNumber: 12,
    title: "Advanced Topics in Market Models",
    partTitle: "Part Five: Applications",
    estimatedMins: 50,
    sortOrder: 12,
    lessonContent: `## Advanced Topics in Market Models

### Displaced Diffusion and Normal LMM

To handle near-zero and negative rates, practitioners use the **displaced-diffusion LMM**:
dL(t;Tₖ) = σₖ(t) × (L(t;Tₖ) + δ) × dz^(k+1)(t)

The parameter δ is the displacement; at δ = 0, we recover standard LMM; at δ → ∞, the dynamics become approximately normal. A common choice δ = 3% allows rates to be as negative as −3%.

### Stochastic Volatility LMM (SV-LMM)

To capture the vol-of-vol dimension (smile and skew that evolve over time), a stochastic volatility factor ζ(t) is introduced:
dL(t;Tₖ) = σₖ(t) × ζ(t) × L(t;Tₖ) × dz^(k+1)(t)
dζ = κ(1 − ζ)dt + ε × √ζ × dW(t)

where dW is correlated with all LIBOR rate drivers. This is essentially a stochastic vol LMM where the vol-of-vol process is mean-reverting. Pricing exotic products requires Monte Carlo simulation.

### Terminal Decorrelation and the Problem of Hedging

A fundamental issue in LMM: **instantaneous correlations** and **terminal correlations** are different quantities. Two rates can have high instantaneous correlation but still exhibit substantial uncertainty in their ratio at a terminal date, due to the compounding of small deviations over many steps.

For Bermudan swaptions, terminal correlations matter most (the exercise decision depends on the swap rate at each exercise date, which is a functional of multiple LIBOR rates). Rebonato shows how to relate these two correlation concepts.

### Approximate Analytical Formulas

For complex exotic payoffs, Monte Carlo is often too slow for real-time pricing. Perturbation theory techniques (expanding around the at-the-money point) yield fast approximate formulas:

- Rebonato's swaption approximation formula
- CMS convexity adjustments
- Quanto adjustments for cross-currency products

These approximate formulas are invaluable for trading desks.`,
  },
  {
    slug: "rch13-model-risk",
    theme: "risk",
    chapterNumber: 13,
    title: "Model Risk and Validation",
    partTitle: "Part Six: Model Risk",
    estimatedMins: 40,
    sortOrder: 13,
    lessonContent: `## Model Risk and Validation

### What is Model Risk?

**Model risk** is the risk of loss due to errors in the models used for pricing and risk management. It has two main sources:
1. **Wrong model**: The assumed dynamics do not match reality
2. **Implementation error**: The correct model is incorrectly implemented

Model risk is particularly severe for complex derivatives where prices are model-dependent and cannot be verified against liquid market prices.

### Sources of Model Risk in IR Models

1. **Correlation assumptions**: The correlation matrix is not directly observable and is estimated from historical data that may not be representative of future regimes.

2. **Volatility dynamics**: Are volatilities mean-reverting? Are they driven by one or multiple factors? The answer affects exotic pricing substantially.

3. **Smile extrapolation**: Liquid strikes for caps and swaptions cover a limited range; exotic options may be sensitive to the vol smile far from the market.

4. **Calibration instability**: Daily recalibration changes model parameters, leading to P&L from parameter changes (not market moves). This is **model P&L** vs. **market P&L**.

### Hedging and Model-Dependence

The most fundamental consequence of model risk: **hedge ratios are model-dependent**. Two models calibrated to the same vanilla options may produce different delta and vega hedges for an exotic product.

Rebonato advocates **stress testing** hedge ratios across a range of plausible model specifications. If the hedge is robust across models, confidence is higher; if it varies wildly, model risk is high.

### Model Validation Framework

Best practices for model validation:
1. **Independent model validation**: A separate team (not the front office) validates models
2. **Benchmark testing**: Compare model prices to those of independent systems
3. **Back-testing**: Check that model P&L explains actual P&L
4. **Scenario analysis**: Stress models to extreme parameter values
5. **Sensitivity analysis**: Verify greeks match finite-difference bumps`,
  },
  {
    slug: "rch14-practical",
    theme: "rate-models",
    chapterNumber: 14,
    title: "Practical Aspects of Calibration and Hedging",
    partTitle: "Part Six: Model Risk",
    estimatedMins: 45,
    sortOrder: 14,
    lessonContent: `## Practical Aspects of Calibration and Hedging

### The Calibration Manifold

For a model with n parameters, the set of parameter values consistent with m market prices (m < n) forms an (n − m)-dimensional **calibration manifold**. Different points on this manifold give the same vanilla prices but different prices for exotics.

Choosing a point on this manifold is a non-trivial decision. Common approaches:
1. **Minimum-norm regularization**: Choose the parameter set closest to a prior (e.g., yesterday's parameters)
2. **Maximum smoothness**: Choose parameters that vary smoothly across the smile
3. **Historical fit**: Include a term penalizing deviation from historically observed parameters

### Hedging in Practice

**Vega hedging**: The vega of an exotic product is a vector (one entry per vanilla instrument used for calibration). Hedging vega requires a portfolio of vanilla instruments.

**Correlation hedging**: Exposures to the correlation matrix cannot be hedged directly (no market for correlation). The only hedges available are swaptions (which have indirect correlation exposure via the annuity weighting). This is a fundamental limitation.

### The Smoothness-Fit Trade-Off

Rebonato's key insight: **overfit calibration produces unstable hedges**. If the model exactly fits every market price by allowing parameters to jump freely, the hedge ratios will also jump—generating model P&L that is actually hedge instability.

A well-regularized calibration that fits the market *approximately but smoothly* produces more stable hedges and better risk management, even if the daily mark-to-model is slightly off.

### Transition from LIBOR to SOFR

The LIBOR transition (fully completed by mid-2023) created new challenges:
1. **Fallback language**: Contracts written under LIBOR needed fallback provisions to switch to SOFR (compounded overnight) or SOFR + spread adjustment
2. **Convexity adjustment**: SOFR is a compounded overnight rate; its distribution differs from forward LIBOR
3. **Multi-curve reconstruction**: SOFR curves must be built from scratch without decades of SOFR history
4. **Model recalibration**: All LMM models calibrated to LIBOR caplets needed rebuilding for SOFR caps`,
  },
]
