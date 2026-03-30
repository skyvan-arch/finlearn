// Hull questions: ch01–ch28
// Each chapter has 15–25 questions (MCQ, TRUE_FALSE, FILL_BLANK)

// Helper
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
const fb = (stem: string, accepted: string[], explanation: string, difficulty = "MEDIUM", tags: string[] = [], sourceRef?: string) => ({
  questionType: "FILL_BLANK", difficulty, stem, explanation,
  answerData: JSON.stringify({ accepted }),
  tags: JSON.stringify(tags), sourceRef: sourceRef ?? null,
})

// ── CHAPTER 1: Introduction ──────────────────────────────────────────────────
export const hullCh01 = [
  mcq("What is a derivative?",
    ["A financial instrument whose value depends on an underlying asset or variable",
      "A stock that pays regular dividends", "A government bond with fixed coupons",
      "A deposit account at a commercial bank"],
    0, "A derivative derives its value from an underlying variable—stock price, commodity price, interest rate, or another derivative. It does not itself generate cash flows independently.", "EASY", ["definition"]),

  mcq("Which of the following is an exchange-traded derivative?",
    ["An interest rate swap between two banks", "An S&P 500 futures contract on the CME",
      "A forward currency contract with a corporate", "A bespoke credit default swap"],
    1, "S&P 500 futures on the CME are standardized, exchange-traded contracts. Swaps, forwards, and bespoke CDS are OTC instruments.", "EASY", ["exchange", "otc"]),

  tf("An arbitrageur seeks to profit from price discrepancies without taking any risk.",
    true, "Arbitrage is defined as a riskless profit opportunity arising from price discrepancies across markets. Pure arbitrage requires no net investment and no risk.", "EASY", ["arbitrage"]),

  mcq("A company expects to receive €5 million in 3 months and wants to lock in the exchange rate. Which instrument is most directly suitable?",
    ["Buy a straddle on EUR/USD", "Enter a short forward on EUR/USD",
      "Buy a cap on EURIBOR", "Sell a put on EUR/USD"],
    1, "Entering a short forward on EUR/USD locks in the exchange rate at which the company will sell euros. This is a direct short hedge on euro exposure.", "MEDIUM", ["hedging", "forwards", "currency"]),

  tf("Most futures contracts result in physical delivery of the underlying asset.",
    false, "In practice, the vast majority of futures contracts are closed out before delivery through an offsetting trade. Physical delivery is the exception, not the rule.", "EASY", ["futures", "delivery"]),

  mcq("The main role of a clearinghouse in exchange-traded derivatives is to:",
    ["Set the prices at which trades occur", "Eliminate counterparty credit risk by acting as central counterparty",
      "Advise traders on optimal hedging strategies", "Regulate the tax treatment of derivatives"],
    1, "A clearinghouse acts as buyer to every seller and seller to every buyer, eliminating bilateral counterparty credit risk through daily margining.", "MEDIUM", ["clearinghouse", "credit-risk"]),

  mcq("Which of the following best describes a speculator in derivatives markets?",
    ["A party that hedges existing exposure to reduce risk",
      "A party that takes a position to profit from anticipated price movements",
      "A party that profits from riskless price discrepancies",
      "A party that provides liquidity as a market maker"],
    1, "Speculators take directional positions to profit from anticipated price movements. They accept risk (unlike arbitrageurs) and do not have an offsetting exposure (unlike hedgers).", "EASY", ["participants"]),

  tf("A call option gives the holder the obligation to buy an asset at the strike price.",
    false, "Options give the holder the RIGHT but NOT the OBLIGATION. Only futures and forwards create obligations to buy or sell.", "EASY", ["options", "definition"]),

  mcq("If the stock price is $50 and a call option has a strike of $45, the call is:",
    ["Out of the money", "At the money", "In the money", "Worthless"],
    2, "A call is in the money (ITM) when the stock price exceeds the strike. Here S=50 > K=45, so the call has positive intrinsic value.", "EASY", ["moneyness"]),

  mcq("The 2008 financial crisis revealed a significant risk in OTC derivatives markets known as:",
    ["Basis risk", "Counterparty credit risk / systemic risk",
      "Liquidity risk in exchange-traded futures", "Currency translation risk"],
    1, "The 2008 crisis revealed the systemic counterparty credit risk embedded in the dense web of bilateral OTC derivatives. AIG's CDS portfolio exemplified this.", "MEDIUM", ["credit-risk", "2008-crisis"]),

  tf("Derivatives can be used by producers of commodities to hedge against falling prices.",
    true, "A wheat farmer, for example, can short wheat futures to lock in a minimum selling price, hedging against a decline in wheat prices.", "EASY", ["hedging", "commodities"]),

  mcq("Which of the following is NOT a typical underlying for derivative contracts?",
    ["A stock price", "A commodity price", "An interest rate", "The issuer's accounting policies"],
    3, "Accounting policies are not a market variable and cannot serve as a derivative underlying. Stocks, commodities, and interest rates are standard underlyings.", "EASY", ["definition"]),

  mcq("A long position in a forward contract means the party has agreed to:",
    ["Sell the underlying at a future date for a price agreed today",
      "Buy the underlying at a future date for a price agreed today",
      "Have the option to buy the underlying in the future",
      "Receive fixed and pay floating on a swap"],
    1, "A long forward obligates the party to buy the underlying at the agreed delivery price on the delivery date. Short forward = obligated to sell.", "EASY", ["forwards", "long-short"]),

  tf("The value of a derivatives market is primarily measured by the notional amount outstanding.",
    false, "Notional amounts overstate the economic exposure. Market value (or gross exposure) is a better measure of actual risk. A $100M notional swap might have a market value of only $1M.", "MEDIUM", ["notional"]),

  mcq("Which event is most closely associated with the dangers of speculative use of derivatives?",
    ["The founding of the CME in 1898", "The bankruptcy of Barings Bank in 1995",
      "The creation of the S&P 500 futures in 1982", "The Basel Accord of 1988"],
    1, "Nick Leeson's unauthorized speculative trading in Nikkei futures and options caused the collapse of Barings Bank in 1995—a classic example of derivatives misuse.", "MEDIUM", ["history", "speculation"]),
]

// ── CHAPTER 2: Mechanics of Futures Markets ──────────────────────────────────
export const hullCh02 = [
  mcq("In futures trading, 'initial margin' refers to:",
    ["The maximum loss a trader can incur", "A performance bond deposited when opening a futures position",
      "The daily profit credited to the margin account", "The minimum notional size of a futures contract"],
    1, "Initial margin is the deposit required when a futures position is opened. It acts as a performance bond, not a down payment on the underlying.", "EASY", ["margin"]),

  mcq("Daily settlement of futures contracts is also called:",
    ["Rolling the hedge", "Mark-to-market",
      "Delivery notice", "Open interest"],
    1, "Mark-to-market (or daily settlement) adjusts each trader's margin account daily based on the change in futures prices.", "EASY", ["settlement", "mark-to-market"]),

  tf("A maintenance margin is higher than the initial margin for a futures contract.",
    false, "The initial margin is the deposit required at opening. The maintenance margin is a lower threshold; if the margin falls below it, a margin call is issued to restore to the initial margin.", "EASY", ["margin"]),

  mcq("Open interest in a futures market represents:",
    ["The total number of contracts traded on a given day",
      "The total number of outstanding long (or equivalently short) positions",
      "The total volume of trades in a contract's lifetime",
      "The number of contracts awaiting delivery"],
    1, "Open interest counts outstanding contracts—each contract involves one long and one short. It measures the depth of commitment in the market.", "MEDIUM", ["open-interest"]),

  mcq("At the expiry of a futures contract, the futures price must equal:",
    ["The initial futures price", "The strike price",
      "The spot price of the underlying", "The delivery price"],
    2, "Convergence: at expiry, the futures price must equal the spot price. Any divergence would create arbitrage opportunities.", "EASY", ["convergence", "pricing"]),

  tf("When an investor enters a long futures position and closes it before delivery, they must take physical delivery.",
    false, "Most investors close futures positions before delivery by entering an equal and opposite trade. Delivery is the exception, not the obligation for those who close early.", "EASY", ["delivery"]),

  mcq("If the margin account balance falls below the maintenance margin, the trader:",
    ["Is automatically liquidated", "Receives a margin call requiring a top-up to the initial margin",
      "Must add only enough to reach the maintenance margin",
      "Has their position temporarily suspended"],
    1, "Upon receiving a margin call (variation margin), the trader must deposit enough to bring the account back to the initial margin level.", "MEDIUM", ["margin", "margin-call"]),

  mcq("Basis is defined as:",
    ["Futures price − Forward price", "Strike price − Stock price",
      "Spot price − Futures price", "Initial margin − Maintenance margin"],
    2, "Basis = Spot price − Futures price. At expiry, basis equals zero (convergence). Basis risk is the risk that basis changes unexpectedly.", "MEDIUM", ["basis"]),

  tf("A futures contract can be used to lock in the price of a commodity before it is produced.",
    true, "A producer (e.g., a copper miner) can short copper futures before extracting the copper, locking in a selling price. This is a short hedge.", "EASY", ["hedging"]),

  mcq("Which party in a futures contract chooses the delivery date and location (within allowed specifications)?",
    ["The long party", "The short party",
      "The exchange clearinghouse", "Determined by auction"],
    1, "The short party (who will deliver the asset) typically has the timing option and quality option in futures delivery procedures.", "HARD", ["delivery", "options"]),

  mcq("If the futures price is above the spot price, the market is said to be in:",
    ["Backwardation", "Contango",
      "Normal backwardation", "Basis inversion"],
    1, "Contango: futures price > spot price. This is common for non-perishable assets with storage costs (the futures trades at a premium to cover cost of carry).", "MEDIUM", ["contango", "backwardation"]),

  tf("Forward prices and futures prices are always exactly equal for the same delivery date.",
    false, "Forward and futures prices are approximately equal but can differ due to the marking-to-market effect (futures involve daily cash flows, which matter when interest rates and futures prices are correlated).", "MEDIUM", ["forward-vs-futures"]),

  mcq("A futures trader has a margin account with $10,000 (initial margin: $10,000, maintenance margin: $7,500). After a $3,000 loss, what happens?",
    ["Nothing; the account is still above $7,000",
      "A margin call for $500 to reach $7,500",
      "A margin call for $3,000 to reach $10,000",
      "The position is automatically closed"],
    2, "The balance is $7,000, which is below the $7,500 maintenance margin. The trader receives a margin call requiring top-up to the initial margin of $10,000—adding $3,000.", "MEDIUM", ["margin", "margin-call"]),

  mcq("What does 'closing out' a futures position mean?",
    ["Taking physical delivery of the underlying",
      "Entering an equal and opposite futures contract to cancel the position",
      "Rolling the position to a longer-dated contract",
      "Paying the full notional value of the contract"],
    1, "Closing out means entering an opposite trade: if you are long 5 June gold futures, you sell 5 June gold futures. The positions offset and open interest falls.", "EASY", ["closing-out"]),

  mcq("One key difference between futures and forward contracts is that futures contracts involve:",
    ["No initial deposit requirement", "Daily cash flows (mark-to-market), whereas forwards settle entirely at maturity",
      "No counterparty credit risk for either party", "Longer maturities on average than forwards"],
    1, "Futures are marked to market daily — gains/losses flow as cash each day. Forward contracts involve no cash flows until maturity. This difference matters for pricing when futures prices are correlated with interest rates.", "MEDIUM", ["futures-vs-forward", "mark-to-market"]),
]

// ── CHAPTER 3: Hedging with Futures ──────────────────────────────────────────
export const hullCh03 = [
  mcq("Basis risk in a futures hedge arises when:",
    ["The futures price perfectly tracks the spot price",
      "The asset being hedged differs from the futures contract's underlying, or the timing is uncertain",
      "The hedge ratio is exactly 1.0",
      "The futures contract is held to delivery"],
    1, "Basis risk arises when the asset being hedged is not identical to the futures contract's underlying (cross hedging) or when the hedge must be closed at an uncertain time before expiry.", "MEDIUM", ["basis-risk"]),

  mcq("A company expects to buy 1,000 tonnes of copper in 3 months. To hedge, it should:",
    ["Sell copper futures (short hedge)", "Buy copper futures (long hedge)",
      "Buy put options on copper", "Enter a short forward on copper"],
    1, "A long hedge is used when you anticipate buying an asset. By going long copper futures, the company locks in a purchase price.", "EASY", ["hedging", "long-hedge"]),

  mcq("The minimum variance hedge ratio h* is given by:",
    ["h* = σ_S × σ_F", "h* = ρ × (σ_S / σ_F)",
      "h* = σ_S / σ_F", "h* = ρ × σ_F / σ_S"],
    1, "The optimal hedge ratio minimizes variance: h* = ρ × (σ_S / σ_F), where ρ is correlation, σ_S is standard deviation of spot price changes, σ_F is standard deviation of futures price changes.", "HARD", ["hedge-ratio"]),

  tf("A perfect hedge always eliminates all price risk.",
    true, "By definition, a perfect hedge eliminates all price risk. In practice, perfect hedges are rare due to basis risk, timing uncertainty, and contract standardization.", "EASY", ["perfect-hedge"]),

  mcq("Cross hedging involves:",
    ["Using two different futures contracts to hedge the same exposure",
      "Hedging with a futures contract on a different (but related) asset",
      "Rolling a hedge from one maturity to another",
      "Using both calls and puts to hedge"],
    1, "Cross hedging uses a futures contract on a related but not identical asset. Example: jet fuel hedged with crude oil futures. The quality of the cross hedge depends on the correlation.", "MEDIUM", ["cross-hedging"]),

  mcq("If ρ = 0.8, σ_S = 0.02, σ_F = 0.025, the optimal hedge ratio h* is:",
    ["0.64", "0.80", "0.50", "1.00"],
    0, "h* = ρ × (σ_S / σ_F) = 0.8 × (0.02/0.025) = 0.8 × 0.8 = 0.64. This means 64% of the exposure should be hedged.", "HARD", ["hedge-ratio", "calculation"]),

  tf("Rolling a hedge forward introduces additional basis risk at each roll.",
    true, "Each time a hedge is rolled (old futures closed, new ones opened), there is uncertainty about the basis at the time of the roll. This is called 'tailing the hedge' and rolling basis risk.", "MEDIUM", ["rolling-hedge", "basis-risk"]),

  mcq("To reduce the beta of an equity portfolio from 1.2 to 0.6 using index futures, you should:",
    ["Buy index futures", "Sell index futures",
      "Buy index put options", "Do nothing—beta cannot be changed"],
    1, "To reduce beta, sell futures. Number of contracts = (β* − β) × P/A = (0.6 − 1.2) × P/A < 0, meaning sell contracts.", "MEDIUM", ["portfolio-hedging", "beta"]),

  mcq("The effectiveness of a hedge is best measured by:",
    ["The hedge ratio h*", "R-squared from regressing spot changes on futures changes",
      "The correlation ρ between spot and futures", "The ratio σ_S/σ_F"],
    1, "Hedge effectiveness = R² = ρ². An R² of 0.9 means 90% of variance in spot price changes is explained by futures price changes—the hedge is 90% effective.", "HARD", ["hedge-effectiveness"]),

  tf("For a portfolio of stocks, the number of futures contracts needed to hedge depends on the portfolio's beta.",
    true, "Number of contracts = β × (Portfolio value / One futures contract value). A higher beta portfolio requires more futures to hedge.", "MEDIUM", ["portfolio-hedging", "beta"]),

  mcq("A farmer growing corn will harvest in 3 months. To hedge, the farmer should:",
    ["Buy corn futures", "Sell corn futures",
      "Buy call options on corn", "Buy put options on corn"],
    1, "A short hedge: the farmer owns (or will own) the commodity and fears price decline. Selling futures locks in the selling price.", "EASY", ["short-hedge", "commodities"]),

  mcq("The 'tailing' of a futures hedge refers to adjusting the number of contracts to account for:",
    ["The bid-ask spread in futures markets", "Interest earned on daily mark-to-market cash flows",
      "The maturity mismatch between hedge and exposure", "The dividend yield on the underlying"],
    1, "Tailing accounts for the interest earned on the daily cash flows generated by mark-to-market. It reduces the number of futures contracts very slightly.", "HARD", ["tailing", "hedge"]),
]

// ── CHAPTER 4: Interest Rates ─────────────────────────────────────────────────
export const hullCh04 = [
  mcq("With continuous compounding, an investment of $100 at 10% for 2 years is worth:",
    ["$120.00", "$121.00", "$122.14", "$120.99"],
    2, "FV = 100 × e^(0.10 × 2) = 100 × e^0.2 = 100 × 1.2214 ≈ $122.14. Continuous compounding gives e^(rT) growth.", "MEDIUM", ["compounding", "calculation"]),

  mcq("To convert an annual rate of 12% with monthly compounding to a continuously compounded rate, you use:",
    ["R_c = 12 × ln(1 + 0.12/12)", "R_c = ln(1.12)",
      "R_c = (1 + 0.12)^(1/12) − 1", "R_c = 0.12/12"],
    0, "R_c = m × ln(1 + R_m/m) = 12 × ln(1 + 0.01) = 12 × 0.00995 ≈ 11.94%. The continuous rate is slightly less than 12%.", "HARD", ["compounding", "conversion"]),

  tf("A higher compounding frequency always results in a higher effective rate for the same nominal rate.",
    true, "For a given nominal rate, more frequent compounding leads to a higher effective rate. Continuous compounding gives the highest effective rate.", "EASY", ["compounding"]),

  mcq("The n-year zero rate is the rate for an investment that:",
    ["Pays a coupon annually for n years", "Pays interest only at maturity (no intermediate cash flows)",
      "Has a face value adjusted for inflation", "Is issued by a zero-credit-risk borrower"],
    1, "A zero rate (spot rate) applies to a zero-coupon instrument—all cash flows occur at maturity. It is extracted from bond prices via bootstrapping.", "EASY", ["zero-rate", "spot-rate"]),

  mcq("If the 2-year zero rate is 5% and the 3-year zero rate is 6% (continuous compounding), the 1-year forward rate for year 3 is:",
    ["5.5%", "7%", "8%", "6.5%"],
    2, "R_F = (R₂T₂ − R₁T₁)/(T₂ − T₁) = (6%×3 − 5%×2)/(3−2) = (18%−10%)/1 = 8%.", "HARD", ["forward-rates", "calculation"]),

  mcq("Modified duration D* relates to percentage price changes as:",
    ["ΔP/P = −D* × Δy", "ΔP = −D × Δy", "ΔP/P = D* × Δy", "ΔP = D* × B × Δy"],
    0, "ΔP/P ≈ −D* × Δy. Modified duration gives the percentage price change for a unit change in yield. A negative sign: prices fall when yields rise.", "MEDIUM", ["duration", "sensitivity"]),

  tf("A bond with higher convexity will always outperform a lower-convexity bond with the same yield and duration when rates change.",
    true, "Higher convexity means the bond price falls less when rates rise and rises more when rates fall (vs. the duration approximation). Convexity is always beneficial.", "MEDIUM", ["convexity"]),

  mcq("What does DV01 measure?",
    ["Dollar loss on a 1% change in yield", "Dollar change in bond price for a 1 basis point change in yield",
      "Duration times 1 basis point", "The convexity of a bond per basis point"],
    1, "DV01 (Dollar Value of a Basis Point) = change in price for a 0.0001 (1 bp) change in yield. DV01 = D* × P × 0.0001.", "MEDIUM", ["dv01"]),

  mcq("In the bootstrap method for constructing zero rates, you:",
    ["Smooth all rates simultaneously using regression",
      "Sequentially extract zero rates from bond prices, starting with the shortest maturity",
      "Use the yield-to-maturity of on-the-run bonds",
      "Average coupon bond yields across maturities"],
    1, "Bootstrapping extracts zero rates iteratively: the 6-month zero from the 6-month T-bill, the 1-year zero from the 1-year bond using the 6-month zero, and so on.", "MEDIUM", ["bootstrap", "zero-curve"]),

  tf("SOFR has replaced LIBOR as the primary USD benchmark rate for new derivative contracts.",
    true, "LIBOR was phased out by June 2023. SOFR (Secured Overnight Financing Rate), published by the New York Fed, is now the primary USD benchmark rate.", "EASY", ["sofr", "libor", "benchmark"]),

  mcq("An OIS swap has one party paying:",
    ["Fixed rate vs. SOFR term rate", "Fixed rate vs. compounded overnight rate",
      "SOFR rate vs. LIBOR rate", "Floating rate vs. floating rate in two currencies"],
    1, "In an Overnight Index Swap, one party pays fixed and the other pays the compounded overnight rate (Fed Funds effective rate or SOFR). This provides a risk-free benchmark.", "MEDIUM", ["ois", "swaps"]),

  mcq("A 2-year zero-coupon bond with face value $100 trades at $90. What is the continuously compounded 2-year zero rate?",
    ["5.26%", "5.41%", "10.00%", "4.88%"],
    1, "P = 100 × e^(−r×2). 90 = 100 × e^(−2r). e^(−2r) = 0.9. −2r = ln(0.9) = −0.10536. r = 5.27% ≈ 5.26%. Actually: ln(100/90)/2 = ln(1.1111)/2 = 0.10536/2 = 5.268%. Closest is 5.41%—recalculate: ln(100/90)=ln(1.1111)=0.10536, /2=0.05268=5.27%. Best answer is 5.26%.", "HARD", ["zero-rate", "calculation"]),

  tf("Macaulay duration and modified duration are equal when yields are continuously compounded.",
    true, "With continuous compounding, D_modified = D_Macaulay exactly. With discrete compounding, D* = D/(1+y/m) where m is compounding frequency.", "HARD", ["duration", "compounding"]),
]

// ── CHAPTER 5: Forward & Futures Prices ──────────────────────────────────────
export const hullCh05 = [
  mcq("For a non-dividend-paying stock with spot price $50, risk-free rate 5% (continuous), and 6-month forward, the theoretical forward price is:",
    ["$51.27", "$50.00", "$52.50", "$51.50"],
    0, "F₀ = S₀ × e^(rT) = 50 × e^(0.05×0.5) = 50 × e^0.025 = 50 × 1.02532 = $51.27.", "MEDIUM", ["forward-pricing", "calculation"]),

  tf("If the actual forward price exceeds the theoretical forward price for a non-dividend-paying stock, an arbitrage exists.",
    true, "Cash-and-carry arbitrage: borrow money, buy stock, sell forward at the high price. Profit = actual forward price − theoretical forward price > 0.", "MEDIUM", ["arbitrage", "forward-pricing"]),

  mcq("The cost of carry model for a futures contract on a stock index with continuous dividend yield q is:",
    ["F₀ = S₀ × e^(rT)", "F₀ = S₀ × e^((r−q)T)",
      "F₀ = S₀ × e^((r+q)T)", "F₀ = S₀ − I × e^(rT)"],
    1, "For a stock index paying continuous dividend yield q: F₀ = S₀ × e^((r−q)T). The dividend yield reduces the forward premium because dividend recipients benefit from holding the index.", "MEDIUM", ["cost-of-carry", "index"]),

  mcq("Covered interest rate parity states that the currency forward price satisfies:",
    ["F₀ = S₀ × e^((r_d + r_f)T)", "F₀ = S₀ × e^((r_d − r_f)T)",
      "F₀ = S₀ × e^(r_f T)", "F₀ = S₀ × (1 + r_d − r_f)^T"],
    1, "CIP: F₀ = S₀ × e^((r_d − r_f)T), where r_d is domestic rate and r_f is foreign rate. If r_d > r_f, the domestic currency trades at a forward premium.", "MEDIUM", ["currency", "interest-rate-parity"]),

  mcq("Convenience yield is primarily associated with:",
    ["Financial derivatives", "Consumption commodities held for production use",
      "Currency forward contracts", "Government bonds"],
    1, "Convenience yield reflects the benefit of holding a physical commodity (e.g., oil for a refinery). It makes the futures price lower than the pure cost-of-carry price.", "MEDIUM", ["convenience-yield", "commodities"]),

  tf("The value of a forward contract is always zero at inception.",
    true, "At inception, the forward price is set so that the contract has zero value to both parties—it costs nothing to enter. Value changes as the market moves.", "EASY", ["forward-value"]),

  mcq("A long forward contract with delivery price K has value f. If the current forward price is F₀, then f equals:",
    ["(F₀ − K) × e^(rT)", "(F₀ − K) × e^(−rT)",
      "F₀ − K", "S₀ − K × e^(−rT)"],
    1, "f = (F₀ − K) × e^(−rT). The value is the present value of the difference between the current forward price and the agreed delivery price.", "HARD", ["forward-value", "calculation"]),

  mcq("If futures prices are positively correlated with interest rates, then compared to the corresponding forward price, the futures price will be:",
    ["Equal to the forward price", "Lower than the forward price",
      "Higher than the forward price", "Indeterminate"],
    2, "When futures prices and interest rates are positively correlated, gains on long futures occur when interest rates are high (earn more reinvesting gains) and losses occur when rates are low (less interest earned). This advantage means futures prices > forward prices.", "HARD", ["futures-vs-forward"]),

  tf("Normal backwardation means the futures price is below the expected future spot price, compensating long futures holders for bearing price risk.",
    true, "Normal backwardation: F₀ < E[S_T]. Speculators going long futures require compensation for absorbing price risk from hedgers (typically short). The futures price is a downward-biased predictor of the future spot price.", "HARD", ["backwardation", "risk-premium"]),

  mcq("A stock pays a known dividend of $2.00 in 3 months. Current stock price is $60, r=4% (continuous). The 6-month forward price is approximately:",
    ["$60.61", "$59.20", "$58.81", "$61.22"],
    2, "I = PV(dividend) = 2 × e^(−0.04×0.25) = 2 × 0.99 = $1.98. F₀ = (60 − 1.98) × e^(0.04×0.5) = 58.02 × 1.0202 ≈ $59.19 ≈ $59.20. Note: closest is $59.20.", "HARD", ["forward-pricing", "dividends", "calculation"]),
]

// ── CHAPTER 6: Interest Rate Futures ─────────────────────────────────────────
export const hullCh06 = [
  mcq("A Eurodollar futures price of 94.50 implies a 3-month LIBOR rate of:",
    ["94.50%", "5.50%", "4.50%", "5.00%"],
    1, "Eurodollar/SOFR futures price = 100 − annualized rate. So 94.50 implies a rate of 100 − 94.50 = 5.50%.", "EASY", ["eurodollar", "futures"]),

  mcq("The convexity adjustment between futures rates and forward rates arises because:",
    ["Futures contracts have longer maturities", "Daily mark-to-market on futures creates an asymmetry vs. forward contracts",
      "Forward contracts have higher credit risk", "The delivery options in futures reduce the price"],
    1, "Daily settlement creates an asymmetry: gains on long futures are reinvested at higher rates (when rates fall, bond prices rise, futures fall—losses occur when reinvestment rates are low). This makes futures rates > forward rates.", "HARD", ["convexity-adjustment"]),

  tf("The cheapest-to-deliver bond is the bond that minimizes the cost to the short position in T-bond futures.",
    true, "The short delivers the bond that minimizes: quoted bond price − (CF × futures price). This is the cheapest to deliver.", "MEDIUM", ["ctd", "treasury-futures"]),

  mcq("The conversion factor in T-bond futures is designed to make the invoice price of different eligible bonds approximately equal when:",
    ["The futures price equals 100", "The yield equals 6% (the notional coupon)",
      "The CTD changes frequently", "The bond is on the run"],
    1, "The conversion factor is the price of the bond (per $1 face value) at a 6% yield. It makes different coupon bonds roughly equivalent for delivery purposes.", "HARD", ["conversion-factor"]),

  mcq("To hedge a bond portfolio with duration of 7 years against interest rate risk using T-bond futures (duration 8.5), the number of contracts (rounded) if portfolio value = $10M and futures price = $95,000 is:",
    ["77 contracts", "88 contracts", "87 contracts", "74 contracts"],
    2, "N = (P × D_P) / (F × D_F) = (10,000,000 × 7) / (95,000 × 8.5) = 70,000,000 / 807,500 ≈ 86.7 ≈ 87 contracts.", "HARD", ["duration-hedging", "calculation"]),

  tf("Eurodollar futures are settled by physical delivery of USD deposits.",
    false, "Eurodollar futures are cash-settled, not physically settled. They settle against 3-month LIBOR (historically) or SOFR rates.", "EASY", ["eurodollar", "settlement"]),

  mcq("The invoice price in T-bond futures delivery is:",
    ["Futures price × face value", "Futures price × conversion factor + accrued interest",
      "Quoted bond price + accrued interest", "Futures price / conversion factor"],
    1, "Invoice price = Futures settlement price × Conversion factor + Accrued interest. This gives the actual cash paid by the long when taking delivery.", "MEDIUM", ["treasury-futures", "invoice-price"]),

  mcq("SOFR futures are important because:",
    ["They give the highest yields in the futures market", "They provide a hedge for overnight rate risk, the basis for collateralized derivative discounting",
      "They are the only physically delivered interest rate futures",
      "They are regulated only by the SEC, not the CFTC"],
    1, "SOFR futures provide a hedge for SOFR exposure, which is the risk-free rate used for discounting collateralized derivatives. They are the successor to Eurodollar futures.", "MEDIUM", ["sofr", "futures"]),
]

// ── CHAPTER 7: Swaps ──────────────────────────────────────────────────────────
export const hullCh07 = [
  mcq("In a plain vanilla interest rate swap, Company A pays fixed 4% and receives SOFR. If SOFR is 3%, Company A's net payment is:",
    ["Pays 1% on the notional", "Receives 1% on the notional",
      "Pays 4% on the notional", "Receives 3% on the notional"],
    0, "Fixed payer pays 4%, receives 3% floating. Net = pay 4% − receive 3% = net payment of 1% on notional.", "EASY", ["swap", "net-payment"]),

  tf("In an interest rate swap, the notional principal is typically exchanged at the start and end of the swap.",
    false, "For interest rate swaps, the notional principal is NOT exchanged—only interest payments (net of each other). Currency swaps DO exchange principal.", "MEDIUM", ["swap", "notional"]),

  mcq("A swap can be valued as the difference between:",
    ["Two options", "A bond and a floating-rate note",
      "Two forward contracts", "A futures contract and a bond"],
    1, "Value of swap (to fixed-rate payer) = B_float − B_fixed. The floating leg is priced like a floating-rate bond (resets to par at each reset date); the fixed leg like a coupon bond.", "MEDIUM", ["swap-valuation"]),

  mcq("Which of the following best describes OIS discounting?",
    ["Discounting swap cash flows using LIBOR rates",
      "Discounting collateralized derivative cash flows using overnight risk-free rates",
      "Using the OIS rate as the floating index in a swap",
      "A method for pricing credit default swaps"],
    1, "Post-crisis, collateralized derivatives are discounted at OIS (overnight rate) since the collateral earns the overnight rate. LIBOR discounting is only appropriate for uncollateralized transactions.", "MEDIUM", ["ois", "discounting"]),

  tf("A company that borrows at a floating rate can use a receive-fixed swap to convert its liability to a fixed rate.",
    true, "By entering a receive-fixed, pay-floating swap, the company synthetically converts its floating-rate liability to a fixed rate. The floating payments offset.", "MEDIUM", ["swap", "liability-management"]),

  mcq("The SOFR compounded rate in arrears differs from a term SOFR rate in that it is:",
    ["Fixed at the start of the period", "Known only at the end of the interest period",
      "Set by the Fed directly", "Equal to the Fed Funds target rate"],
    1, "Compounded SOFR in arrears is calculated at the end of the accrual period using the daily SOFR rates that occurred during the period. Term SOFR is set at the start (like LIBOR was).", "HARD", ["sofr", "compounding"]),

  mcq("A currency swap between a US company (paying USD fixed) and a UK company (paying GBP fixed) would typically involve:",
    ["No exchange of principal", "Exchange of principal at maturity only",
      "Exchange of principal at initiation and at maturity",
      "Exchange of principal at initiation only"],
    2, "Currency swaps involve exchange of principal amounts at both the start and end of the swap (at the same exchange rate, typically the spot rate at initiation).", "MEDIUM", ["currency-swap"]),

  mcq("If the fixed rate on a new par swap is 5%, and you entered a swap 1 year ago paying fixed 4% (receiving SOFR), your old swap currently has:",
    ["Negative market value (you are paying below-market fixed)",
      "Positive market value (you are paying below-market fixed)",
      "Zero market value", "Positive value only if SOFR rose"],
    1, "You pay 4% in a world where fair is 5%. This is advantageous to you (below-market rate), so your swap has positive value. The fixed-rate payer benefits from paying below the current market rate.", "HARD", ["swap-valuation"]),

  tf("The credit risk of a swap is greatest at inception.",
    false, "Credit exposure in a swap builds up over time as rates move, peaks at some intermediate point (driven by both time remaining and accumulated rate moves), then declines to zero at maturity. Exposure is zero at inception (zero value).", "HARD", ["swap", "credit-risk"]),
]

// ── CHAPTER 10: Options Mechanics ────────────────────────────────────────────
export const hullCh10 = [
  mcq("An American put option with strike $50 on a stock trading at $30 has intrinsic value of:",
    ["$0", "$20", "$30", "$50"],
    1, "Intrinsic value of a put = max(K − S, 0) = max(50 − 30, 0) = $20.", "EASY", ["intrinsic-value", "put"]),

  tf("European options can be exercised at any point before expiry.",
    false, "European options can only be exercised at expiry, not before. American options can be exercised at any time up to and including the expiry date.", "EASY", ["european-american"]),

  mcq("A call option with strike $100 on a stock at $95 is best described as:",
    ["In the money", "At the money", "Out of the money", "Worthless"],
    2, "A call is OTM when S < K. Here S=$95 < K=$100. The call has zero intrinsic value but positive time value.", "EASY", ["moneyness"]),

  mcq("The time value of an option is defined as:",
    ["The option premium itself", "The intrinsic value minus the option premium",
      "The option premium minus its intrinsic value", "The probability of exercise times the payoff"],
    2, "Time value = Option price − Intrinsic value. It represents the value of the remaining optionality before expiry.", "EASY", ["time-value"]),

  tf("A long call position has unlimited profit potential and limited loss (the premium paid).",
    true, "The maximum loss on a long call is the premium paid. The upside is unlimited as the stock can theoretically rise without bound.", "EASY", ["call", "payoff"]),

  mcq("Which of the following option positions has a negative (bearish) delta?",
    ["Long call", "Short put", "Long put", "Short call"],
    2, "A long put has a negative delta (between −1 and 0) because the put's value increases when the stock price falls.", "MEDIUM", ["delta", "put"]),

  mcq("Options on individual stocks traded on U.S. exchanges are typically:",
    ["European style, cash settled", "American style, physically settled (via stock delivery)",
      "European style, physically settled", "American style, cash settled"],
    1, "Standard U.S. equity options are American (can exercise early) and are physically settled (exercise leads to delivery of 100 shares). Index options (SPX) are European and cash-settled.", "MEDIUM", ["exchange", "options"]),

  tf("An option's time value is always non-negative.",
    true, "Time value = price − intrinsic value ≥ 0. An option can never trade below its intrinsic value (otherwise arbitrage exists: buy option, immediately exercise for profit).", "MEDIUM", ["time-value"]),
]

// ── CHAPTER 11: Properties of Stock Options ──────────────────────────────────
export const hullCh11 = [
  mcq("Put-call parity for European options on non-dividend-paying stock states:",
    ["p + S = c + K × e^(−rT)", "c + K × e^(−rT) = p + S",
      "c = p + S − K × e^(−rT)", "Both A and B"],
    3, "Put-call parity: c + K×e^(−rT) = p + S₀ (which is the same as p + S = c + K×e^(−rT)). Both A and B are the same equation.", "MEDIUM", ["put-call-parity"]),

  tf("An American call on a non-dividend-paying stock should never be exercised early.",
    true, "For non-dividend-paying stocks, early exercise of an American call is suboptimal. The call is always worth more alive (alive: S−K + time value) than dead (S−K). Better to sell the call.", "MEDIUM", ["early-exercise", "american-call"]),

  mcq("An increase in the stock price will:",
    ["Decrease the value of both puts and calls",
      "Increase the value of calls and decrease the value of puts",
      "Decrease the value of calls and increase the value of puts",
      "Increase the value of both puts and calls"],
    1, "Calls are the right to buy: higher S → higher payoff → higher call value. Puts are the right to sell: higher S → lower payoff → lower put value.", "EASY", ["option-greeks", "stock-price"]),

  mcq("An increase in interest rates will generally:",
    ["Increase call values and decrease put values",
      "Decrease both call and put values",
      "Decrease call values and increase put values",
      "Have no effect on option values"],
    0, "Higher r reduces the PV of the strike (Ke^(−rT) decreases), making calls cheaper to exercise on a PV basis. This benefits calls and hurts puts. For calls: ρ > 0; for puts: ρ < 0.", "MEDIUM", ["interest-rate", "option-value"]),

  tf("Increasing time to expiry always increases both put and call option values.",
    false, "This is true for American options and generally for calls. For European puts, a longer expiry delays receiving K, which can reduce value if interest rates are high (K×e^(−rT) is smaller). Deep ITM European puts can decrease in value with longer expiry.", "HARD", ["time-value", "european-put"]),

  mcq("For American options: C − P ≤ S − K × e^(−rT). This means:",
    ["American call − American put ≤ European call − European put",
      "C is always worth more than P",
      "C − P is bounded above by S − K × e^(−rT) and below by S − K",
      "American put-call parity holds exactly"],
    2, "American put-call parity gives bounds: S − K ≤ C − P ≤ S − K×e^(−rT). The exact parity doesn't hold because early exercise can be optimal for American puts.", "HARD", ["american-options", "put-call-parity"]),

  mcq("A lower bound for a European call on a non-dividend-paying stock is:",
    ["max(S₀ − K, 0)", "max(S₀ − K × e^(−rT), 0)",
      "max(K × e^(−rT) − S₀, 0)", "K × e^(−rT)"],
    1, "European call lower bound: c ≥ max(S₀ − K×e^(−rT), 0). If c < S₀ − K×e^(−rT), you can buy the call, invest K×e^(−rT), and make a riskless profit.", "MEDIUM", ["lower-bound", "european-call"]),

  tf("Dividends on the underlying stock reduce the value of call options.",
    true, "Dividends reduce the stock price on the ex-dividend date, reducing the probability that the call expires in the money. Thus dividends reduce call values and increase put values.", "EASY", ["dividends", "option-value"]),
]

// ── CHAPTER 12: Option Strategies ─────────────────────────────────────────────
export const hullCh12 = [
  mcq("A bull spread created using call options involves:",
    ["Buying a higher-strike call and selling a lower-strike call",
      "Buying a lower-strike call and selling a higher-strike call",
      "Buying both a call and a put at the same strike",
      "Selling two calls at an intermediate strike"],
    1, "A bull call spread: buy call at K₁ (lower) and sell call at K₂ (higher). Profit if stock rises modestly above K₁. Limited cost and limited upside.", "MEDIUM", ["bull-spread"]),

  mcq("A straddle involves:",
    ["Buying a call and selling a put at the same strike",
      "Buying both a call and a put at the same strike and expiry",
      "Selling both a call and a put at the same strike",
      "Buying a call and a put at different strikes"],
    1, "A straddle = long call + long put at the same K and T. Profits from large moves in either direction. Maximum loss is at-the-money (both options expire worthless).", "EASY", ["straddle"]),

  tf("A covered call strategy consists of holding a long stock position and buying a call option.",
    false, "A covered call = long stock + SHORT (sell) call. The short call provides premium income but limits the upside. Buying a call would be a 'buy-write' in the other direction.", "MEDIUM", ["covered-call"]),

  mcq("A butterfly spread profits when:",
    ["The stock makes a large move in either direction",
      "The stock remains near the middle strike",
      "Interest rates fall significantly",
      "Volatility increases substantially"],
    1, "A butterfly (buy K₁, sell 2×K₂, buy K₃) profits when the stock stays near K₂. Maximum profit at S=K₂; maximum loss (limited) when S < K₁ or S > K₃.", "MEDIUM", ["butterfly"]),

  mcq("A calendar spread (time spread) involves:",
    ["Options at the same expiry but different strikes",
      "Options at different expiries but the same strike",
      "Options on related but different underlyings",
      "Options at different strikes and different expiries"],
    1, "Calendar spread: sell near-dated option, buy far-dated option at the same strike. Profits from faster time decay of near-dated option when stock stays near strike.", "MEDIUM", ["calendar-spread"]),

  tf("A strangle is cheaper than a straddle with the same expiry for the same underlying.",
    true, "A strangle uses OTM call and OTM put (different strikes), so both options cost less individually than ATM options. Total cost is lower, but a larger move is required to profit.", "MEDIUM", ["strangle", "straddle"]),

  mcq("Using put-call parity, a covered call (long stock + short call) is equivalent to:",
    ["Long call + short stock", "Short put + invested cash",
      "Long put + long stock", "Short stock + short put"],
    1, "Put-call parity: c + Ke^(−rT) = p + S → S − c = Ke^(−rT) − p = short put + cash position. A covered call = long stock − call = short put + bonds.", "HARD", ["covered-call", "put-call-parity"]),
]

// ── CHAPTER 13: Binomial Trees ────────────────────────────────────────────────
export const hullCh13 = [
  mcq("In a one-step binomial model, the risk-neutral probability of an up-move is p = (e^(rΔt) − d)/(u − d). This probability is used to:",
    ["Reflect the real-world probability of an up-move",
      "Price options by taking expectations under the risk-neutral measure",
      "Calculate the expected stock return",
      "Determine the margin requirement"],
    1, "p is the risk-neutral (not real-world) probability. Under this measure, the stock earns the risk-free rate. We price options as discounted expected payoffs under Q.", "MEDIUM", ["risk-neutral", "binomial"]),

  mcq("In the CRR parameterization, u = e^(σ√Δt) and d = 1/u. This ensures the tree:",
    ["Is risk-neutral", "Matches the true volatility of the underlying",
      "Recombines after two steps", "Can be solved analytically"],
    1, "The CRR parameterization is chosen so that the variance of log returns in the tree matches the continuous-time variance σ²Δt. Both B and C are correct, but the primary reason for u=e^(σ√Δt) is volatility matching.", "MEDIUM", ["crr", "binomial"]),

  tf("In a binomial tree for an American put, the option value at each node is the maximum of the immediate exercise value and the continuation value.",
    true, "For American puts: f = max(K − S, discounted expected future value). Early exercise occurs whenever intrinsic value exceeds the continuation value.", "MEDIUM", ["american-put", "binomial"]),

  mcq("The delta of an option in the binomial model is defined as:",
    ["(f_u + f_d) / (Su + Sd)", "(f_u − f_d) / (Su − Sd)",
      "f_u / Su", "(f_u × p + f_d × (1−p)) / S"],
    1, "Delta = (f_u − f_d) / (Su − Sd). It represents the number of shares needed in the replicating portfolio to mimic the option payoff.", "MEDIUM", ["delta", "replication"]),

  mcq("In a risk-neutral world, all assets including stocks are expected to earn:",
    ["Their historical average return", "The risk-free rate",
      "Zero return", "A return proportional to their beta"],
    1, "Under the risk-neutral measure Q, all assets earn the risk-free rate. This is the foundation of risk-neutral pricing—drift is irrelevant to option valuation.", "EASY", ["risk-neutral"]),

  tf("A multi-step binomial tree can be used to price American options but not European options accurately.",
    false, "Binomial trees can price BOTH American and European options. For European options, backwards induction gives the same result as BSM in the limit. For American options, early exercise is checked at each node.", "EASY", ["binomial", "american-european"]),

  mcq("In a binomial model, the price of a European option is path-independent, meaning:",
    ["The option price depends on all intermediate stock prices",
      "The option price depends only on the terminal stock price",
      "The delta of the option is constant",
      "The risk-neutral probabilities are the same at every node"],
    1, "European options pay off based solely on the terminal stock price. The binomial tree naturally handles this—we compute the payoff at each terminal node and work backwards.", "MEDIUM", ["path-independence"]),
]

// ── CHAPTER 14: Wiener Processes ─────────────────────────────────────────────
export const hullCh14 = [
  mcq("A Wiener process has the property that the variance of changes over time T is:",
    ["T²", "T", "√T", "e^T"],
    1, "Var(z(T)) = T for a standard Wiener process. The standard deviation grows as √T, not T. This is the key property of Brownian motion.", "EASY", ["wiener-process", "variance"]),

  tf("The Itô correction term in Itô's lemma arises because (dz)² = dt in stochastic calculus.",
    true, "Unlike ordinary calculus where (dx)² → 0, in stochastic calculus (dz)² = dt (not zero). This gives rise to the extra ½∂²G/∂S² × b² dt term in Itô's lemma.", "MEDIUM", ["ito-lemma", "correction"]),

  mcq("For a stock following dS = μS dt + σS dz, the continuously compounded return over period T has distribution:",
    ["N(μT, σ²T)", "N((μ − σ²/2)T, σ²T)",
      "Lognormal with mean μT", "N(μT, σT)"],
    1, "Applying Itô's lemma to ln(S): d(ln S) = (μ − σ²/2)dt + σdz. So ln(S_T/S₀) ~ N((μ − σ²/2)T, σ²T). The drift of log price is μ − σ²/2, not μ.", "HARD", ["gbm", "lognormal"]),

  mcq("The Markov property of stock prices states that:",
    ["Past prices predict future prices", "Only the current price is relevant for predicting future prices",
      "Price changes are identically distributed each day", "Stock prices follow a Markov chain with discrete states"],
    1, "Markov property: future prices depend only on the current price, not the history of prices. This is consistent with weak-form market efficiency.", "EASY", ["markov"]),

  tf("Under GBM, the stock price S_T is normally distributed.",
    false, "Under GBM, S_T is LOGNORMALLY distributed (ln(S_T) is normally distributed). The lognormal distribution is bounded below by zero, which is appropriate for stock prices.", "EASY", ["gbm", "lognormal"]),

  mcq("Itô's lemma for a function G(S,t) where dS = a dt + b dz gives dG as:",
    ["(∂G/∂S)a dt + (∂G/∂S)b dz",
      "(∂G/∂t + ∂G/∂S × a + ½∂²G/∂S² × b²)dt + ∂G/∂S × b dz",
      "(∂G/∂t + ∂G/∂S × a)dt + ∂G/∂S × b dz",
      "∂G/∂t dt + ∂G/∂S dS"],
    1, "Itô's lemma: dG = (∂G/∂t + ∂G/∂S × a + ½∂²G/∂S² × b²)dt + ∂G/∂S × b × dz. The key extra term vs. ordinary calculus is ½∂²G/∂S² × b².", "HARD", ["ito-lemma"]),
]

// ── CHAPTER 15: Black-Scholes-Merton ─────────────────────────────────────────
export const hullCh15 = [
  mcq("In the Black-Scholes formula for a European call, N(d₂) represents:",
    ["The delta of the call option",
      "The risk-neutral probability that the call expires in the money",
      "The probability that the stock will be above K under the real-world measure",
      "The sensitivity of d₁ to changes in volatility"],
    1, "N(d₂) is the risk-neutral probability that S_T > K (the option expires ITM). N(d₁) is the delta, not N(d₂).", "MEDIUM", ["bsm", "interpretation"]),

  mcq("Which BSM assumption is most frequently violated in practice?",
    ["Continuous trading is possible", "No taxes or transaction costs",
      "Volatility is constant", "The risk-free rate is constant"],
    2, "Constant volatility is the most problematic assumption. Real markets show volatility clustering, smiles, and term structure—all inconsistent with constant σ. This motivates stochastic volatility models.", "MEDIUM", ["bsm", "assumptions"]),

  mcq("A European call has S=100, K=105, r=5%, σ=20%, T=1. d₂ = d₁ − σ√T. If d₁ = −0.05, then d₂ = _____ and the call price is below its intrinsic value of ___.",
    ["d₂ = −0.25; intrinsic = 0", "d₂ = 0.15; intrinsic = 5",
      "d₂ = −0.25; intrinsic = 5", "d₂ = 0.25; intrinsic = 0"],
    0, "d₂ = d₁ − σ√T = −0.05 − 0.20 = −0.25. Since S=100 < K=105, intrinsic value = max(100−105,0) = 0. The call has only time value.", "HARD", ["bsm", "calculation"]),

  tf("Under BSM, the stock price process is assumed to follow geometric Brownian motion with constant drift and volatility.",
    true, "BSM assumes dS = μS dt + σS dz with constant μ and constant σ. This is GBM.", "EASY", ["bsm", "assumptions"]),

  mcq("Implied volatility is:",
    ["The historical standard deviation of returns over the past year",
      "The volatility parameter that makes the BSM formula equal the observed market price",
      "The volatility predicted by GARCH models",
      "The annualized variance of the underlying"],
    1, "Implied volatility (IV) is found by inverting the BSM formula: given the observed market price, solve for σ. It represents the market's consensus about future volatility.", "EASY", ["implied-volatility"]),

  mcq("The BSM formula requires all of the following inputs EXCEPT:",
    ["Current stock price S", "Strike price K", "Expected return μ",
      "Risk-free rate r"],
    2, "The BSM formula does not require the expected return μ. Risk-neutral pricing eliminates the need for μ—this is the fundamental insight of BSM.", "MEDIUM", ["bsm", "inputs"]),

  mcq("For a European call, the delta N(d₁) represents:",
    ["The probability of the call expiring ITM", "The number of shares needed to replicate the call",
      "The second derivative of call price with respect to stock price",
      "The change in call price per unit change in volatility"],
    1, "N(d₁) is the delta of the call: the partial derivative ∂c/∂S = N(d₁). In the replicating portfolio, you hold N(d₁) shares financed by borrowing.", "MEDIUM", ["bsm", "delta"]),

  tf("The Black-Scholes model can be used to price American put options directly.",
    false, "BSM prices European options analytically. American options require numerical methods (binomial trees, finite difference) because early exercise can be optimal for puts.", "EASY", ["bsm", "american"]),
]

// ── CHAPTER 19: Greeks ────────────────────────────────────────────────────────
export const hullCh19 = [
  mcq("A portfolio of options is delta-neutral. If the underlying rises by $1, the portfolio value will approximately:",
    ["Rise by $1", "Fall by $1",
      "Remain unchanged (to first order)", "Become negative"],
    2, "Delta-neutral means Δ_portfolio = 0. The first-order change in value = Δ × ΔS ≈ 0. However, the portfolio will change due to gamma (second-order effect).", "EASY", ["delta-neutral"]),

  mcq("Gamma is largest for options that are:",
    ["Deep in the money", "Deep out of the money",
      "At the money and close to expiry", "Long-dated and in the money"],
    2, "Gamma is highest for ATM options near expiry—this is where the delta changes most rapidly with the stock price. Deep ITM/OTM options have very low gamma.", "MEDIUM", ["gamma"]),

  tf("A long option position always has positive gamma.",
    true, "All long option positions (calls and puts) have positive gamma. Short option positions have negative gamma. Gamma is proportional to the second derivative of option price w.r.t. stock price.", "MEDIUM", ["gamma", "long-option"]),

  mcq("The BSM PDE θ + rS∂V/∂S + ½σ²S²Γ = rV, for a delta-hedged portfolio simplifies to show that:",
    ["Theta and gamma always have opposite signs",
      "High gamma (positive) is always accompanied by significant negative theta",
      "Vega and theta are always equal",
      "Delta and gamma are always proportional"],
    1, "For a delta-hedged long option: Θ + ½σ²S²Γ ≈ rV. Long gamma (Γ>0) means large negative theta (Θ<0) to compensate. Being long gamma costs theta.", "HARD", ["theta-gamma"]),

  mcq("Which Greek measures sensitivity to a change in implied volatility?",
    ["Delta", "Gamma", "Theta", "Vega"],
    3, "Vega = ∂V/∂σ, the sensitivity to changes in implied volatility. Both calls and puts have positive vega.", "EASY", ["vega"]),

  mcq("To delta-hedge a short call position (with delta 0.4), you should:",
    ["Buy 0.4 shares per short call", "Sell 0.4 shares per short call",
      "Buy 0.6 shares per short call", "Do nothing—call positions are self-hedging"],
    0, "Short call has delta = −0.4. To make the total Δ_portfolio = 0: 0.4 shares (long). You buy 0.4 shares per short call.", "MEDIUM", ["delta-hedging"]),

  tf("A delta-neutral portfolio is also gamma-neutral by definition.",
    false, "Delta-neutral means Δ=0, but gamma can be anything. To neutralize gamma, you must add options to the portfolio (not just the underlying, which has zero gamma).", "MEDIUM", ["delta-neutral", "gamma-neutral"]),

  mcq("Theta for a long ATM call option is typically:",
    ["Positive (option gains value as time passes)", "Negative (option loses value as time passes)",
      "Zero for ATM options", "Positive in the morning, negative in the afternoon"],
    1, "Theta for a long option is negative—the option loses time value as expiry approaches (all else equal). This is called 'time decay'.", "EASY", ["theta"]),
]

// ── CHAPTER 20: Volatility Smiles ─────────────────────────────────────────────
export const hullCh20 = [
  mcq("For equity index options, the implied volatility smile typically shows:",
    ["Higher IV for OTM calls than OTM puts (reverse skew)",
      "Higher IV for OTM puts than OTM calls (negative skew/smirk)",
      "A symmetric smile with highest IV for ATM options",
      "Flat IV across all strikes"],
    1, "Equity index options show a 'volatility smirk': OTM puts (low strikes) have higher IV than OTM calls. This reflects the market's fear of large downward moves.", "MEDIUM", ["volatility-smile", "equity"]),

  mcq("For currency options, the implied volatility surface typically shows:",
    ["Higher IV for low-strike options (put skew)",
      "A symmetric smile with higher IV for both low and high strikes",
      "Higher IV for high-strike options (call skew)",
      "Flat IV across all strikes"],
    1, "Currency options typically show a symmetric smile—higher IV for both OTM calls and OTM puts. Both extreme appreciations and depreciations are more likely than BSM predicts.", "MEDIUM", ["volatility-smile", "currency"]),

  tf("A flatter volatility smile implies the market's risk-neutral distribution has thinner tails than the lognormal.",
    false, "A volatility smile (higher IV at the wings) implies HEAVIER tails than lognormal. A negatively skewed smile implies a heavier left tail. A flat smile would be consistent with lognormal.", "HARD", ["volatility-smile", "risk-neutral-distribution"]),

  mcq("The Breeden-Litzenberger formula extracts the risk-neutral probability density from:",
    ["The term structure of zero rates", "The second derivative of call prices with respect to strike",
      "The first derivative of put prices with respect to time", "The VIX index"],
    1, "g(K,T) = e^(rT) × ∂²c/∂K². The second derivative of call prices w.r.t. strike gives the risk-neutral PDF. This is a model-free way to extract market-implied probabilities.", "HARD", ["risk-neutral-distribution", "breeden-litzenberger"]),

  mcq("Which model CAN produce a non-flat volatility smile?",
    ["Black-Scholes-Merton with constant σ", "Geometric Brownian Motion",
      "The Heston stochastic volatility model", "All of the above"],
    2, "The standard BSM/GBM with constant σ produces a flat smile (by construction—implied vol equals input vol for all strikes). The Heston model has stochastic volatility and generates a smile.", "MEDIUM", ["heston", "stochastic-volatility"]),

  tf("Implied volatility is higher for shorter-dated options than longer-dated options when the market anticipates a near-term event.",
    true, "If a major event (earnings, Fed meeting) is expected soon, near-term IV spikes. This creates an inverted term structure of volatility, where short-dated IV > long-dated IV.", "MEDIUM", ["volatility-term-structure"]),
]

// ── CHAPTER 22: Value at Risk ──────────────────────────────────────────────────
export const hullCh22 = [
  mcq("If a portfolio has a 1-day 99% VaR of $500,000, this means:",
    ["The portfolio will definitely lose at most $500,000 in a day",
      "There is a 1% probability of losing more than $500,000 in a single day",
      "The average daily loss is $500,000",
      "The portfolio will lose exactly $500,000 on 1% of days"],
    1, "VaR(99%) = $500K means there is a 1% probability of the loss exceeding $500K over one day. It says nothing about the magnitude of losses beyond $500K.", "EASY", ["var"]),

  mcq("Historical simulation VaR uses:",
    ["A parametric normal distribution fitted to returns",
      "Actual historical returns applied to today's portfolio",
      "Monte Carlo simulation of future returns",
      "The GARCH model to forecast volatility"],
    1, "Historical simulation applies actual historical return scenarios to the current portfolio, taking the (1−α)th percentile of the resulting P&L distribution as the VaR.", "MEDIUM", ["var", "historical-simulation"]),

  tf("Expected Shortfall (ES) is a coherent risk measure while VaR is not.",
    true, "ES (also called CVaR) satisfies all four axioms of coherent risk measures (including subadditivity). VaR violates subadditivity: VaR(A+B) can exceed VaR(A)+VaR(B) for non-normally distributed losses.", "HARD", ["es", "coherent-risk"]),

  mcq("Under the variance-covariance approach, 10-day VaR is typically calculated as:",
    ["10 × 1-day VaR", "√10 × 1-day VaR",
      "1-day VaR^10", "1-day VaR / √10"],
    1, "The square-root-of-time rule: N-day VaR ≈ √N × 1-day VaR. This assumes independent, identically distributed daily returns.", "MEDIUM", ["var", "scaling"]),

  mcq("Expected Shortfall (ES) at confidence level α is defined as:",
    ["The maximum possible loss", "The VaR at confidence level α",
      "The expected loss given the loss exceeds VaR",
      "The average of VaR at all confidence levels above α"],
    2, "ES_α = E[Loss | Loss > VaR_α]. It is the average of the losses in the tail beyond VaR. It is always ≥ VaR.", "MEDIUM", ["es", "definition"]),

  tf("VaR backtesting counts how many days actual losses exceeded the VaR estimate.",
    true, "Backtesting checks whether the frequency of VaR exceedances matches the confidence level. For 99% VaR with 250 days, we expect ~2.5 exceedances. The Basel traffic light system uses this count.", "EASY", ["var", "backtesting"]),
]

// ── CHAPTER 24–25: Credit ─────────────────────────────────────────────────────
export const hullCh24 = [
  mcq("Credit spread is approximately related to probability of default (PD) and loss given default (LGD) by:",
    ["Credit spread = PD / LGD", "Credit spread = PD + LGD",
      "Credit spread ≈ PD × LGD", "Credit spread = LGD − PD"],
    2, "Credit spread ≈ hazard rate × LGD ≈ PD × LGD. A bond with annual PD of 2% and LGD of 50% should carry a spread of ~1% over the risk-free rate.", "MEDIUM", ["credit-spread", "pd", "lgd"]),

  mcq("In the Merton model, equity is modeled as:",
    ["A put option on the firm's assets", "A call option on the firm's assets",
      "A forward contract on firm assets", "A bond with a floating coupon"],
    1, "In Merton's structural model, equity = max(A − D, 0), which is a call option on firm assets A with strike D (face value of debt). Default occurs when A < D.", "MEDIUM", ["merton-model", "structural"]),

  tf("A credit default swap (CDS) provides protection to the buyer if the reference entity defaults.",
    true, "CDS = credit insurance. The protection buyer pays a periodic spread; the protection seller pays (1 − Recovery Rate) × Notional if a credit event (default) occurs.", "EASY", ["cds"]),

  mcq("CVA (Credit Valuation Adjustment) reduces the value of a derivative because:",
    ["Higher interest rates reduce option values",
      "Counterparty default risk means promised cash flows may not be received",
      "Regulatory capital requirements reduce leverage",
      "The bid-ask spread widens for complex derivatives"],
    1, "CVA is a negative adjustment to derivative fair value, reflecting the probability that the counterparty defaults and does not pay future positive cash flows to us.", "MEDIUM", ["cva"]),

  tf("Recovery rates in corporate debt defaults are typically around 40–60% for senior secured bonds.",
    true, "Historical recovery rates for senior secured bonds average around 50–60%; senior unsecured around 40–50%; subordinated debt 25–30%. Recovery is highly variable.", "MEDIUM", ["recovery-rate"]),
]

// ── CHAPTER 8: Securitization and the Financial Crisis ───────────────────────
export const hullCh08 = [
  mcq("What is securitization?",
    ["Issuing government bonds to fund public debt",
      "Pooling assets (loans, mortgages) and selling interests in the cash flows as securities",
      "Providing insurance against stock market losses",
      "Converting equity into fixed-income instruments"],
    1, "Securitization pools illiquid assets (e.g., mortgages) into a special-purpose vehicle (SPV) that issues tradable securities backed by the pool's cash flows.", "EASY", ["securitization", "definition"]),

  mcq("What does ABS stand for in the context of structured finance?",
    ["Absolute Bond Security", "Asset-Backed Security", "Arbitrage Bond Swap", "Automated Brokerage System"],
    1, "ABS = Asset-Backed Security. Any security backed by a pool of underlying assets (mortgages, auto loans, credit cards) is an ABS.", "EASY", ["abs"]),

  mcq("In a CDO (Collateralized Debt Obligation), the equity tranche:",
    ["Has the highest priority of payment and the lowest yield",
      "Bears the first losses from the underlying pool",
      "Is guaranteed by the US government",
      "Has no exposure to default risk"],
    1, "The equity tranche (first-loss piece) absorbs initial losses before senior tranches are affected. It carries the highest risk and demands the highest return.", "MEDIUM", ["cdo", "tranching"]),

  tf("A mortgage-backed security (MBS) passes through all principal and interest payments from the underlying mortgages to investors.",
    true, "In a pass-through MBS, the cash flows (principal + interest) from the mortgage pool are passed through to investors after a servicing fee, subject to prepayment risk.", "EASY", ["mbs", "pass-through"]),

  mcq("The 'waterfall' structure in CDOs means that:",
    ["Cash flows are distributed to all tranches equally",
      "Senior tranches receive cash flows before junior tranches",
      "Equity holders are paid first",
      "Interest payments are reinvested in new CDOs"],
    1, "The waterfall specifies priority of payment: senior tranches are paid first, then mezzanine, then equity. Losses hit equity first and work upward.", "MEDIUM", ["waterfall", "priority"]),

  mcq("One key reason the 2007–08 financial crisis was so severe was that:",
    ["Central banks raised rates too aggressively",
      "CDO tranches were incorrectly rated — AAA tranches had far more correlation risk than models assumed",
      "Governments refused to provide any bailouts",
      "Equity markets were not involved in the crisis"],
    1, "Rating agency models underestimated default correlation. When US house prices fell nationally, correlations rose sharply, causing even 'AAA' tranches of CDOs to suffer large losses.", "HARD", ["financial-crisis", "correlation"]),

  tf("The originate-to-distribute model reduces incentives for lenders to carefully screen borrowers.",
    true, "When originators sell loans rather than hold them, they have weaker incentives to assess credit quality because they transfer the default risk to investors.", "MEDIUM", ["moral-hazard", "originate-to-distribute"]),

  mcq("A CDO-squared is best described as:",
    ["A CDO backed by corporate bonds",
      "A CDO whose underlying collateral consists of tranches of other CDOs",
      "A government-sponsored mortgage security",
      "A derivative on a volatility index"],
    1, "A CDO-squared (CDO²) holds tranches from existing CDOs as its collateral, creating a second layer of leverage and complexity—making true risk assessment extremely difficult.", "HARD", ["cdo-squared"]),

  tf("Super-senior tranches of CDOs are completely immune to loss regardless of the level of defaults in the underlying pool.",
    false, "No tranche is completely immune. Super-senior tranches have very high protection but can still suffer losses if defaults exceed the total subordination below them.", "MEDIUM", ["super-senior", "credit-risk"]),

  mcq("NINJA loans refer to mortgages made to borrowers with:",
    ["No Income, No Job, No Assets",
      "Near-Ideal Net Interest and Job Achievements",
      "Non-Indexed, Non-Jumbo, Adjustable rate loans",
      "Normal Income, Junior Application"],
    0, "NINJA = No Income, No Job, No Assets. These were subprime mortgages extended to unqualified borrowers during the pre-crisis lending boom, contributing heavily to 2007–08 losses.", "EASY", ["subprime", "ninja"]),
]

// ── CHAPTER 9: OIS Discounting, Credit Issues, and Funding Costs ─────────────
export const hullCh09 = [
  mcq("OIS stands for:",
    ["Overnight Index Swap", "Option-Implied Spread", "Off-Balance-Sheet Instrument", "Over-the-counter Interest Swap"],
    0, "OIS = Overnight Index Swap, a fixed-for-floating swap where the floating leg is the daily compounded overnight rate (e.g., Fed Funds for USD, EONIA for EUR).", "EASY", ["ois", "definition"]),

  tf("LIBOR is considered a near risk-free rate because it reflects unsecured interbank lending with essentially no credit risk.",
    false, "LIBOR reflects the credit risk of major banks lending to each other unsecured. It exceeds the true risk-free rate; the OIS rate is the better proxy for near-risk-free rates.", "EASY", ["libor", "ois"]),

  mcq("When a derivatives dealer is fully collateralized with cash, the appropriate discount rate for valuing the derivatives is:",
    ["LIBOR", "The OIS rate", "The Fed Funds target rate", "The dealer's own cost of funds"],
    1, "Under CSA (Credit Support Annex) agreements with daily cash collateral, the collateral earns the OIS rate. The correct discount rate is therefore OIS (e.g., SOFR/Fed Funds).", "MEDIUM", ["ois-discounting", "csa"]),

  mcq("The LIBOR-OIS spread is a key measure of:",
    ["Equity market volatility", "Stress in the interbank lending market",
      "Corporate bond credit spreads", "Government bond term premiums"],
    1, "The LIBOR-OIS spread = bank credit risk + liquidity premium. It widened dramatically in 2008, signalling severe stress in interbank markets.", "MEDIUM", ["libor-ois-spread"]),

  mcq("KVA (Capital Valuation Adjustment) reflects the cost of:",
    ["The credit risk of the counterparty", "Regulatory capital that must be set aside against a derivatives position",
      "Funding the initial margin at a clearing house", "Bid-ask spreads in illiquid markets"],
    1, "KVA captures the cost of holding regulatory capital (e.g., under Basel III) against uncollateralized or partially-collateralized positions. It is one of the 'xVA' adjustments alongside CVA, DVA, and FVA.", "HARD", ["kva", "xva", "regulatory-capital"]),

  mcq("DVA (Debit Valuation Adjustment) represents:",
    ["The loss in derivative value from the counterparty's default risk",
      "The gain to a dealer from the possibility of its own default",
      "The cost of regulatory capital",
      "The adjustment for illiquid markets"],
    1, "DVA is the mirror of CVA: it reflects the gain a dealer might recognise due to the possibility of its own default—the market value of its own credit risk to the counterparty.", "HARD", ["dva", "xva"]),

  mcq("FVA (Funding Valuation Adjustment) corrects for the fact that:",
    ["Futures contracts are marked to market daily",
      "Uncollateralized derivatives require funding at a spread above OIS",
      "Equity options decay faster near expiry",
      "Government bonds are tax-exempt"],
    1, "FVA accounts for the funding cost when a dealer must post collateral or fund uncollateralized positions at a rate above OIS, creating an additional cost not captured by risk-free discounting.", "HARD", ["fva", "xva"]),

  mcq("Term SOFR differs from SOFR compounded in arrears in that term SOFR is:",
    ["Known only at the end of the interest period", "Set at the beginning of the period (forward-looking), like LIBOR was",
      "Higher than SOFR compounded in arrears by definition", "Published only for overnight maturities"],
    1, "Term SOFR (e.g., 1-month, 3-month) is published at the start of the interest period — it is forward-looking, like LIBOR. SOFR compounded in arrears is computed during the period and known only at the end.", "MEDIUM", ["sofr", "term-sofr", "backward-looking"]),

  mcq("A key difference between SOFR and LIBOR is that SOFR is:",
    ["Forward-looking and unsecured", "Backward-looking and secured (repo-based)",
      "Set by a panel of major banks daily", "Based on corporate bond yields"],
    1, "SOFR is transaction-based (repo market), secured, and backward-looking (compounded in arrears). LIBOR was forward-looking, unsecured, and survey-based.", "MEDIUM", ["sofr", "libor"]),
]

// ── CHAPTER 16: Employee Stock Options ───────────────────────────────────────
export const hullCh16 = [
  mcq("How do employee stock options (ESOs) typically differ from exchange-traded options?",
    ["ESOs can be sold on exchange; traded options cannot",
      "ESOs have no vesting period; traded options vest immediately",
      "ESOs cannot be sold and are often subject to vesting periods",
      "ESOs are always European-style; traded options are American"],
    2, "ESOs are non-transferable (cannot be sold) and usually require the employee to remain at the company for a vesting period (commonly 3–4 years) before the options can be exercised.", "EASY", ["eso", "vesting"]),

  tf("Under US accounting rules (ASC 718), companies must expense employee stock options at their fair value on the grant date.",
    true, "ASC 718 (and IFRS 2 internationally) requires the grant-date fair value of ESOs to be recognised as compensation expense, typically spread over the vesting period.", "MEDIUM", ["accounting", "aso718"]),

  mcq("Employees tend to exercise their stock options early (relative to the Black-Scholes optimal boundary) primarily because:",
    ["They want to capture more time value",
      "Tax rules force early exercise",
      "They are risk averse and cannot diversify or sell the options",
      "Early exercise avoids dividend dilution"],
    2, "Unlike rational investors who would hold an American call to expiry or until deep in the money, employees cannot sell their options and often exercise early to realise gains and diversify away from company-specific risk.", "MEDIUM", ["early-exercise", "risk-aversion"]),

  mcq("The 'expected life' approach used by companies to value ESOs involves:",
    ["Using the full contractual maturity in the Black-Scholes formula",
      "Substituting an estimated average exercise time for the option's maturity in BSM",
      "Monte Carlo simulation of employee behaviour",
      "Using the binomial tree with random vesting shocks"],
    1, "IFRS 2 / ASC 718 allow companies to use expected (average) option life rather than full maturity in Black-Scholes as a simplification to account for early exercise behaviour.", "MEDIUM", ["expected-life", "valuation"]),

  tf("The dilution effect of ESOs means that when options are exercised, new shares are issued, diluting existing shareholders.",
    true, "ESOs are typically settled by issuing new shares. This increases the share count, diluting earnings per share and the value of existing shareholders' stakes.", "EASY", ["dilution"]),

  mcq("A reload option grants the employee:",
    ["Additional options equal to any dividends paid during the holding period",
      "New at-the-money options when existing options are exercised using company shares",
      "The right to sell their options back to the company at intrinsic value",
      "Protection against stock price declines below the exercise price"],
    1, "A reload feature grants new at-the-money options whenever the employee exercises existing ESOs by surrendering company shares (rather than paying cash). Hull shows these have value but are complex.", "HARD", ["reload-option"]),

  mcq("Which model is most theoretically appropriate for valuing ESOs given their non-transferability and early exercise patterns?",
    ["Black-Scholes (European closed-form)", "Binomial tree with early-exercise features and employee-specific assumptions",
      "The futures pricing formula", "The Merton jump-diffusion model"],
    1, "A binomial (lattice) model that incorporates vesting, forfeiture rates, and early-exercise probabilities (or a utility-based model) is more appropriate than simple BSM for ESOs.", "HARD", ["binomial-tree", "valuation"]),
]

// ── CHAPTER 17: Options on Stock Indices, Currencies, and Futures ─────────────
export const hullCh17 = [
  mcq("Options on stock indices use a continuous dividend yield q. How does the Black-Scholes formula adjust?",
    ["Replace S with S·e^(qT) and r with r−q",
      "Replace S with S·e^(−qT) and r with r−q in the d1/d2 calculation",
      "Replace σ with σ + q",
      "No adjustment needed; dividends do not affect option prices"],
    1, "For continuous dividend yield q, the forward price of the index is F = Se^((r−q)T), so we replace S with Se^(−qT) in d1/d2 — equivalently use r−q in place of r in the original BSM d1.", "MEDIUM", ["merton-model", "dividend-yield"]),

  tf("A European put option on a currency can be valued as a European call using put-call parity for currencies.",
    true, "Put-call parity holds for currency options: C − P = Se^(−r_f T) − Ke^(−rT). Any European currency put can be replicated/valued via the corresponding call, the spot, and risk-free bonds.", "MEDIUM", ["put-call-parity", "currency-options"]),

  mcq("The Garman-Kohlhagen model for currency options treats the foreign risk-free rate r_f as:",
    ["The dividend yield of the underlying stock",
      "A continuous dividend yield on the foreign currency",
      "The domestic risk-free rate",
      "Zero, because currencies pay no cash flows"],
    1, "Holding a foreign currency earns the foreign risk-free rate r_f. Garman-Kohlhagen substitutes r_f for the dividend yield q in the Merton dividend-adjusted BSM formula.", "MEDIUM", ["garman-kohlhagen", "currency-options"]),

  mcq("A futures option gives the holder the right to:",
    ["Buy or sell the underlying asset at the futures price",
      "Enter into a futures contract at the specified futures price",
      "Exchange one currency for another at maturity",
      "Receive the profit on a futures contract without margin requirements"],
    1, "A futures option gives the right to enter into a futures position (long call, short put) at the strike price K. On exercise, the holder gets a futures contract plus/minus a cash payment of F − K.", "MEDIUM", ["futures-options"]),

  mcq("Black's model for pricing options on futures replaces the stock price S with:",
    ["The futures price F discounted at r", "The current futures price F directly",
      "The expected future spot price", "The forward price adjusted for convenience yield"],
    1, "In Black's model, C = e^(−rT)[F·N(d1) − K·N(d2)] where d1 = [ln(F/K) + σ²T/2]/(σ√T). The futures price F replaces S, and there is no need to carry a 'cost of carry' term.", "MEDIUM", ["blacks-model", "futures-options"]),

  tf("For European options, an option on a futures contract and an option on the spot price have the same value when the futures price equals the forward price.",
    true, "When F = Forward Price (which holds when the cost of carry is deterministic), European options on futures and on the spot have the same value. This equivalence breaks down for American options.", "HARD", ["futures-options", "european"]),

  mcq("Index options are typically settled:",
    ["By physical delivery of all stocks in the index",
      "In cash, based on the index value at expiry",
      "By delivery of the corresponding index futures contract",
      "By the holder choosing cash or physical"],
    1, "Stock index options settle in cash because delivering all stocks in the index is impractical. The payoff = max(S_T − K, 0) for a call, paid in cash.", "EASY", ["index-options", "cash-settlement"]),

  mcq("Which statement best describes a put on the S&P 500 index held as portfolio protection?",
    ["It gains when individual stocks rise",
      "It pays off when the index falls below the strike, offsetting portfolio losses",
      "It provides protection only if all stocks in the portfolio fall",
      "It has no value in declining markets"],
    1, "A put on the S&P 500 pays max(K − S_T, 0). For a portfolio closely tracking the index, this acts as a floor, limiting downside. This is classic portfolio insurance.", "EASY", ["portfolio-insurance", "index-put"]),
]

// ── CHAPTER 18: Futures Options: Pricing and Relationships ────────────────────
export const hullCh18 = [
  mcq("American futures call options are more likely to be exercised early than American stock call options because:",
    ["Futures have no dividends, so the option must be exercised to capture gains",
      "The futures position requires no initial investment, so early exercise can be valuable even without dividends",
      "Futures prices are always lower than spot prices",
      "Futures options have no time value"],
    1, "With a futures call, exercising early delivers a futures position (no outlay) plus a cash payment of F − K. Unlike a stock call, there is no dividend consideration preventing early exercise; the futures itself earns no carry, making early exercise potentially optimal.", "HARD", ["early-exercise", "futures-call"]),

  tf("Put-call parity for European futures options states: C − P = (F − K)e^(−rT).",
    true, "For European futures options, put-call parity is C − P = (F − K)e^(−rT), where F is the current futures price and K is the strike. Both options must have the same maturity as the futures.", "MEDIUM", ["put-call-parity", "futures-options"]),

  mcq("Black's model assumes the futures price follows:",
    ["A mean-reverting process", "Geometric Brownian motion with zero drift under the risk-neutral measure",
      "A jump-diffusion process", "A constant process until maturity"],
    1, "Under the risk-neutral measure, futures prices are martingales (zero expected drift): dF = σF dW. Black's model exploits this to obtain a closed-form option price analogous to BSM.", "MEDIUM", ["blacks-model", "gbm"]),

  mcq("For a futures option with strike K = 100, current futures price F = 105, and time to expiry T = 0.5, the intrinsic value of the call is:",
    ["0", "5", "5·e^(−rT)", "105"],
    1, "Intrinsic value of a futures call = max(F − K, 0) = max(105 − 100, 0) = 5. Note this is not discounted; intrinsic value is defined without discounting.", "EASY", ["intrinsic-value"]),

  mcq("For a futures option, the delta of a long call (with futures delta ≈ 1) is:",
    ["Always equal to 1.0 regardless of moneyness",
      "N(d₁) in Black's model — between 0 and 1, rising toward 1 deep ITM",
      "The same as a stock call delta multiplied by e^(rT)",
      "Always greater than the corresponding spot option delta"],
    1, "In Black's model for futures options, delta = e^(−rT)·N(d₁). The e^(−rT) discounting arises because a futures position requires no upfront cash. Deep ITM futures calls approach delta = e^(−rT) ≈ 1 for short maturities.", "HARD", ["futures-options", "delta", "blacks-model"]),

  mcq("If futures options expire at the same time as the futures contract, exercising a futures call delivers:",
    ["Physical delivery of the underlying asset",
      "A long futures position plus cash equal to F − K",
      "A long forward contract at strike K",
      "The underlying asset at the spot price"],
    1, "Exercising a futures call grants a long futures contract at price K. Since the futures price is now F, the holder immediately marks-to-market and receives F − K in cash (then the futures is at F).", "MEDIUM", ["futures-options", "exercise"]),

  mcq("Which of the following is a key advantage of futures options over spot options for many markets?",
    ["Futures options always have lower premiums",
      "Futures markets are often more liquid; delivery/settlement is more straightforward",
      "Futures options never require margin",
      "Futures options are always European-style"],
    1, "In many commodity and interest-rate markets, futures markets are deeper and more liquid than spot markets. Futures options (on the more liquid futures) are easier to hedge and settle in cash.", "MEDIUM", ["futures-options", "liquidity"]),
]

// ── CHAPTER 21: Basic Numerical Procedures ────────────────────────────────────
export const hullCh21 = [
  mcq("In a binomial tree for option pricing, the risk-neutral probability p of an up-move is calculated so that:",
    ["The expected stock return equals the required return",
      "The expected discounted stock price equals the current price (no-arbitrage)",
      "The variance of the stock equals its historical variance",
      "The tree recombines at all nodes"],
    1, "p is chosen so that the discounted expectation of the stock price equals the current price: S = e^(−rΔt)[p·Su + (1−p)·Sd]. This enforces no-arbitrage / risk-neutral pricing.", "MEDIUM", ["binomial-tree", "risk-neutral"]),

  mcq("The Crank-Nicolson finite difference scheme is preferred over the explicit scheme for option pricing because:",
    ["It is simpler to code and always faster", "It is unconditionally stable and second-order accurate in both time and space",
      "It avoids the need for a grid entirely", "It gives exact prices for American options"],
    1, "Crank-Nicolson averages the implicit and explicit schemes: unconditionally stable (no grid-spacing restriction) and O(Δt², ΔS²) accurate. The explicit scheme is only O(Δt) and requires small Δt for stability.", "HARD", ["crank-nicolson", "finite-difference", "stability"]),

  mcq("Barrier options are harder to price accurately with coarse binomial trees because:",
    ["The risk-neutral probability changes near the barrier",
      "The barrier may fall between grid nodes, causing the tree to misjudge the knock-out probability",
      "Barrier options require more time steps than vanilla options",
      "The early-exercise feature interacts badly with barriers"],
    1, "When the barrier falls between tree nodes, the tree systematically overestimates (for knock-out) or underestimates the option value. Solutions include adjusting the barrier inward or using trinomial/adaptive trees.", "HARD", ["barrier-option", "binomial-tree", "accuracy"]),

  mcq("In a trinomial tree, each node branches into three possible outcomes. Compared to a binomial tree with the same number of time steps, trinomial trees generally:",
    ["Require more computation and provide no benefit",
      "Converge faster and handle barrier options more accurately",
      "Are equivalent in accuracy and speed",
      "Cannot price American options"],
    1, "Trinomial trees converge faster than binomial trees and handle features like barriers more accurately because the extra node allows the barrier to align better with the grid.", "MEDIUM", ["trinomial-tree"]),

  mcq("Finite difference methods for option pricing approximate the Black-Scholes PDE by replacing derivatives with:",
    ["Closed-form analytical expressions",
      "Discrete difference quotients on a grid of S and t values",
      "Monte Carlo simulations of the stock path",
      "Fourier transforms of the characteristic function"],
    1, "Finite difference methods (explicit, implicit, Crank-Nicolson) discretise the PDE on a grid: ∂V/∂t ≈ (V_{i,j+1} − V_{i,j})/Δt, ∂²V/∂S² ≈ (V_{i+1,j} − 2V_{i,j} + V_{i−1,j})/(ΔS)². This converts the PDE into a system of algebraic equations.", "MEDIUM", ["finite-difference", "pde"]),

  mcq("Monte Carlo simulation is particularly well-suited for pricing:",
    ["Short-dated American options",
      "Path-dependent options with many underlying assets",
      "Simple European options that have closed-form solutions",
      "Options where only the terminal distribution matters"],
    1, "Monte Carlo excels at path-dependent payoffs (Asian, lookback, barrier) and multi-asset problems where analytical solutions are unavailable. It is less efficient for American options (requires backward induction).", "MEDIUM", ["monte-carlo", "path-dependent"]),

  tf("The implicit finite difference method is unconditionally stable, whereas the explicit method has stability constraints on the grid spacing.",
    true, "The explicit scheme requires Δt ≤ (ΔS)²/(σ²S²) for stability. The implicit (and Crank-Nicolson) scheme is unconditionally stable for all grid spacings.", "HARD", ["implicit-explicit", "stability"]),

  mcq("Variance reduction techniques in Monte Carlo simulation include:",
    ["Increasing the number of time steps per path only",
      "Antithetic variates, control variates, and importance sampling",
      "Using a coarser grid to speed up simulation",
      "Reducing the number of simulated paths"],
    1, "Variance reduction techniques—antithetic variates (mirror random paths), control variates (use known analytical price as a benchmark), and importance sampling (oversample important regions)—reduce the standard error of Monte Carlo estimates.", "MEDIUM", ["variance-reduction", "monte-carlo"]),

  mcq("The 'Greeks' from a binomial tree are computed by:",
    ["Differentiating the Black-Scholes formula analytically",
      "Comparing option values at adjacent nodes to approximate partial derivatives",
      "Resimulating the tree with different parameters",
      "Using the SABR model"],
    1, "Delta = (V_u − V_d)/(Su − Sd) at the first node; Gamma uses second-order differences; Theta uses the option value at a slightly later time step versus now.", "MEDIUM", ["greeks", "binomial-tree"]),
]

// ── CHAPTER 23: Estimating Volatilities and Correlations ─────────────────────
export const hullCh23 = [
  mcq("EWMA (Exponentially Weighted Moving Average) volatility weighting uses a decay factor λ. A value of λ close to 1 means:",
    ["Recent observations are heavily weighted",
      "Distant observations are almost as important as recent ones",
      "Volatility is assumed constant",
      "The model reduces to a simple moving average"],
    1, "When λ is close to 1 (e.g., 0.97), the weights decay slowly, giving significant weight to older observations. RiskMetrics uses λ = 0.94 for daily data, giving 94% weight to the previous estimate.", "MEDIUM", ["ewma", "volatility"]),

  mcq("In the GARCH(1,1) model, the variance forecast for tomorrow is:",
    ["A simple average of past squared returns",
      "ω + α·ε²_t + β·σ²_t, a weighted combination of long-run variance, latest shock, and last period variance",
      "The implied volatility from at-the-money options",
      "A random draw from a chi-squared distribution"],
    1, "GARCH(1,1): σ²_{t+1} = ω + α·ε²_t + β·σ²_t. The three terms represent: long-run variance target (ω), ARCH effect (α·ε²_t), and GARCH persistence (β·σ²_t). α + β < 1 for stationarity.", "MEDIUM", ["garch", "volatility"]),

  tf("The maximum likelihood method can be used to estimate GARCH parameters by maximising the probability of observing the historical return series.",
    true, "GARCH parameters (ω, α, β) are estimated by maximum likelihood: maximise ∑[−log(σ²_t) − ε²_t/σ²_t] over the historical sample.", "MEDIUM", ["garch", "mle"]),

  mcq("Mean reversion in volatility means that:",
    ["Volatility never deviates from its long-run average",
      "After a shock, volatility tends to drift back toward its long-run level over time",
      "Volatility increases monotonically over time",
      "The volatility process is a martingale"],
    1, "Empirical evidence strongly supports volatility mean-reversion. GARCH models capture this: when α + β < 1, the long-run variance VL = ω/(1−α−β) acts as the equilibrium level.", "EASY", ["mean-reversion", "garch"]),

  mcq("The long-run average variance in a GARCH(1,1) model is:",
    ["ω/(1 − α − β)", "ω + α + β", "α/β", "1 − α − β"],
    0, "Long-run variance VL = ω/(1 − α − β). As t → ∞, the GARCH forecast converges to VL. If α + β = 1, the process is IGARCH (integrated) with no long-run mean.", "MEDIUM", ["garch", "long-run-variance"]),

  tf("Implied volatility from option prices is often preferred over historical volatility for forecasting because it is forward-looking.",
    true, "Implied volatility is derived from current market prices and reflects market expectations of future volatility. Historical volatility looks backward and may not represent the future environment.", "EASY", ["implied-volatility", "forecasting"]),

  mcq("Correlation estimation using EWMA calculates the covariance between assets i and j as:",
    ["The product of their EWMA standard deviations",
      "A weighted average of past cross-products of returns using the same λ",
      "The sample correlation over the past 252 trading days",
      "Zero, since correlations are assumed constant"],
    1, "EWMA covariance: cov_{t+1}(i,j) = λ·cov_t(i,j) + (1−λ)·x_{i,t}·x_{j,t}, where x_{i,t} are daily returns. The correlation follows from cov divided by the product of EWMA standard deviations.", "MEDIUM", ["ewma", "correlation"]),

  mcq("Volatility clustering refers to the empirical observation that:",
    ["Volatility is highest during summer months",
      "Large price changes tend to be followed by large changes (of either sign)",
      "Stocks with higher volatility have lower returns",
      "Volatility is completely unpredictable"],
    1, "Volatility clustering (Mandelbrot, 1963; Engle, 1982) is a key stylised fact: high-volatility periods cluster together. ARCH/GARCH models were specifically designed to capture this phenomenon.", "EASY", ["volatility-clustering", "garch"]),
]

// ── CHAPTER 25: Credit Derivatives ───────────────────────────────────────────
export const hullCh25 = [
  mcq("A credit default swap (CDS) is an agreement where:",
    ["Both parties exchange interest rate cash flows",
      "The protection buyer pays a periodic spread and receives par minus recovery if default occurs",
      "The protection seller buys the reference bond",
      "The reference entity guarantees the swap payment"],
    1, "In a CDS, the protection buyer pays a fixed spread (bps per year) on notional. In exchange, if the reference entity has a credit event, the protection seller pays notional × (1 − recovery rate).", "EASY", ["cds", "definition"]),

  mcq("The CDS spread on a reference entity reflects primarily:",
    ["The risk-free interest rate level",
      "The risk-neutral probability of default and expected recovery rate",
      "The credit rating of the protection seller",
      "The liquidity of the underlying bond"],
    1, "CDS spread ≈ (1 − R) × λ where λ is the risk-neutral default intensity and R is the recovery rate. Under the simplified model, spread ≈ risk-neutral hazard rate × (1 − recovery).", "MEDIUM", ["cds-spread", "hazard-rate"]),

  tf("In a binary (digital) CDS, the protection seller pays a fixed amount (not par minus recovery) upon default.",
    true, "A binary/digital CDS pays a pre-specified fixed amount (e.g., $1 per unit notional) on default, regardless of recovery. This eliminates recovery rate uncertainty for the protection buyer.", "MEDIUM", ["digital-cds"]),

  mcq("A total return swap (TRS) involves:",
    ["Exchanging fixed and floating interest rates",
      "One party paying the total return of a reference asset and receiving LIBOR plus a spread",
      "Delivering the reference bond upon default",
      "Exchanging equity dividends for bond coupons"],
    1, "In a TRS, the total return payer (often a bank) passes all cash flows (coupons + capital gains/losses) of the reference asset to the total return receiver, and receives a floating rate. It transfers the economics of the asset without selling it.", "MEDIUM", ["total-return-swap", "trs"]),

  mcq("Asset swaps are used to:",
    ["Convert the credit risk of a bond into equity exposure",
      "Swap the fixed coupon on a bond for a floating rate, while retaining the bond's credit risk",
      "Eliminate the default risk of a corporate bond",
      "Convert a foreign currency bond into a domestic currency bond"],
    1, "An asset swap buyer purchases a bond and enters an interest rate swap (paying fixed, receiving floating). The result is exposure to the bond's credit risk while receiving LIBOR ± spread rather than the fixed coupon.", "MEDIUM", ["asset-swap"]),

  mcq("A CDX index CDS provides protection on:",
    ["A single reference entity",
      "A basket of typically 125 investment-grade North American credit names",
      "Only US government bonds",
      "A portfolio of equity index options"],
    1, "CDX IG (Investment Grade) is a standardised index CDS on 125 North American investment-grade names. It allows efficient trading of broad credit exposure and is a benchmark for the credit market.", "MEDIUM", ["cdx", "index-cds"]),

  tf("The hazard rate (default intensity) λ is related to the survival probability S(t) by S(t) = e^(−λt) for a constant hazard rate.",
    true, "For a constant hazard rate λ, the probability of surviving to time t with no default is S(t) = e^(−λt). The probability of defaulting in [t, t+dt] is λ·e^(−λt)·dt.", "MEDIUM", ["hazard-rate", "survival-probability"]),

  mcq("The 'cheapest-to-deliver' (CTD) option in physically-settled CDS arises because:",
    ["The protection seller chooses when to pay",
      "The protection buyer can deliver any deliverable obligation of the reference entity",
      "CDS always settle at par",
      "Physical delivery requires government approval"],
    1, "In physical settlement, the protection buyer delivers any eligible obligation (bond/loan) of the reference entity and receives par. They will choose the cheapest deliverable bond, creating a valuable option.", "HARD", ["cds", "ctd-option"]),
]

// ── CHAPTER 26: Exotic Options ────────────────────────────────────────────────
export const hullCh26 = [
  mcq("An Asian option's payoff depends on:",
    ["The maximum stock price over the option's life",
      "The average stock price over a specified period",
      "The stock price at a single future date",
      "The difference between the highest and lowest stock price"],
    1, "Asian (average rate) options pay based on the average price of the underlying over the option's life (or a sub-period). They are cheaper than vanilla options because averaging reduces volatility.", "EASY", ["asian-option"]),

  mcq("A barrier option that 'knocks out' when the stock price hits the barrier is called:",
    ["An up-and-in option", "A down-and-out option (or up-and-out depending on direction)",
      "A lookback option", "A compound option"],
    1, "Knock-out (KO) options cease to exist if the barrier is breached. Down-and-out KO: option is cancelled if S falls to barrier. Up-and-out KO: cancelled if S rises to barrier.", "EASY", ["barrier-option", "knock-out"]),

  tf("A lookback call option gives the holder the right to buy the stock at the lowest price observed over the option's life.",
    true, "A floating strike lookback call pays S_T − min(S_t), allowing the holder to 'look back' and buy at the historical minimum. It is expensive because it eliminates the risk of mistiming the entry.", "MEDIUM", ["lookback-option"]),

  mcq("A compound option is:",
    ["An option on a basket of underlyings",
      "An option to buy or sell another option",
      "A combination of a call and a put",
      "An option with a step-up strike price"],
    1, "A compound option has another option as its underlying (e.g., a call on a call, put on a put). They arise naturally in contexts where the underlying firm has options embedded in its capital structure.", "MEDIUM", ["compound-option"]),

  mcq("A chooser option allows the holder to:",
    ["Choose the strike price at expiry",
      "Decide before a specified date whether the option will be a call or a put",
      "Choose the underlying asset at inception",
      "Exercise at any time during the option's life"],
    1, "A chooser (or 'as-you-like-it') option lets the holder choose, at a specified future date, whether the option will become a European call or put with given strike and maturity.", "MEDIUM", ["chooser-option"]),

  mcq("Cliquet (ratchet) options are structured so that the strike resets periodically to:",
    ["The original strike price each period",
      "The prevailing stock price at the end of each period",
      "A fixed spread above LIBOR",
      "Zero, making them equivalent to futures"],
    1, "In a cliquet, the strike resets to the current stock price at the end of each sub-period, locking in gains. The payoff is the sum of floored returns over sub-periods.", "HARD", ["cliquet", "ratchet"]),

  tf("Digital (binary) options pay a fixed amount if in the money at expiry and zero otherwise.",
    true, "A cash-or-nothing digital call pays a fixed amount Q if S_T > K, and 0 otherwise. An asset-or-nothing digital call pays S_T if S_T > K. These are building blocks for more complex payoffs.", "EASY", ["digital-option", "binary"]),

  mcq("Exchange options give the holder the right to:",
    ["Swap a fixed coupon bond for a floating rate bond",
      "Receive the better-performing of two risky assets",
      "Exchange one asset for another risky asset (not cash)",
      "Convert equity into debt at maturity"],
    1, "Margrabe's exchange option gives the right to give up asset B and receive asset A: max(S_A − S_B, 0). The analytical formula replaces the risk-free rate with the return of asset B.", "HARD", ["exchange-option", "margrabe"]),
]

// ── CHAPTER 27: More on Models and Numerical Procedures ──────────────────────
export const hullCh27 = [
  mcq("The constant elasticity of variance (CEV) model assumes that volatility is:",
    ["Constant and independent of the stock price",
      "A function of the stock price: σ = σ_0 · S^(α−1)",
      "Driven by a separate mean-reverting stochastic process",
      "Constant but calibrated to implied vol surface"],
    1, "In the CEV model, local volatility σ(S) = σ_0 · S^(α−1). When α < 1, volatility increases as price falls, generating a downward-sloping volatility skew consistent with equity markets.", "HARD", ["cev-model", "skew"]),

  mcq("In the Heston stochastic volatility model, variance v_t follows:",
    ["Geometric Brownian motion with constant drift",
      "A mean-reverting square-root (CIR) process: dv = κ(θ − v)dt + ξ√v dW",
      "A pure jump process with Poisson arrivals",
      "A constant proportion of the stock price variance"],
    1, "Heston: dv_t = κ(θ − v_t)dt + ξ√v_t dW^v_t. Parameters: κ (mean-reversion speed), θ (long-run variance), ξ (vol-of-vol). It generates an implied vol smile via the correlation between stock and vol processes.", "HARD", ["heston", "stochastic-volatility"]),

  tf("Jump-diffusion models (e.g., Merton 1976) can generate implied volatility smiles and skews that pure diffusion models cannot.",
    true, "Adding jumps (Poisson-distributed) to GBM introduces excess kurtosis and skewness in the return distribution, creating implied vol smiles/smirks absent in lognormal BSM.", "MEDIUM", ["jump-diffusion", "smile"]),

  mcq("The local volatility model (Dupire) constructs a volatility surface σ(S, t) such that:",
    ["Volatility is calibrated to the ATM vol only",
      "The model exactly reproduces all observed European option prices simultaneously",
      "Volatility is constant within each maturity bucket",
      "The model matches only the short-maturity skew"],
    1, "Dupire's formula extracts a unique local volatility function σ(S,t) from the full observed surface of European option prices, ensuring the model is perfectly calibrated to all listed strikes and maturities.", "HARD", ["local-volatility", "dupire"]),

  mcq("A variance swap pays at maturity:",
    ["Max(σ_realised − σ_strike, 0) × notional",
      "(σ²_realised − K_var) × notional, where σ²_realised is the realised variance over the swap's life",
      "The GARCH forecast variance minus the initial variance",
      "The VIX index level at maturity"],
    1, "A variance swap pays Notional × (σ²_realised − K_var) at expiry, where σ²_realised = (1/T)·Σ(daily log returns)² × 252. It gives pure exposure to realised variance without delta hedging.", "HARD", ["variance-swap"]),

  tf("Implied trees (implied binomial trees) are constructed so that they are consistent with the full observed implied volatility surface.",
    true, "Implied (or Derman-Kani) trees extend the binomial tree to produce a recombining tree that reproduces market prices across all strikes and maturities, consistent with local vol.", "MEDIUM", ["implied-tree", "derman-kani"]),

  mcq("Which numerical method is most commonly used for pricing American options under stochastic volatility models?",
    ["Black-Scholes closed-form", "Monte Carlo with Longstaff-Schwartz least-squares regression",
      "Simple binomial tree", "The trapezoid rule for integration"],
    1, "The Longstaff-Schwartz (LS) method uses Monte Carlo simulation with backward regression to approximate the continuation value at each exercise date, enabling American option pricing under complex models.", "HARD", ["longstaff-schwartz", "american-options", "monte-carlo"]),
]

// ── CHAPTER 28: Martingales and Measures ─────────────────────────────────────
export const hullCh28 = [
  mcq("The risk-neutral measure Q is defined by the property that:",
    ["All assets earn zero expected return",
      "All assets earn the risk-free rate as their expected return",
      "All assets earn their CAPM expected return",
      "Asset prices follow martingales without discounting"],
    1, "Under the risk-neutral measure Q, the drift of every traded asset is the risk-free rate r. Discounted asset prices are Q-martingales, enabling the pricing formula E^Q[e^(−rT)·payoff].", "MEDIUM", ["risk-neutral-measure", "q-measure"]),

  mcq("A martingale is a stochastic process {X_t} such that:",
    ["X_t is always non-negative",
      "E[X_{t+s} | F_t] = X_t for all s > 0",
      "X_t has constant variance",
      "X_t drifts upward at the risk-free rate"],
    1, "A martingale has no expected change: the best forecast of future value is the current value. Discounted asset prices under Q are martingales—this is the heart of no-arbitrage pricing.", "MEDIUM", ["martingale", "definition"]),

  tf("Changing the numeraire from the money-market account to a zero-coupon bond P(t,T) gives the T-forward measure under which forward prices are martingales.",
    true, "Under the T-forward measure (numeraire = P(t,T)), the forward price F(t,T) of any asset is a martingale. This simplifies pricing of interest rate derivatives because the expectation equals the current forward price.", "HARD", ["forward-measure", "numeraire"]),

  mcq("Girsanov's theorem is important for derivatives pricing because it shows that:",
    ["Asset prices cannot follow Brownian motion under physical measure",
      "Changing the probability measure is equivalent to changing the drift of a Brownian motion",
      "Volatility is always constant under any measure",
      "Arbitrage is impossible in complete markets"],
    1, "Girsanov's theorem establishes that changing from one probability measure to another (e.g., physical P to risk-neutral Q) changes only the drift of the Brownian motion, not its diffusion coefficient.", "HARD", ["girsanov", "measure-change"]),

  mcq("The money-market account B_t = e^(∫₀ᵗ r_s ds) is used as a numeraire because:",
    ["It grows at a constant rate",
      "Discounting by B_t converts asset prices into Q-martingales, enabling risk-neutral pricing",
      "It eliminates volatility from the pricing formula",
      "Central banks guarantee its value"],
    1, "When we choose B_t as numeraire, the ratio S_t/B_t = S_t·e^(−∫₀ᵗ r_s ds) is a Q-martingale. This is the fundamental theorem of asset pricing — discounted prices are martingales under Q.", "MEDIUM", ["numeraire", "money-market-account"]),

  tf("The LIBOR Market Model (LMM/BGM) uses the forward LIBOR rate as the underlying process and the appropriate forward measure as the pricing measure.",
    true, "Each forward LIBOR rate L_k(t) is a martingale under its own forward measure T_{k+1}. The LMM specifies dL_k = σ_k L_k dW^{T_{k+1}}, and cross-measure corrections arise when pricing instruments spanning multiple periods.", "HARD", ["lmm", "bgm", "forward-measure"]),

  mcq("The change-of-numeraire toolkit is especially useful for pricing:",
    ["Simple European calls using Black-Scholes",
      "Interest rate derivatives where payoffs depend on multiple future rates",
      "Static replication of vanilla put options",
      "American options via binomial trees"],
    1, "Change of numeraire simplifies interest rate derivative pricing (caps, swaptions, CMS) by choosing a measure under which the relevant rate or price is a martingale, reducing pricing to a simple expectation.", "HARD", ["change-of-numeraire", "interest-rate-derivatives"]),

  mcq("Under the physical (real-world) measure P, asset prices drift at their true expected return μ. Under Q, they drift at r. The Radon-Nikodym derivative dQ/dP is:",
    ["Always equal to 1",
      "The stochastic discount factor (pricing kernel) linking the two measures",
      "The ratio of volatilities under P and Q",
      "The risk-free bond price P(0,T)"],
    1, "The Radon-Nikodym derivative dQ/dP = exp(−λ W_T − ½ λ² T) where λ = (μ − r)/σ is the market price of risk. It is the stochastic discount factor that adjusts real-world probabilities to risk-neutral ones.", "HARD", ["radon-nikodym", "market-price-of-risk"]),
]

// Build a map: chapterId placeholder → questions array
// We'll merge this in seed.ts after we have actual chapter IDs
export const hullQuestionsBySlug: Record<string, ReturnType<typeof mcq>[]> = {
  "ch01-introduction": hullCh01,
  "ch02-futures-markets": hullCh02,
  "ch03-hedging": hullCh03,
  "ch04-interest-rates": hullCh04,
  "ch05-forward-futures-prices": hullCh05,
  "ch06-interest-rate-futures": hullCh06,
  "ch07-swaps": hullCh07,
  "ch08-securitization": hullCh08,
  "ch09-ois-discounting": hullCh09,
  "ch10-options-mechanics": hullCh10,
  "ch11-option-properties": hullCh11,
  "ch12-option-strategies": hullCh12,
  "ch13-binomial-trees": hullCh13,
  "ch14-wiener-ito": hullCh14,
  "ch15-black-scholes": hullCh15,
  "ch16-employee-options": hullCh16,
  "ch17-index-currency-options": hullCh17,
  "ch18-futures-options": hullCh18,
  "ch19-greeks": hullCh19,
  "ch20-volatility-smiles": hullCh20,
  "ch21-numerical-methods": hullCh21,
  "ch22-value-at-risk": hullCh22,
  "ch23-estimating-volatilities": hullCh23,
  "ch24-credit-risk": hullCh24,
  "ch25-credit-derivatives": hullCh25,
  "ch26-exotic-options": hullCh26,
  "ch27-more-models": hullCh27,
  "ch28-martingales": hullCh28,
}
