import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBudget } from "@/contexts/BudgetContext";
import { Wallet, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { motion } from "motion/react";

export const SummaryCards = () => {
  const { summary } = useBudget();

  const cards = [
    {
      title: "Total Balance",
      value: summary.balance,
      icon: Wallet,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Total Income",
      value: summary.totalIncome,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: "Total Expenses",
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: "text-rose-600",
      bg: "bg-rose-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {card.title}
              </CardTitle>
              <div className={`${card.bg} ${card.color} p-2 rounded-xl`}>
                <card.icon size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">
                Rp {card.value.toLocaleString('id-ID')}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
