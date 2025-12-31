"use client";

import React, { useState, useEffect } from "react";

/**
 * Kindle-style Navigation Components
 * Main navbar container and re-exports of all navbar components
 */

// Re-export all navbar components
export { StatuBar } from "./navbar/StatusBar";
export { ControlCenter } from "./navbar/ControlCenter";
export {
  ActionBar,
  ActionGroup,
  ActionBarSpace,
  ActionItem,
} from "./navbar/ActionBar";
export { SearchBar } from "./navbar/SearchBar";
export { ActionBarMenu } from "./navbar/ActionBarMenu";
export {
  AirplaneModeIcon,
  BluetoothIcon,
  SyncIcon,
  SettingsIcon,
  DarkModeIcon,
  ChevronDownIcon,
} from "./navbar/StatusBarIcons";

// ============================================
// Navbar Container
// ============================================

interface NavbarProps {
  children: React.ReactNode;
  fixed?: boolean;
  autoClose?: boolean;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  children,
  fixed = false,
  autoClose = false,
  className = "",
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navStyle: React.CSSProperties = {
    backgroundColor: "var(--eink-paper)",
    borderColor: "var(--eink-divider)",
    ...(fixed && isMobile
      ? {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
        }
      : fixed
      ? {
          position: "sticky",
          top: 0,
          zIndex: 40,
        }
      : {}),
  };

  return (
    <nav className={`${className}`} style={navStyle}>
      {children}
    </nav>
  );
};
