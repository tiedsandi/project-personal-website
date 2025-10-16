"use client";

import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {Link} from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const Card = ({ data }) => {
  const { name, company, imgName, date, linkGithub, description, tags, fitur } =
    data;
  const t = useTranslations("Card");

  return (
    <Dialog>
      {/* Trigger Card */}
      <DialogTrigger className="group w-full sm:w-[calc(50%-1rem)] xl:w-[calc(33.3333%-1rem)]">
        <div className="relative w-full h-[200px] overflow-hidden shadow-md rounded-xl">
          <Image
            priority
            src={`/images/demo/${imgName}`}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
          />
          <div className="absolute inset-0 transition duration-300 bg-black/30 group-hover:bg-black/50 rounded-xl" />
        </div>
      </DialogTrigger>

      {/* Modal Content with Animation */}
      <DialogContent>
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
              <DialogTitle className="text-lg font-semibold">
                {name}{" "}
                {company && <span className="text-muted">- {company}</span>}
              </DialogTitle>

              <div className="text-sm text-gray-500">{date}</div>

              <DialogDescription className="text-sm leading-relaxed">
                {description}
              </DialogDescription>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              {/* Fitur */}
              {fitur && (
                <div className="mt-4">
                  <h4 className="mb-1 text-sm font-semibold">{t("features")}</h4>
                  <ul className="space-y-1 text-sm list-disc list-inside">
                    {fitur.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Link */}
              {linkGithub && (
                <Link
                  href={linkGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-end mt-4 text-sm font-medium text-blue-600 hover:underline"
                >
                  {t("source")} {" "}
                  <i className="ml-1 fa-solid fa-arrow-up-right-from-square" />
                </Link>
              )}
            </DialogHeader>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
