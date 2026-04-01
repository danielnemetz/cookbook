"use client";

import { useState } from "react";
import { IngredientGroup } from "@/lib/types";

function formatAmount(amount: number | null): string {
  if (amount === null) return "";
  if (amount === 0.25) return "¼";
  if (amount === 0.33) return "⅓";
  if (amount === 0.5) return "½";
  if (amount === 0.66) return "⅔";
  if (amount === 0.75) return "¾";
  if (amount === 0.125) return "⅛";
  if (Number.isInteger(amount)) return amount.toString();
  return amount.toLocaleString("de-DE");
}

export function IngredientList({ groups }: { groups: IngredientGroup[] }) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {groups.map((group, gi) => (
        <div key={gi}>
          {group.group && (
            <h4 className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">
              {group.group}
            </h4>
          )}
          <ul className="space-y-1">
            {group.items.map((item, ii) => {
              const key = `${gi}-${ii}`;
              const checked = checkedItems.has(key);
              return (
                <li key={key}>
                  <button
                    onClick={() => toggle(key)}
                    className={`w-full text-left flex items-start gap-3 py-1.5 px-2 rounded-lg hover:bg-accent-light/50 transition-colors ${
                      checked ? "opacity-50" : ""
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        checked
                          ? "bg-accent border-accent"
                          : "border-border"
                      }`}
                    >
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <span className={checked ? "line-through" : ""}>
                      {item.amount !== null && (
                        <span className="font-medium">
                          {formatAmount(item.amount)}
                          {item.unit ? ` ${item.unit}` : ""}{" "}
                        </span>
                      )}
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
