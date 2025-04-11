'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import jStat from 'jstat';

interface MDECalculatorProps {
  isDark?: boolean;
}

export default function MDECalculator({ isDark = false }: MDECalculatorProps) {
  const [confidenceLevel, setConfidenceLevel] = useState('95');
  const [powerLevel, setPowerLevel] = useState('80');
  const [conversionRate, setConversionRate] = useState('10');
  const [mde, setMde] = useState('20');
  const [variants, setVariants] = useState('1');
  const [weeklyTraffic, setWeeklyTraffic] = useState('1000');
  const [isRelative, setIsRelative] = useState(true);
  const [isOneSided, setIsOneSided] = useState(true);

  // Fonction pour convertir le niveau de confiance en score Z
  const getConfidenceZScore = (confidence: number): number => {
    // Table approximative des valeurs Z courantes pour la confiance
    const confidenceTable: { [key: number]: number } = {
      0.80: 1.282,
      0.85: 1.440,
      0.90: 1.645,
      0.95: 1.960,
      0.99: 2.576,
      0.999: 3.291
    };

    // Arrondir à la valeur la plus proche dans la table
    const confidenceDecimal = confidence / 100;
    const closest = Object.keys(confidenceTable)
      .map(Number)
      .reduce((prev, curr) => 
        Math.abs(curr - confidenceDecimal) < Math.abs(prev - confidenceDecimal) ? curr : prev
      );

    return confidenceTable[closest];
  };

  // Fonction pour convertir le niveau de puissance en score Z
  const getPowerZScore = (power: number): number => {
    // Table approximative des valeurs Z courantes pour la puissance
    const powerTable: { [key: number]: number } = {
      0.70: 0.524,
      0.75: 0.674,
      0.80: 0.842,
      0.85: 1.036,
      0.90: 1.282,
      0.95: 1.645,
      0.99: 2.326
    };

    // Arrondir à la valeur la plus proche dans la table
    const powerDecimal = power / 100;
    const closest = Object.keys(powerTable)
      .map(Number)
      .reduce((prev, curr) => 
        Math.abs(curr - powerDecimal) < Math.abs(prev - powerDecimal) ? curr : prev
      );

    return powerTable[closest];
  };

  const calculateSampleSize = () => {
    // Validation des entrées
    if (!confidenceLevel || !powerLevel || !conversionRate || !mde || !variants || !weeklyTraffic) {
      console.log('Valeurs manquantes:', { confidenceLevel, powerLevel, conversionRate, mde, variants, weeklyTraffic });
      return {
        sampleSizePerGroup: 0,
        totalSampleSize: 0,
        estimatedDuration: 0
      };
    }

    // Conversion des valeurs en nombres
    const confidence = parseFloat(confidenceLevel) / 100;
    const power = parseFloat(powerLevel) / 100;
    const conversion = parseFloat(conversionRate) / 100;
    const mdeValue = parseFloat(mde) / 100;
    const variantsCount = parseInt(variants);
    const traffic = parseInt(weeklyTraffic);

    // Validation des valeurs converties
    if (isNaN(confidence) || isNaN(power) || isNaN(conversion) || isNaN(mdeValue) || isNaN(variantsCount) || isNaN(traffic)) {
      console.log('Erreur de conversion:', { confidence, power, conversion, mdeValue, variantsCount, traffic });
      return {
        sampleSizePerGroup: 0,
        totalSampleSize: 0,
        estimatedDuration: 0
      };
    }

    // Validation des plages de valeurs
    if (confidence <= 0 || confidence > 1 || power <= 0 || power > 1 || conversion <= 0 || conversion > 1 || mdeValue <= 0 || variantsCount < 1 || traffic < 1) {
      console.log('Valeurs hors limites:', { confidence, power, conversion, mdeValue, variantsCount, traffic });
      return {
        sampleSizePerGroup: 0,
        totalSampleSize: 0,
        estimatedDuration: 0
      };
    }

    // Calcul de la taille d'échantillon par groupe
    const alpha = 1.0 - (parseFloat(confidenceLevel) / 100);
    
    // Appliquer la correction de Bonferroni
    const adjustedAlpha = alpha / parseInt(variants);
    
    // Calculer zAlpha en fonction du test unilatéral/bilatéral
    const zAlpha = isOneSided 
      ? -jStat.normal.inv(adjustedAlpha, 0, 1)
      : -jStat.normal.inv(adjustedAlpha / 2, 0, 1);
    
    const zBeta = -jStat.normal.inv(1 - (parseFloat(powerLevel) / 100), 0, 1);

    let p1 = conversion;
    let p2 = isRelative ? conversion * (1 + mdeValue) : conversion + mdeValue;
    
    // Ajustement si le taux de conversion est supérieur à 50%
    if (p1 > 0.5) {
      p1 = 1.0 - p1;
      p2 = 1.0 - p2;
    }

    const delta = p2 - p1;
    
    // Calcul des écarts-types pour les groupes de contrôle et de test
    const sd1 = Math.sqrt(2 * p1 * (1 - p1));
    const sd2 = Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2));

    const sampleSizePerGroup = Math.ceil(
      Math.pow((zAlpha * sd1 + zBeta * sd2), 2) / Math.pow(delta, 2)
    );

    console.log('Résultat du calcul:', { 
      sampleSizePerGroup,
      p1,
      p2,
      delta,
      sd1,
      sd2,
      zAlpha,
      zBeta,
      adjustedAlpha
    });

    const totalSampleSize = sampleSizePerGroup * (variantsCount + 1);
    const estimatedDuration = Math.ceil(totalSampleSize / traffic);

    return {
      sampleSizePerGroup,
      totalSampleSize,
      estimatedDuration
    };
  };

  const results = calculateSampleSize();

  return (
    <div className={cn(
      "rounded-3xl p-8",
      isDark ? "bg-black/40" : "bg-white/40",
      "backdrop-blur-md",
      isDark ? "border border-white/10" : "border border-black/5",
      isDark ? "shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" : "shadow-[0_0_0_1px_rgba(0,0,0,0.03)]"
    )}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Data Input Section */}
        <div className="space-y-6">
          <h3 className={cn(
            "text-2xl font-bold mb-6",
            isDark ? "text-white" : "text-black"
          )}>
            Données d'entrée
          </h3>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Niveau de confiance (%)
              </label>
              <input
                type="number"
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(e.target.value)}
                min="0"
                max="100"
                step="0.1"
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  isDark ? "bg-white/5 text-white" : "bg-black/5 text-black",
                  "border",
                  isDark ? "border-white/10" : "border-black/10",
                  "focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]"
                )}
              />
              <p className={cn(
                "mt-1 text-xs",
                isDark ? "text-white/60" : "text-black/60"
              )}>
                Valeur recommandée : 95%
              </p>
            </div>

            <div>
              <label className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Niveau de puissance (%)
              </label>
              <input
                type="number"
                value={powerLevel}
                onChange={(e) => setPowerLevel(e.target.value)}
                min="0"
                max="100"
                step="0.1"
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  isDark ? "bg-white/5 text-white" : "bg-black/5 text-black",
                  "border",
                  isDark ? "border-white/10" : "border-black/10",
                  "focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]"
                )}
              />
              <p className={cn(
                "mt-1 text-xs",
                isDark ? "text-white/60" : "text-black/60"
              )}>
                Valeur recommandée : 80%
              </p>
            </div>

            <div>
              <label className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Taux de conversion actuel (%)
              </label>
              <input
                type="number"
                value={conversionRate}
                onChange={(e) => setConversionRate(e.target.value)}
                min="0"
                max="100"
                step="0.1"
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  isDark ? "bg-white/5 text-white" : "bg-black/5 text-black",
                  "border",
                  isDark ? "border-white/10" : "border-black/10",
                  "focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]"
                )}
              />
            </div>

            <div>
              <label className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Effet minimum détectable (%)
              </label>
              <input
                type="number"
                value={mde}
                onChange={(e) => setMde(e.target.value)}
                min="0"
                step="0.1"
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  isDark ? "bg-white/5 text-white" : "bg-black/5 text-black",
                  "border",
                  isDark ? "border-white/10" : "border-black/10",
                  "focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]"
                )}
              />
            </div>

            <div>
              <label className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Nombre de variantes
              </label>
              <input
                type="number"
                value={variants}
                onChange={(e) => setVariants(e.target.value)}
                min="1"
                step="1"
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  isDark ? "bg-white/5 text-white" : "bg-black/5 text-black",
                  "border",
                  isDark ? "border-white/10" : "border-black/10",
                  "focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]"
                )}
              />
            </div>

            <div>
              <label className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Trafic hebdomadaire
              </label>
              <input
                type="number"
                value={weeklyTraffic}
                onChange={(e) => setWeeklyTraffic(e.target.value)}
                min="1"
                step="1"
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  isDark ? "bg-white/5 text-white" : "bg-black/5 text-black",
                  "border",
                  isDark ? "border-white/10" : "border-black/10",
                  "focus:outline-none focus:ring-2 focus:ring-[#E0FF5C]"
                )}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isRelative"
                  checked={isRelative}
                  onChange={(e) => setIsRelative(e.target.checked)}
                  className="w-4 h-4 text-[#E0FF5C] focus:ring-[#E0FF5C] border-gray-300 rounded"
                />
                <label
                  htmlFor="isRelative"
                  className={cn(
                    "ml-2 text-sm",
                    isDark ? "text-white/80" : "text-black/80"
                  )}
                >
                  L'effet minimum est relatif
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isOneSided"
                  checked={isOneSided}
                  onChange={(e) => setIsOneSided(e.target.checked)}
                  className="w-4 h-4 text-[#E0FF5C] focus:ring-[#E0FF5C] border-gray-300 rounded"
                />
                <label
                  htmlFor="isOneSided"
                  className={cn(
                    "ml-2 text-sm",
                    isDark ? "text-white/80" : "text-black/80"
                  )}
                >
                  Test unilatéral
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h3 className={cn(
            "text-2xl font-bold mb-6",
            isDark ? "text-white" : "text-black"
          )}>
            Résultats
          </h3>

          <div className="space-y-4">
            <div>
              <label className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Taille d'échantillon par groupe
              </label>
              <div className={cn(
                "w-full px-4 py-3 rounded-lg text-lg font-semibold",
                isDark ? "bg-white/5 text-[#E0FF5C]" : "bg-black/5 text-black",
                "border",
                isDark ? "border-white/10" : "border-black/10"
              )}>
                {results.sampleSizePerGroup.toLocaleString()}
              </div>
            </div>

            <div>
              <label className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Taille d'échantillon totale
              </label>
              <div className={cn(
                "w-full px-4 py-3 rounded-lg text-lg font-semibold",
                isDark ? "bg-white/5 text-[#E0FF5C]" : "bg-black/5 text-black",
                "border",
                isDark ? "border-white/10" : "border-black/10"
              )}>
                {results.totalSampleSize.toLocaleString()}
              </div>
            </div>

            <div>
              <label className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-white/80" : "text-black/80"
              )}>
                Durée estimée (semaines)
              </label>
              <div className={cn(
                "w-full px-4 py-3 rounded-lg text-lg font-semibold",
                isDark ? "bg-white/5 text-[#E0FF5C]" : "bg-black/5 text-black",
                "border",
                isDark ? "border-white/10" : "border-black/10"
              )}>
                {results.estimatedDuration}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 