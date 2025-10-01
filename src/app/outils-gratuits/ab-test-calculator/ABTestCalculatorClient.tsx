"use client";

import PreFooter from "@/components/footer/PreFooter";
import ScrollToTop from "@/components/ui/ScrollToTop";
import StickyShareButtons from "@/components/ui/StickyShareButtons";
import { colors as theme } from "@/config/theme";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ABTestCalculatorClient() {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/jstat@latest/dist/jstat.min.js";
    script.async = true;
    script.onload = () => {
      // Initialize calculator after jStat is loaded
      const calculatorScript = document.createElement("script");
      calculatorScript.textContent = calculatorCode;
      document.body.appendChild(calculatorScript);
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className={cn("min-h-screen", isDark ? "bg-black" : "bg-white")}>
      {/* Fixed halo background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 h-[45vh] z-0"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.20) 0%, rgba(212,237,49,0.12) 15%, rgba(212,237,49,0.06) 35%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 75%)`
            : `radial-gradient(ellipse at center 20%, rgba(212,237,49,0.25) 0%, rgba(212,237,49,0.15) 18%, rgba(212,237,49,0.08) 38%, rgba(255,255,255,0.1) 58%, rgba(255,255,255,0) 78%)`,
          filter: 'blur(20px)'
        }}
      />

      <section className="w-full max-w-[100vw] pt-40 pb-16 md:pb-24 relative overflow-hidden">

      {/* Content */}
      <div
        className={cn(
          "max-w-[1250px] mx-auto py-8 md:py-12 relative z-10 rounded-2xl border",
          isDark ? "border-white/10" : "border-black/5"
        )}
        style={{ width: '100%' }}
      >
        {/* Background pattern to match parent page */}
        <div className="absolute inset-0 rounded-2xl -z-10">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
              opacity: isDark ? "0.25" : "0.04"
            }}
          />
        </div>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 px-4 sm:px-6">
          <span
            className={cn(
              "text-base mb-4 block font-semibold",
              isDark ? "text-[#E0FF5C]" : "text-black"
            )}
          >
            A/B Testing Calculator
          </span>
          <h1
            className={cn(
              "text-3xl md:text-5xl font-normal mb-4",
              isDark ? "text-white" : "text-black"
            )}
          >
            Calculez la signification statistique
            <br />
            de vos tests A/B
          </h1>
          <div
            className={cn(
              "w-12 h-0.5 mx-auto mb-4",
              isDark ? "bg-[#E0FF5C]" : "bg-black"
            )}
          />
          <p
            className={cn(
              "text-base md:text-lg",
              isDark ? "text-white/100" : "text-black"
            )}
          >
            Prenez des décisions basées sur les données
            <br />
            avec une confiance statistique
          </p>
        </div>

        {/* Calculator Section */}
        <div className="mb-16 px-4 sm:px-6">
          <div
            className={cn(
              "rounded-3xl p-8",
              isDark ? "bg-black/40" : "bg-white/40",
              "backdrop-blur-md",
              isDark ? "border border-white/10" : "border border-black/5",
              isDark
                ? "shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
                : "shadow-[0_0_0_1px_rgba(0,0,0,0.03)]"
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3
                  className={cn(
                    "text-2xl font-bold mb-6",
                    isDark ? "text-white" : "text-black"
                  )}
                >
                  Données d'entrée
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      Visiteurs (Contrôle)
                    </label>
                    <input
                      type="number"
                      id="control-visitors"
                      className={cn(
                        "w-full px-4 py-2 rounded-lg",
                        isDark
                          ? "bg-white/5 text-white"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10",
                        "focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]"
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      Conversions (Contrôle)
                    </label>
                    <input
                      type="number"
                      id="control-conversions"
                      className={cn(
                        "w-full px-4 py-2 rounded-lg",
                        isDark
                          ? "bg-white/5 text-white"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10",
                        "focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]"
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      Visiteurs (Variante)
                    </label>
                    <input
                      type="number"
                      id="variant-visitors"
                      className={cn(
                        "w-full px-4 py-2 rounded-lg",
                        isDark
                          ? "bg-white/5 text-white"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10",
                        "focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]"
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      Conversions (Variante)
                    </label>
                    <input
                      type="number"
                      id="variant-conversions"
                      className={cn(
                        "w-full px-4 py-2 rounded-lg",
                        isDark
                          ? "bg-white/5 text-white"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10",
                        "focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]"
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      Niveau de confiance (%)
                    </label>
                    <input
                      type="number"
                      id="confidence-level"
                      defaultValue="95"
                      className={cn(
                        "w-full px-4 py-2 rounded-lg",
                        isDark
                          ? "bg-white/5 text-white"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10",
                        "focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]"
                      )}
                    />
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        isDark ? "text-white/60" : "text-black/60"
                      )}
                    >
                      Valeur recommandée : 95%
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // @ts-ignore
                      window.fetchFormAndCalculate();
                    }}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg text-lg font-semibold",
                      "bg-[#E0FF5C] text-black",
                      "hover:bg-[#E0FF5C]/90 transition-colors"
                    )}
                  >
                    Calculer
                  </button>
                </div>
              </div>

              <div>
                <h3
                  className={cn(
                    "text-2xl font-bold mb-6",
                    isDark ? "text-white" : "text-black"
                  )}
                >
                  Résultats
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      Taux de conversion (Contrôle)
                    </label>
                    <div
                      className={cn(
                        "w-full px-4 py-3 rounded-lg text-lg font-semibold",
                        isDark
                          ? "bg-white/5 text-[#E0FF5C]"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10"
                      )}
                      id="conversion-rate-control"
                    >
                      -
                    </div>
                  </div>
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      Taux de conversion (Variante)
                    </label>
                    <div
                      className={cn(
                        "w-full px-4 py-3 rounded-lg text-lg font-semibold",
                        isDark
                          ? "bg-white/5 text-[#E0FF5C]"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10"
                      )}
                      id="conversion-rate-variant"
                    >
                      -
                    </div>
                  </div>
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      Amélioration (%)
                    </label>
                    <div
                      className={cn(
                        "w-full px-4 py-3 rounded-lg text-lg font-semibold",
                        isDark
                          ? "bg-white/5 text-[#E0FF5C]"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10"
                      )}
                      id="lift"
                    >
                      -
                    </div>
                  </div>
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      Différence absolue
                    </label>
                    <div
                      className={cn(
                        "w-full px-4 py-3 rounded-lg text-lg font-semibold",
                        isDark
                          ? "bg-white/5 text-[#E0FF5C]"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10"
                      )}
                      id="absolute-difference"
                    >
                      -
                    </div>
                  </div>
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      P-Value (Unilatéral)
                    </label>
                    <div
                      className={cn(
                        "w-full px-4 py-3 rounded-lg text-lg font-semibold",
                        isDark
                          ? "bg-white/5 text-[#E0FF5C]"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10"
                      )}
                      id="p-value"
                    >
                      -
                    </div>
                  </div>
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      Significativité
                    </label>
                    <div
                      className={cn(
                        "w-full px-4 py-3 rounded-lg text-lg font-semibold",
                        isDark
                          ? "bg-white/5 text-[#E0FF5C]"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10"
                      )}
                      id="significance"
                    >
                      -
                    </div>
                  </div>
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-black/80"
                      )}
                    >
                      Probabilité de victoire (Variante)
                    </label>
                    <div
                      className={cn(
                        "w-full px-4 py-3 rounded-lg text-lg font-semibold",
                        isDark
                          ? "bg-white/5 text-[#E0FF5C]"
                          : "bg-black/5 text-black",
                        "border",
                        isDark ? "border-white/10" : "border-black/10"
                      )}
                      id="bayesian-variant-wins"
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16 px-4 sm:px-6">
          <h2
            className={cn(
              "text-2xl md:text-3xl font-bold mb-8 text-center",
              isDark ? "text-white" : "text-black"
            )}
          >
            Questions Fréquentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={cn(
                "rounded-3xl p-6",
                isDark ? "bg-black/50" : "bg-white/50"
              )}
            >
              <h3
                className={cn(
                  "text-xl font-semibold mb-4",
                  isDark ? "text-white" : "text-black"
                )}
              >
                Qu'est-ce que la signification statistique ?
              </h3>
              <p
                className={cn(
                  "text-base",
                  isDark ? "text-white/70" : "text-black/70"
                )}
              >
                La signification statistique indique si les différences
                observées entre vos variantes sont dues au hasard ou
                représentent un véritable effet. Un résultat est généralement
                considéré comme significatif lorsque la p-value est inférieure à
                0,05.
              </p>
            </div>
            <div
              className={cn(
                "rounded-3xl p-6",
                isDark ? "bg-black/50" : "bg-white/50"
              )}
            >
              <h3
                className={cn(
                  "text-xl font-semibold mb-4",
                  isDark ? "text-white" : "text-black"
                )}
              >
                Comment interpréter la p-value ?
              </h3>
              <p
                className={cn(
                  "text-base",
                  isDark ? "text-white/70" : "text-black/70"
                )}
              >
                La p-value représente la probabilité d'observer une différence
                aussi grande ou plus grande que celle observée, si en réalité il
                n'y avait aucune différence. Plus la p-value est petite, plus le
                résultat est statistiquement significatif.
              </p>
            </div>
            <div
              className={cn(
                "rounded-3xl p-6",
                isDark ? "bg-black/50" : "bg-white/50"
              )}
            >
              <h3
                className={cn(
                  "text-xl font-semibold mb-4",
                  isDark ? "text-white" : "text-black"
                )}
              >
                Qu'est-ce que l'analyse bayésienne ?
              </h3>
              <p
                className={cn(
                  "text-base",
                  isDark ? "text-white/70" : "text-black/70"
                )}
              >
                L'analyse bayésienne fournit une approche alternative à
                l'analyse fréquentiste traditionnelle. Elle calcule directement
                la probabilité qu'une variante soit meilleure que l'autre, en
                tenant compte des données observées et des connaissances
                préalables.
              </p>
            </div>
            <div
              className={cn(
                "rounded-3xl p-6",
                isDark ? "bg-black/50" : "bg-white/50"
              )}
            >
              <h3
                className={cn(
                  "text-xl font-semibold mb-4",
                  isDark ? "text-white" : "text-black"
                )}
              >
                Quel niveau de confiance choisir ?
              </h3>
              <p
                className={cn(
                  "text-base",
                  isDark ? "text-white/70" : "text-black/70"
                )}
              >
                Un niveau de confiance de 95% est généralement recommandé pour
                les tests A/B. Cela signifie que vous avez 95% de chances que
                vos résultats soient statistiquement significatifs et non dus au
                hasard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PreFooter Section */}
      <div className="relative z-10 w-full overflow-hidden pt-16 pb-16">
        <div className="max-w-[1250px] mx-auto px-4">
          <PreFooter noBgGradient />
        </div>
      </div>

      {/* UI Elements */}
      <ScrollToTop />
      <StickyShareButtons url={shareUrl} title="A/B Testing Calculator" />
      </section>
    </div>
  );
}

const calculatorCode = `
  function erf(x) {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
    const sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }

  function cumulativeStandardNormal(Z) {
    return (1.0 + erf(Z / Math.sqrt(2))) / 2;
  }

  function validateInputs(controlVisitors, controlConversions, variantVisitors, variantConversions) {
    if (controlVisitors <= 0 || variantVisitors <= 0) {
      throw new Error("Le nombre de visiteurs doit être supérieur à 0.");
    }
    if (controlConversions < 0 || variantConversions < 0) {
      throw new Error("Le nombre de conversions ne peut pas être négatif.");
    }
    if (controlConversions > controlVisitors) {
      throw new Error("Le nombre de conversions ne peut pas être supérieur au nombre de visiteurs (groupe contrôle).");
    }
    if (variantConversions > variantVisitors) {
      throw new Error("Le nombre de conversions ne peut pas être supérieur au nombre de visiteurs (groupe variant).");
    }
  }

  function calculatePValue(controlConversions, controlVisitors, variantConversions, variantVisitors, isOneSided = true) {
    validateInputs(controlConversions, controlVisitors, variantConversions, variantVisitors);

    const conversionRateControl = controlConversions / controlVisitors;
    const conversionRateVariant = variantConversions / variantVisitors;
    const pooledConversionRate = (controlConversions + variantConversions) / (controlVisitors + variantVisitors);

    // Si les taux sont identiques, retourner un p-value de 1
    if (conversionRateControl === conversionRateVariant) {
      return {
        zScore: 0,
        pValue: 1,
        isSignificant: false
      };
    }

    const pooledSE = Math.sqrt(
      pooledConversionRate * (1 - pooledConversionRate) * (1 / controlVisitors + 1 / variantVisitors)
    );

    // Si l'erreur standard est très proche de zéro, utiliser une petite valeur
    const minSE = 1e-10;
    const adjustedPooledSE = pooledSE < minSE ? minSE : pooledSE;

    const zScore = (conversionRateVariant - conversionRateControl) / adjustedPooledSE;
    let pValue;

    if (isOneSided) {
      pValue = 1 - jStat.normal.cdf(zScore, 0, 1);
    } else {
      pValue = 2 * (1 - jStat.normal.cdf(Math.abs(zScore), 0, 1));
    }

    pValue = Math.min(Math.max(pValue, 0), 1);
    return { zScore, pValue, isSignificant: pValue < 0.05 };
  }

  function calculateBayesianProbability(controlConversions, controlVisitors, variantConversions, variantVisitors, simulations = 100000) {
    const alphaPrior = 8;
    const betaPrior = 42;
    const controlPosteriorAlpha = alphaPrior + controlConversions;
    const controlPosteriorBeta = betaPrior + (controlVisitors - controlConversions);
    const variantPosteriorAlpha = alphaPrior + variantConversions;
    const variantPosteriorBeta = betaPrior + (variantVisitors - variantConversions);
    let variantWins = 0;
    for (let i = 0; i < simulations; i++) {
      const controlSample = jStat.beta.sample(controlPosteriorAlpha, controlPosteriorBeta);
      const variantSample = jStat.beta.sample(variantPosteriorAlpha, variantPosteriorBeta);
      if (variantSample > controlSample) {
        variantWins++;
      }
    }
    const probabilityVariantWins = variantWins / simulations;
    const probabilityControlWins = 1 - probabilityVariantWins;
    const lnMlH1 = jStat.betaln(controlConversions + alphaPrior, controlVisitors - controlConversions + betaPrior) -
      jStat.betaln(alphaPrior, betaPrior) +
      jStat.betaln(variantConversions + alphaPrior, variantVisitors - variantConversions + betaPrior) -
      jStat.betaln(alphaPrior, betaPrior);
    const totalConversions = controlConversions + variantConversions;
    const totalVisitors = controlVisitors + variantVisitors;
    const lnMlH0 = jStat.betaln(totalConversions + alphaPrior, totalVisitors - totalConversions + betaPrior) -
      jStat.betaln(alphaPrior, betaPrior);
    const lnBF10 = lnMlH1 - lnMlH0;
    let BF10 = Math.exp(lnBF10);
    if (!isFinite(BF10)) {
      BF10 = lnBF10 > 0 ? Infinity : 0;
    }
    return { probabilityVariantWins, probabilityControlWins, bayesFactor: BF10 };
  }

  function fetchFormAndCalculate() {
    try {
      const controlVisitors = Number(document.getElementById('control-visitors').value);
      const controlConversions = Number(document.getElementById('control-conversions').value);
      const variantVisitors = Number(document.getElementById('variant-visitors').value);
      const variantConversions = Number(document.getElementById('variant-conversions').value);
      const confidenceLevelInput = Number(document.getElementById('confidence-level').value);
      
      if (isNaN(controlVisitors) || isNaN(controlConversions) || 
          isNaN(variantVisitors) || isNaN(variantConversions) || 
          isNaN(confidenceLevelInput)) {
        throw new Error("Veuillez remplir tous les champs avec des nombres valides.");
      }

      if (confidenceLevelInput <= 0 || confidenceLevelInput >= 100) {
        throw new Error("Le niveau de confiance doit être compris entre 0 et 100.");
      }

      const conversionRateControl = (controlConversions / controlVisitors) * 100;
      const conversionRateVariant = (variantConversions / variantVisitors) * 100;
      const lift = ((conversionRateVariant - conversionRateControl) / conversionRateControl) * 100;
      const absoluteDifference = conversionRateVariant - conversionRateControl;

      const pValueResult = calculatePValue(controlConversions, controlVisitors, variantConversions, variantVisitors);
      const pValueResultTwoSided = calculatePValue(controlConversions, controlVisitors, variantConversions, variantVisitors, false);

      const standardError = Math.sqrt(
        (conversionRateControl * (100 - conversionRateControl)) / controlVisitors +
        (conversionRateVariant * (100 - conversionRateVariant)) / variantVisitors
      );

      const zScore = pValueResult.zScore;
      const criticalValue = jStat.normal.inv(confidenceLevelInput / 100, 0, 1);
      
      const marginOfError = criticalValue * standardError;
      const ciLower = absoluteDifference - marginOfError;
      const ciUpper = absoluteDifference + marginOfError;

      const bayesianResults = calculateBayesianProbability(
        controlConversions,
        controlVisitors,
        variantConversions,
        variantVisitors
      );

      // Update results
      document.getElementById('conversion-rate-control').innerText = conversionRateControl.toFixed(2) + '%';
      document.getElementById('conversion-rate-variant').innerText = conversionRateVariant.toFixed(2) + '%';
      document.getElementById('lift').innerText = lift.toFixed(2) + '%';
      document.getElementById('absolute-difference').innerText = absoluteDifference.toFixed(2) + '%';
      document.getElementById('confidence-interval-diff').innerText = ciLower.toFixed(2) + '% to ' + ciUpper.toFixed(2) + '%';
      document.getElementById('right-sided-interval').innerText = ciLower.toFixed(2) + '% to ∞';
      document.getElementById('left-sided-interval').innerText = '-∞ to ' + ciUpper.toFixed(2) + '%';
      document.getElementById('value-plus-minus-SE').innerText = absoluteDifference.toFixed(2) + ' ± ' + standardError.toFixed(2) + '%';
      document.getElementById('p-value').innerText = pValueResult.pValue.toFixed(6);
      document.getElementById('p-value-two-sided').innerText = pValueResultTwoSided.pValue.toFixed(6);
      document.getElementById('z-score').innerText = zScore.toFixed(2);
      document.getElementById('significance').innerText = pValueResult.pValue < (1 - confidenceLevelInput / 100) ? 'Significatif' : 'Non significatif';
      document.getElementById('bayesian-variant-wins').innerText = (bayesianResults.probabilityVariantWins * 100).toFixed(2) + '%';
      document.getElementById('bayesian-control-wins').innerText = (bayesianResults.probabilityControlWins * 100).toFixed(2) + '%';
      document.getElementById('bayes-factor').innerText = bayesianResults.bayesFactor.toFixed(2);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  window.fetchFormAndCalculate = fetchFormAndCalculate;
`;
