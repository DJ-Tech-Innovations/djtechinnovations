import {
  Globe, Boxes, Smartphone, Puzzle, Workflow, Wrench, Layers, Zap, Sprout, Store, Factory, HardHat,
  Briefcase, Target, Users, CheckCircle2, TrendingUp, HelpCircle, type LucideProps,
} from "lucide-react";

const map = {
  globe: Globe, boxes: Boxes, smartphone: Smartphone, puzzle: Puzzle, workflow: Workflow, wrench: Wrench,
  layers: Layers, zap: Zap, sprout: Sprout, store: Store, factory: Factory, "hard-hat": HardHat,
  briefcase: Briefcase, target: Target, users: Users, "check-circle": CheckCircle2,
  "trending-up": TrendingUp, "help-circle": HelpCircle,
} as const;

export function Icon({ name, ...p }: { name: string } & LucideProps) {
  const C = map[name as keyof typeof map] ?? Puzzle;
  return <C aria-hidden="true" strokeWidth={1.75} {...p} />;
}
