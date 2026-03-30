// Rebonato questions — all 14 chapters

const mcq = (stem: string, choices: string[], correctIndex: number, explanation: string, difficulty = "MEDIUM", tags: string[] = [], sourceRef?: string) => ({
  questionType: "MCQ", difficulty, stem, explanation,
  answerData: JSON.stringify({ choices, correctIndex }),
  tags: JSON.stringify(tags), sourceRef: sourceRef ?? null,
})
const tf = (stem: string, correct: boolean, explanation: string, difficulty = "MEDIUM", tags: string[] = [], sourceRef?: string) => ({
  questionType: "TRUE_FALSE", difficulty, stem, explanation,
  answerData: JSON.stringify({ correct }),
  tags: JSON.stringify(tags), sourceRef: sourceRef ?? null,
})

// ── CHAPTER 1: Framework ──────────────────────────────────────────────────────
export const rebCh01 = [
  mcq("Why is interest rate modelling more complex than equity modelling?",
    ["Interest rates are not observable", "Interest rates must be mean-reverting and yield curves must be internally consistent",
      "Interest rate derivatives are always path-dependent", "Interest rate markets are less liquid"],
    1, "IR models face three challenges absent in equity: mean reversion (rates can't grow without bound), yield curve consistency (all maturities modelled jointly), and no single 'underlying' (the whole curve evolves).", "EASY", ["framework"]),

  tf("In interest rate modelling, the short rate r(t) is directly observable in the market.",
    false, "The instantaneous short rate r(t) is a mathematical construct—it is the limit of overnight rates and not directly observable. LIBOR, SOFR, and swap rates are observable.", "EASY", ["short-rate"]),

  mcq("The T-forward measure uses which numeraire?",
    ["The money-market account B(t) = e^(∫r ds)", "The zero-coupon bond P(t,T)",
      "The annuity A(t) = Σ τᵢP(t,Tᵢ)", "The equity index"],
    1, "The T-forward measure uses P(t,T) as numeraire. Under this measure, the forward price of any asset is a martingale, simplifying interest rate option pricing.", "MEDIUM", ["forward-measure"]),

  mcq("Under the annuity (swap) measure, which quantity is a martingale?",
    ["The LIBOR rate", "The zero-coupon bond price", "The swap rate", "The instantaneous forward rate"],
    2, "Using the annuity as numeraire, the forward swap rate is a martingale. This is why Black's formula for swaptions holds: the swap rate has lognormal dynamics under the annuity measure.", "MEDIUM", ["swap-measure", "martingale"]),

  tf("Under the risk-neutral measure, all assets earn the risk-free rate r(t).",
    true, "The risk-neutral measure Q is defined so that discounted asset prices are martingales. Equivalently, all assets have expected return r(t) under Q (regardless of their real-world drift).", "EASY", ["risk-neutral"]),

  mcq("The key advantage of the LIBOR Market Model over short-rate models is:",
    ["It is easier to implement", "It models directly observable market rates, giving Black's formula for caps by construction",
      "It produces a flat volatility smile", "It does not require numerical methods"],
    1, "The LMM models market LIBOR rates (which traders quote and price via Black's formula) rather than abstract short rates. Caplets are priced by Black's formula exactly.", "MEDIUM", ["lmm", "market-model"]),
]

// ── CHAPTER 2: Lattice Methods ────────────────────────────────────────────────
export const rebCh02 = [
  mcq("In a Hull-White trinomial tree, the time-dependent drift θ(t) is used to:",
    ["Match the observed cap volatility surface", "Fit the initial yield curve exactly",
      "Prevent negative interest rates", "Calibrate to swaption prices"],
    1, "θ(t) is calibrated step by step to reproduce the observed zero-coupon bond prices P(0,T) at each maturity. This is the 'no-arbitrage' condition.", "MEDIUM", ["hull-white", "tree"]),

  tf("Arrow-Debreu prices are state prices that represent the cost of receiving $1 in a specific state.",
    true, "Arrow-Debreu prices Q(i,j) are the prices of securities paying $1 if node (i,j) is reached and 0 otherwise. Any derivative price can be computed as Σ Q(i,j) × payoff(i,j).", "MEDIUM", ["arrow-debreu"]),

  mcq("A trinomial tree has three branches from each node because:",
    ["Rates can only go up, stay flat, or go down",
      "Three branches provide better control over mean and variance while keeping rates positive",
      "Three branches are required by the risk-neutral condition",
      "A binomial tree cannot price interest rate options"],
    1, "The three branches allow matching of both the first and second moments of the rate distribution while maintaining numerical stability (rates bounded within a reasonable range).", "MEDIUM", ["trinomial-tree"]),

  mcq("The Hull-White model dr = (θ(t) − ar)dt + σdz has parameter 'a' representing:",
    ["The initial level of interest rates", "The mean reversion speed",
      "The volatility of the short rate", "The market price of risk"],
    1, "Parameter 'a' is the mean-reversion speed: higher 'a' means rates revert more quickly to the long-run level θ(t)/a. It controls the 'hump' shape of cap volatilities.", "EASY", ["hull-white", "mean-reversion"]),

  tf("In a Hull-White tree, once the yield curve is fitted, there are no free parameters left for option pricing.",
    false, "After fitting the yield curve (θ(t) is fixed), the parameters a (mean reversion) and σ (volatility) remain and are calibrated to option prices (caps or swaptions).", "MEDIUM", ["hull-white", "calibration"]),
]

// ── CHAPTER 3: Calibration ────────────────────────────────────────────────────
export const rebCh03 = [
  mcq("The primary limitation of a one-factor interest rate model for simultaneously fitting caps and swaptions is:",
    ["One-factor models cannot fit the initial yield curve",
      "Perfect correlation across all maturities prevents independent fitting of caps and swaptions",
      "One-factor models produce only lognormal distributions",
      "One-factor models are computationally too slow"],
    1, "In a one-factor model, all rates move in perfect correlation (single source of randomness). This over-constrains the model—it can fit either caps or swaptions well, but not both simultaneously.", "HARD", ["one-factor", "calibration"]),

  mcq("Calibration instability in interest rate models refers to:",
    ["Models that produce unstable interest rates",
      "Significant day-to-day changes in model parameters due to small market moves",
      "Numerical instability in Monte Carlo simulation",
      "Models that cannot be calibrated to the yield curve"],
    1, "Calibration instability: parameters chosen today can change dramatically with small market moves, generating 'model P&L' that is actually a hedging artefact, not a true market gain or loss.", "HARD", ["calibration", "model-risk"]),

  tf("Adding more free parameters to a model always improves its pricing accuracy for exotic derivatives.",
    false, "More parameters improve fit to calibration instruments but can lead to instability, overfitting, and poor interpolation/extrapolation. A regularized simpler model often outperforms in practice.", "MEDIUM", ["model-risk", "overfitting"]),

  mcq("A swaption price in the Hull-White model depends primarily on which parameter?",
    ["The volatility σ of the short rate", "The mean-reversion speed a and volatility σ jointly",
      "Only the initial yield curve", "The correlations between different rates"],
    1, "Swaption prices in HW depend on both a and σ. The mean reversion a determines how quickly rates de-correlate, affecting swaption prices differently from caps.", "HARD", ["hull-white", "swaption"]),
]

// ── CHAPTER 4: BDT and BK ─────────────────────────────────────────────────────
export const rebCh04 = [
  mcq("The Black-Derman-Toy (BDT) model is preferred over Hull-White when:",
    ["Negative interest rates are expected",
      "Log-normal dynamics are desired (rates remain positive) and the term structure of volatilities is to be fitted",
      "Analytical bond pricing formulas are needed",
      "The model will be calibrated only to swaptions"],
    1, "BDT is log-normal (r stays positive) and has two free time functions (θ(t) and σ(t)) that can fit both the yield curve and the cap volatility structure simultaneously.", "MEDIUM", ["bdt", "lognormal"]),

  tf("In the BDT model, negative interest rates are possible.",
    false, "BDT models ln(r), so r = e^(something) > 0 always. Rates are always positive in BDT. This is an advantage over normal models like Hull-White.", "EASY", ["bdt", "negative-rates"]),

  mcq("The Black-Karasinski model differs from BDT primarily in that it:",
    ["Uses a normal distribution for rates", "Has an explicit and independently controllable mean-reversion speed",
      "Cannot be calibrated to the initial yield curve",
      "Does not allow time-varying parameters"],
    1, "BK separates mean reversion a(t) from volatility σ(t): d(ln r) = [θ(t) − a(t)ln r]dt + σ(t)dz. BDT's mean reversion is implicitly determined by σ(t) and cannot be independently specified.", "HARD", ["bk", "mean-reversion"]),

  mcq("Why can BDT have negative implied mean reversion?",
    ["It uses log-normal dynamics", "If σ(t) is increasing, the implied mean reversion becomes negative",
      "BDT does not have mean reversion",
      "Negative mean reversion arises from the no-arbitrage condition"],
    1, "In BDT, the mean-reversion level depends on σ(t). If σ(t) increases with time, the implied mean reversion is actually negative (rates diverge), which is economically unreasonable for long-horizon modelling.", "HARD", ["bdt", "mean-reversion"]),
]

// ── CHAPTER 5: Two-Factor Models ─────────────────────────────────────────────
export const rebCh05 = [
  mcq("What is the key advantage of two-factor interest rate models over one-factor models?",
    ["They always have analytical formulas for all derivatives",
      "They allow imperfect correlation between rates at different maturities and can generate humped volatility structures",
      "They are simpler to calibrate",
      "They eliminate the need for mean reversion"],
    1, "Two-factor models allow different maturities to move somewhat independently (imperfect correlation), and can generate humped volatility curves (short rates volatile, long rates less so, or vice versa).", "MEDIUM", ["two-factor"]),

  tf("In the G2++ model, there are two independent Ornstein-Uhlenbeck processes driving the short rate.",
    true, "G2++: r = x + y + φ(t). x and y each follow Ornstein-Uhlenbeck (mean-reverting Gaussian) processes dx = −ax dt + σ₁ dz₁, dy = −by dt + σ₂ dz₂, with correlation ρ between dz₁ and dz₂.", "MEDIUM", ["g2++", "ou-process"]),

  mcq("In a two-factor model, calibrating to the swaption matrix rather than just the diagonal allows fitting of:",
    ["The term structure of zero rates", "The correlation structure between rates at different maturities",
      "The credit spread surface", "The dividend yield curve"],
    1, "Off-diagonal swaption entries (e.g., 5y expiry into 10y tenor vs 5y expiry into 2y tenor) are sensitive to the correlation between different maturities of the yield curve.", "HARD", ["swaption-matrix", "correlation"]),

  mcq("The Longstaff-Schwartz two-factor model has state variables r and V. V represents:",
    ["The forward rate at a specific tenor", "The variance (volatility squared) of the short rate",
      "The 10-year yield", "The credit spread"],
    1, "In Longstaff-Schwartz, V is the variance/volatility of the short rate. Stochastic volatility introduces the second factor, generating humped vol structures and richer dynamics.", "HARD", ["longstaff-schwartz"]),
]

// ── CHAPTER 6: HJM Framework ──────────────────────────────────────────────────
export const rebCh06 = [
  mcq("The HJM no-arbitrage drift condition states that the drift of forward rates μ(t,T) is:",
    ["A free parameter to be calibrated",
      "Completely determined by the volatility structure σ(t,T): μ(t,T) = σ(t,T) × ∫_t^T σ(t,s)ds",
      "Always zero under the T-forward measure",
      "Equal to the short rate r(t)"],
    1, "The HJM drift restriction: μ(t,T) = σ(t,T) × ∫_t^T σ(t,s)ds. Once the volatility surface σ(t,T) is specified, the drift is fixed by no-arbitrage. This is the central result of HJM.", "HARD", ["hjm", "drift-restriction"]),

  tf("The HJM framework requires modelling the short rate as the primary state variable.",
    false, "HJM models the ENTIRE forward rate curve f(t,T) directly. The short rate r(t) = f(t,t) is a by-product. This is more general than short-rate models.", "MEDIUM", ["hjm"]),

  mcq("A general HJM model is non-Markovian because:",
    ["Forward rates are always correlated", "The future evolution depends on the entire history of the forward rate curve",
      "The model has infinitely many parameters", "It cannot be implemented numerically"],
    1, "In general HJM, the current short rate depends on the history of forward rate curve evolution. This is non-Markovian. For computational tractability, one must restrict to Markovian (finite-state) specifications.", "HARD", ["hjm", "markovian"]),

  mcq("Which of the following interest rate models is a special case of the HJM framework?",
    ["Black-Scholes-Merton", "CAPM", "Hull-White one-factor model", "Merton credit model"],
    2, "Hull-White corresponds to HJM with exponentially decaying volatility: σ(t,T) = σ × e^(−a(T−t)). Every no-arbitrage IR model can be expressed in HJM form.", "MEDIUM", ["hjm", "hull-white"]),
]

// ── CHAPTER 7: LMM Introduction ───────────────────────────────────────────────
export const rebCh07 = [
  mcq("Under which measure is each forward LIBOR rate Lₖ a martingale in the LMM?",
    ["The risk-neutral measure", "The (k+1)-forward measure (numeraire P(t,Tₖ₊₁))",
      "The T₀-forward measure", "The spot LIBOR measure"],
    1, "Each forward LIBOR Lₖ is a martingale under its own forward measure — the (k+1)-forward measure with P(t,Tₖ₊₁) as numeraire. Under this measure, dLₖ = σₖ Lₖ dz^(k+1).", "MEDIUM", ["lmm", "forward-measure"]),

  tf("The LIBOR Market Model is consistent with Black's formula for caplets by construction.",
    true, "This is the key feature of LMM. Each LIBOR rate follows log-normal dynamics under its forward measure, giving exactly Black's caplet pricing formula. Cap pricing = sum of Black's formula applied to each caplet.", "EASY", ["lmm", "black-formula"]),

  mcq("In the LMM, what is the primary advantage over short-rate models for practitioners?",
    ["Fewer numerical methods required", "Direct calibration to observable market rates and cap prices",
      "Simpler correlation structure", "Analytical formulas for all exotic products"],
    1, "LMM rates are directly observable (3M LIBOR, SOFR forward rates). Calibration to cap prices is direct since caplets are priced by Black's formula exactly. Practitioners calibrate σₖ(t) to market cap vols directly.", "MEDIUM", ["lmm", "calibration"]),

  mcq("Swaptions CANNOT be priced by Black's formula exactly within the standard LMM because:",
    ["The LMM does not model interest rates",
      "The swap rate is not a martingale under any of the individual LIBOR forward measures",
      "Swaptions always require numerical methods regardless of the model",
      "The LMM models fixed-rate bonds, not floating rates"],
    1, "Each LIBOR rate is a martingale under its own forward measure, but the swap rate (a ratio of a sum of forwards) is not a martingale under any of those measures. Exact swaption pricing in LMM requires Monte Carlo or an approximation.", "HARD", ["lmm", "swaption", "measure"]),
]

// ── CHAPTER 8: LMM Dynamics ───────────────────────────────────────────────────
export const rebCh08 = [
  mcq("Under the spot (rolling) measure in the LMM, the drift of Lₖ(t) includes a term involving:",
    ["Only the volatility σₖ", "Correlations ρₖⱼ and volatilities of other LIBOR rates",
      "The risk-free rate r", "Only the initial yield curve"],
    1, "Under the spot measure, dLₖ = [drift from other rates]dt + σₖLₖ dz. The drift depends on correlations ρₖⱼ and volatilities σⱼ of all rates Lⱼ that reset before Lₖ. This is the HJM drift condition expressed in LIBOR terms.", "HARD", ["lmm", "drift", "spot-measure"]),

  tf("Rebonato's humped volatility parameterization [a+b(T−t)]exp[−c(T−t)]+d produces a non-monotonic vol structure.",
    true, "This parameterization produces a 'hump'—vol rises initially then decays exponentially. This matches observed cap volatility structures where 1–2 year caplets have higher vol than very short or very long dated caplets.", "MEDIUM", ["lmm", "vol-parameterization"]),

  mcq("Rebonato's parametric correlation ρᵢⱼ = exp[−β|Tᵢ−Tⱼ|] implies:",
    ["All rates are perfectly correlated regardless of tenor",
      "Rates farther apart in tenor have lower correlation, governed by decay parameter β",
      "Rates are uncorrelated unless adjacent",
      "The correlation equals the ratio of their tenors"],
    1, "With ρᵢⱼ = e^(−β|Tᵢ−Tⱼ|): adjacent rates (small |Tᵢ−Tⱼ|) have high correlation; distant rates (large |Tᵢ−Tⱼ|) have low correlation. β controls the decay speed.", "MEDIUM", ["lmm", "correlation"]),

  mcq("The rank-reduction approach in LMM refers to:",
    ["Reducing the number of time steps in Monte Carlo",
      "Approximating the full correlation matrix with a lower-rank (fewer factor) matrix via PCA",
      "Eliminating illiquid instruments from calibration",
      "Using fewer rates to speed up computation"],
    1, "The full n×n correlation matrix requires O(n²) parameters. Rank-r reduction (r factors via PCA) reduces this to O(nr) parameters while capturing r-factor yield curve dynamics (parallel, twist, butterfly).", "HARD", ["lmm", "pca", "rank-reduction"]),
]

// ── CHAPTER 9: Swaption Calibration ──────────────────────────────────────────
export const rebCh09 = [
  mcq("In Rebonato's approximate swaption formula, the swaption implied vol is related to LIBOR vols via:",
    ["A simple sum of LIBOR vols", "A weighted sum involving LIBOR vols and pairwise correlations",
      "The product of all LIBOR vols", "Only the shortest LIBOR rate's vol"],
    1, "σ²_swap ≈ Σᵢ Σⱼ wᵢwⱼ ρᵢⱼ σᵢ σⱼ. Weights wᵢ reflect each rate's contribution to the swap rate. This allows fast approximate swaption pricing from LMM parameters.", "HARD", ["swaption", "approximation"]),

  tf("The swaption matrix provides information about both the term structure of volatility and the correlation structure between rates.",
    true, "Off-diagonal entries of the swaption matrix (different expiries and tenors) are sensitive to both cap vols and correlations. Calibrating the full matrix pins down both.", "HARD", ["swaption-matrix"]),

  mcq("Under Black's model, the payer swaption value equals:",
    ["A(0) × [S(0)N(d₁) − KN(d₂)] where A is the annuity",
      "P(0,T) × [S(0)N(d₁) − KN(d₂)]",
      "[S(0) − K] × A(0)",
      "A(0) × N(d₂) × [S(0) − K]"],
    0, "Payer swaption = A(0) × [S(0)N(d₁) − KN(d₂)]. The annuity A(0) acts as the numeraire; it scales the option value to the actual dollar amount.", "MEDIUM", ["swaption", "black-formula"]),

  mcq("The cap-swaption calibration procedure typically:",
    ["Calibrates to swaptions first, then caps",
      "Calibrates vol functions σₖ(t) to caps, then calibrates correlation to swaptions",
      "Calibrates both simultaneously in a joint optimization",
      "Fits only the swaption matrix"],
    1, "Standard procedure: (1) calibrate time-dependent vols σₖ(t) to the cap vol surface—this uniquely determines vol functions. (2) Calibrate correlation parameter(s) to the swaption matrix.", "HARD", ["calibration", "caps-swaptions"]),
]

// ── CHAPTER 10: Smile Modelling ───────────────────────────────────────────────
export const rebCh10 = [
  mcq("The SABR model is parameterized by four quantities: α, β, ρ, σ₀. The parameter ρ controls:",
    ["The overall level of implied volatility", "The skew (asymmetry) of the implied vol smile",
      "The convexity (smile curvature)", "The initial forward rate"],
    1, "ρ is the correlation between the forward rate and stochastic vol processes. ρ < 0 (typical for interest rates) produces a negative skew (lower strike → higher vol), matching market observations.", "HARD", ["sabr", "skew"]),

  tf("The SABR model with β=1 reduces to the standard lognormal (Black) model when α=0.",
    true, "At β=1, dF = σF dW (lognormal). If additionally α=0 (vol of vol = 0), σ is constant, giving exactly lognormal dynamics consistent with Black's model.", "MEDIUM", ["sabr", "lognormal"]),

  mcq("A negative volatility smile skew (higher IV for lower strikes) for interest rate options is consistent with:",
    ["Rates having a heavy right tail (higher rates more likely)",
      "A risk-neutral distribution skewed to the left (lower rates more likely than normal)",
      "A symmetric, heavy-tailed distribution",
      "The LIBOR Market Model with lognormal dynamics"],
    1, "Negative skew: OTM floors (low strike) are more expensive than OTM caps (high strike). This implies the risk-neutral distribution is skewed left—large rate declines are priced in more than large increases.", "HARD", ["smile", "skew"]),

  mcq("Post-2008, why did the market shift from log-normal to normal or displaced log-normal models for interest rates?",
    ["Log-normal models were too computationally expensive",
      "Interest rates went near zero and became negative; log-normal models prohibit negative rates",
      "Regulators required normal models for risk calculations",
      "Normal models produce better swaption fits"],
    1, "With EURIBOR, CHF LIBOR, and JPY LIBOR going negative (and USD SOFR briefly negative), log-normal models became inapplicable. Normal/Bachelier models or shifted log-normal models allow for negative rates.", "MEDIUM", ["negative-rates", "normal-model"]),
]

// ── CHAPTER 11: IR Exotics ────────────────────────────────────────────────────
export const rebCh11 = [
  mcq("Cap-floor parity states that:",
    ["Cap = Floor + Forward swap", "Cap − Floor = Swap (floating − fixed)",
      "Cap + Floor = Zero-coupon bond", "Cap = Put on LIBOR"],
    1, "Cap − Floor = Swap. Long a cap (max(L−K,0)) and short a floor (max(K−L,0)) = L−K = the payoff of a floating-vs-fixed swap. This is analogous to put-call parity.", "MEDIUM", ["cap-floor-parity"]),

  tf("Bermudan swaptions are particularly sensitive to the correlation structure of the LMM.",
    true, "Bermudan exercise decisions depend on the joint distribution of multiple swap rates at each exercise date. These rates are driven by multiple LIBOR rates with specific correlations—the exercise boundary shifts significantly with correlation assumptions.", "HARD", ["bermudan", "correlation"]),

  mcq("A Constant Maturity Swap (CMS) rate differs from a standard floating rate in that it pays:",
    ["A compounded overnight rate", "A fixed-tenor swap rate (e.g., 10-year rate) reset periodically",
      "LIBOR of a specific tenor", "A rate linked to inflation"],
    1, "In a CMS, one party pays the 10-year (or other fixed-tenor) swap rate periodically (e.g., every 6 months). The CMS rate is correlated across many maturities—pricing requires a full yield curve model.", "MEDIUM", ["cms"]),

  mcq("A convexity adjustment is needed for CMS products because:",
    ["CMS rates are more volatile than LIBOR",
      "The swap rate is not a martingale under the payment date's forward measure",
      "CMS products have higher credit risk",
      "CMS rates are quoted in different day count conventions"],
    1, "To price a CMS payment at date T, the swap rate (martingale under the annuity measure) must be evaluated under the T-forward measure. The change of measure introduces a convexity adjustment.", "HARD", ["cms", "convexity-adjustment"]),
]

// ── CHAPTER 12: Advanced LMM ──────────────────────────────────────────────────
export const rebCh12 = [
  mcq("In the displaced-diffusion LMM dL = σ(L + δ)dz, the displacement δ allows:",
    ["Faster computation", "Rates as negative as −δ while keeping approximate lognormal dynamics",
      "Better correlation calibration", "Elimination of mean reversion"],
    1, "Displaced diffusion: L+δ follows log-normal dynamics. The rate L can go as negative as −δ. This is the simplest extension to handle near-zero rates while keeping the tractable log-normal framework.", "MEDIUM", ["displaced-diffusion"]),

  tf("In a stochastic volatility LMM, the volatility factor ζ(t) is the same for all LIBOR rates.",
    true, "In the most common SV-LMM specification, a single stochastic vol factor ζ(t) scales all LIBOR rate volatilities: σₖ_effective = σₖ × ζ. This maintains tractability while adding vol-of-vol.", "HARD", ["sv-lmm"]),

  mcq("Terminal correlation differs from instantaneous correlation in the LMM because:",
    ["They measure the same thing but at different times",
      "Terminal correlation measures the dependence between two LIBOR rates at their respective setting dates, accumulated over the path",
      "Instantaneous correlation changes with the rate level",
      "Terminal correlation can be negative while instantaneous cannot"],
    1, "Instantaneous correlation ρᵢⱼ is the 'local' correlation between rate innovations. Terminal correlation measures the correlation between two rates measured at their terminal dates—it is weaker due to the compounding of imperfect correlations over many steps.", "HARD", ["correlation", "lmm"]),
]

// ── CHAPTER 13: Model Risk ────────────────────────────────────────────────────
export const rebCh13 = [
  mcq("Model risk in interest rate derivatives primarily arises from:",
    ["Using the wrong discount rate", "Unobservable parameters (correlations, vol dynamics) that affect exotic prices but not vanilla calibration instruments",
      "Incorrect implementation of Black's formula", "Using the wrong day count convention"],
    1, "The most dangerous model risk: correlation matrices and volatility dynamics cannot be directly observed. Two models calibrated identically to vanilla instruments (caps, swaptions) can give very different prices for exotics.", "HARD", ["model-risk"]),

  tf("Two models that are perfectly calibrated to the same set of vanilla options will always give identical prices for exotic derivatives.",
    false, "This is the fundamental lesson of model risk. Models calibrated to the same vanilla instruments can have different dynamics (correlation structures, vol processes) that produce different exotic prices.", "MEDIUM", ["model-risk"]),

  mcq("Rebonato recommends stress-testing hedge ratios across multiple model specifications to:",
    ["Maximize profits", "Assess the robustness of hedges to model uncertainty",
      "Calibrate correlation parameters", "Satisfy regulatory requirements"],
    1, "If hedges are robust (similar across models), confidence is high. If hedge ratios vary significantly across calibrated models, the hedging strategy is model-dependent and carries model risk.", "MEDIUM", ["model-risk", "hedging"]),

  mcq("Calibration instability is reduced by:",
    ["Using more calibration instruments", "Regularization: adding a penalty for deviation from a prior or smooth parameters",
      "Increasing Monte Carlo paths", "Reducing the number of model factors"],
    1, "Regularization (Tikhonov, or penalizing deviation from yesterday's parameters) reduces parameter jumps. A smooth, stable calibration produces more stable hedges, even if it fits the market slightly less precisely.", "HARD", ["calibration", "regularization"]),
]

// ── CHAPTER 14: Practical Calibration ────────────────────────────────────────
export const rebCh14 = [
  mcq("The 'calibration manifold' in a model with more parameters than calibration instruments is:",
    ["A specific set of parameters that minimizes pricing errors",
      "The set of all parameter combinations consistent with the observed market prices",
      "A numerical method for solving the calibration problem",
      "The region where the model is well-posed"],
    1, "If there are more parameters than market constraints, the calibration problem is underdetermined. The solution is a manifold (surface) of parameter combinations—each point prices vanilla instruments equally well but gives different exotic prices.", "HARD", ["calibration-manifold"]),

  tf("Overfit calibration (matching every market price exactly) generally produces better hedge ratios for exotic products.",
    false, "Overfitting produces hedge ratios that jump around with small market moves (calibration instability). A smoother, slightly approximate calibration typically produces more stable hedges.", "HARD", ["calibration", "hedging"]),

  mcq("The LIBOR to SOFR transition created which major challenge for LMM models?",
    ["SOFR is harder to measure than LIBOR",
      "SOFR is compounded in arrears, creating a convexity adjustment vs. forward SOFR; LMM had to be rebuilt from scratch",
      "SOFR forwards cannot be negative",
      "SOFR has higher volatility than LIBOR making it harder to hedge"],
    1, "SOFR compounded in arrears is known only at period-end (unlike LIBOR set-in-advance). This creates a convexity adjustment between forward SOFR and term SOFR, and all LMM implementations calibrated to LIBOR caps needed to be rebuilt.", "HARD", ["sofr", "transition", "lmm"]),

  mcq("Correlation hedging for exotic interest rate derivatives is difficult because:",
    ["Correlations change too quickly to hedge", "There are no liquid market instruments that are pure plays on correlation",
      "Correlations are always equal to 1 for nearby rates",
      "Regulatory rules prohibit correlation hedging"],
    1, "Correlation is an unhedgeable risk factor in practice. The only available hedges (swaptions) have indirect, mixed sensitivity to correlation and volatility. Pure correlation trades (correlation swaps) are illiquid or non-existent in IR markets.", "HARD", ["correlation", "hedging"]),
]

// Build the map
export const rebonatoQuestionsBySlug: Record<string, ReturnType<typeof mcq>[]> = {
  "rch01-framework": rebCh01,
  "rch02-lattice-methods": rebCh02,
  "rch03-short-rate-models": rebCh03,
  "rch04-bdt-bk": rebCh04,
  "rch05-two-factor": rebCh05,
  "rch06-hjm": rebCh06,
  "rch07-lmm-intro": rebCh07,
  "rch08-lmm-dynamics": rebCh08,
  "rch09-swaption-calibration": rebCh09,
  "rch10-smile-models": rebCh10,
  "rch11-ir-exotics": rebCh11,
  "rch12-market-models-advanced": rebCh12,
  "rch13-model-risk": rebCh13,
  "rch14-practical": rebCh14,
}
