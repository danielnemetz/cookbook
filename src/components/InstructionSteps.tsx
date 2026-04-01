export function InstructionSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <p className="text-foreground leading-relaxed pt-0.5">{step}</p>
        </li>
      ))}
    </ol>
  );
}
