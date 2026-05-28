"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-kiln-navy px-6 py-3 text-sm font-medium text-kiln-cream shadow-lg"
          role="status"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
