import ScenarioCard from './ScenarioCard';
import { scenarios } from '@/data/scenarios';

interface ScenariosSectionProps {
  onSelectScenario: (scenarioId: string) => void;
}

const ScenariosSection = ({ onSelectScenario }: ScenariosSectionProps) => {
  return (
    <section className="py-20 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            اختر السيناريو
          </h2>
          <p className="text-muted-foreground text-lg">
            وين بدك تجرب حظك بالواسطة؟ 🤔
          </p>
        </div>

        {/* Scenarios grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((scenario, index) => (
            <ScenarioCard
              key={scenario.id}
              icon={scenario.icon}
              title={scenario.title}
              description={scenario.description}
              onClick={() => onSelectScenario(scenario.id)}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScenariosSection;
