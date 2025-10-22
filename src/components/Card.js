"use client";

import Image from "next/image";
import React from "react";
import Modal from "@/components/ui/Modal";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const Card = ({ data }) => {
  const { name, company, imageUrl, date, linkGithub, description, tags, fitur } =
    data;

  return (
    <Modal
      trigger={
        <div className="group w-full sm:w-[calc(50%-1rem)] xl:w-[calc(33.3333%-1rem)]">
          <div className="relative w-full h-[200px] overflow-hidden shadow-md rounded-xl">
            <Image
              priority
              src={imageUrl?.startsWith("http") ? imageUrl : `/images/demo/${imgName}`}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
            />
            <div className="absolute inset-0 transition duration-300 bg-black/30 group-hover:bg-black/50 rounded-xl" />
          </div>
        </div>
      }
      title={
        <>
          {name} {company && <span className="text-muted">- {company}</span>}
        </>
      }
      description={description}
      className="max-w-lg"
    >
      <div className="text-sm text-gray-500">{date}</div>
      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      {/* Fitur */}
      {fitur && (
        <div className="mt-4">
          <h4 className="mb-1 text-sm font-semibold">Fitur:</h4>
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
          Source Code <i className="ml-1 fa-solid fa-arrow-up-right-from-square" />
        </Link>
      )}
    </Modal>
  );
};

export default Card;
