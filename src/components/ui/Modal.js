"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function Modal({ open, onOpenChange, title, description, children, trigger, className }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={className}>
        <AnimatePresence mode="wait">
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              {title && <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>}
              {description && <DialogDescription className="text-sm leading-relaxed">{description}</DialogDescription>}
            </DialogHeader>
            {children}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
