import { BudgetProvider, useBudget } from "./contexts/BudgetContext";
import { SummaryCards } from "./components/SummaryCards";
import { BudgetCharts } from "./components/BudgetCharts";
import { TransactionTable } from "./components/TransactionTable";
import { TransactionForm } from "./components/TransactionForm";
import { Wishlist } from "./components/Wishlist";
import { Toaster } from "@/components/ui/sonner";
import { Wallet, LayoutDashboard, History, Settings, ListTodo } from "lucide-react";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function App() {
  return (
    <BudgetProvider>
      <DashboardContent />
      <Toaster position="top-right" closeButton />
    </BudgetProvider>
  );
}

function DashboardContent() {
  const { loading } = useBudget();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C1E] selection:bg-primary/10">
      {/* Sidebar - Desktop Only */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-slate-200 bg-white lg:block z-50">
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-primary p-2 rounded-xl text-primary-foreground">
              <Wallet size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">BudgetFlow</span>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem icon={LayoutDashboard} label="Dashboard" active />
            <NavItem icon={History} label="Transactions" />
            <NavItem icon={ListTodo} label="Wishlist" />
            <NavItem icon={Settings} label="Settings" />
          </nav>

          <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Pro Plan</p>
            <p className="text-sm text-slate-600 mb-4">Get detailed reports and AI insights.</p>
            <button className="w-full py-2 bg-white border border-slate-200 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 md:p-8 lg:p-12 max-w-[1440px] mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold tracking-tight"
            >
              Welcome back, Akmal
            </motion.h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your money today.</p>
          </div>
          <div className="flex items-center gap-3">
            <TransactionForm />
          </div>
        </header>

        {loading ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-[400px] w-full rounded-2xl" />
              <Skeleton className="h-[400px] w-full rounded-2xl" />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Overview Section */}
            <section>
              <SummaryCards />
            </section>

            {/* Charts Section */}
            <section>
              <BudgetCharts />
            </section>

            {/* Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <TransactionTable />
              </div>
              <div className="h-full">
                <Wishlist />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
        active 
          ? "bg-primary/5 text-primary" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <Icon size={20} />
      {label}
    </button>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
