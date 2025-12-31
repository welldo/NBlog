"use client";

import React, { useState, useEffect, useRef } from "react";
import { EllipsisVerticalIcon } from "../Icons";

/**
 * Action Bar Menu (dropdown menu)
 * Kindle-style dropdown menu component
 */

interface MenuItem {
  textPrimary: string;
  component?: "a" | "button";
  href?: string;
  onClick?: () => void;
}

interface ActionBarMenuProps {
  items: MenuItem[];
}

export const ActionBarMenu: React.FC<ActionBarMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Kindle-style invert on tap
  const buttonStyles = isPressed
    ? {
        color: "var(--eink-paper)",
        backgroundColor: "var(--eink-ink)",
      }
    : {
        color: "var(--eink-ink-secondary)",
        backgroundColor: "transparent",
      };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        className="
          p-2
          transition-colors duration-75
          select-none
        "
        style={buttonStyles}
      >
        <EllipsisVerticalIcon size={18} />
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 top-full mt-1
            min-w-[160px]
            py-1 z-50
            bg-(--eink-paper)
            border-2
            border-(--eink-ink)
          "
        >
          {items.map((item, index) => {
            const commonClasses = `
              block w-full text-left
              px-4 py-2
              text-sm font-sans
              text-[var(--eink-ink)]
              hover:bg-[var(--eink-paper-warm)]
              transition-colors duration-150
            `;

            if (item.component === "a" && item.href) {
              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={commonClasses}
                  onClick={() => setIsOpen(false)}
                >
                  {item.textPrimary}
                </a>
              );
            }

            return (
              <button
                key={index}
                className={commonClasses}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
              >
                {item.textPrimary}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

