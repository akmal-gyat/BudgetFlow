import React, { useState } from "react";
import { useBudget } from "@/contexts/BudgetContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Wishlist = () => {
  const { wishlist, addWishlistItem, updateWishlistItem, deleteWishlistItem } = useBudget();
  const [newItemName, setNewItemName] = useState("");
  const [newItemAmount, setNewItemAmount] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemAmount) return;
    await addWishlistItem({
      name: newItemName,
      amount: Number(newItemAmount),
      status: 'pending',
      category: 'Wishlist'
    });
    setNewItemName("");
    setNewItemAmount("");
  };

  return (
    <Card className="border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          Wishlist & Goals
          <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
            {wishlist.filter(i => i.status === 'completed').length} / {wishlist.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <Input 
            placeholder="Item name..." 
            value={newItemName} 
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-1"
          />
          <Input 
            type="number" 
            placeholder="Amount" 
            value={newItemAmount} 
            onChange={(e) => setNewItemAmount(e.target.value)}
            className="w-24 px-2"
          />
          <Button type="submit" size="icon" disabled={!newItemName}>
            <Plus size={18} />
          </Button>
        </form>

        <div className="space-y-3">
          <AnimatePresence>
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border transition-colors",
                  item.status === 'completed' ? "bg-emerald-50 border-emerald-100" : "bg-white border-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => updateWishlistItem(item.id, { status: item.status === 'completed' ? 'pending' : 'completed' })}
                    className={cn(
                      "transition-colors",
                      item.status === 'completed' ? "text-emerald-500" : "text-slate-300 hover:text-slate-400"
                    )}
                  >
                    {item.status === 'completed' ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>
                  <div>
                    <div className={cn(
                      "font-medium text-sm",
                      item.status === 'completed' && "line-through text-emerald-700/60"
                    )}>
                      {item.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Rp {item.amount.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteWishlistItem(item.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-rose-600"
                >
                  <Trash2 size={14} />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
          {wishlist.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm italic">
              No wishes yet. Dream big!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
