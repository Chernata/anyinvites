import Menu376 from "@/imports/Menu376/index";

// Maps the menu item labels (data-name in the imported Menu376) to the
// top-level section data-name in the main 376Romantic page.
const NAV_MAP: Record<string, string> = {
  Home: "Component 2",
  "Event Details": "Event details",
  RSVP: "RSVP",
  "Our Story": "Our story",
  "Event Schedule": "Event schedule",
  "Gift Registry": "Registry",
  "Menu Selection": "Menu",
  "Guest Book": "Guest book",
  "Photo Book": "Photo",
};

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (sectionDataName: string) => void;
}

export function MobileMenu({ open, onClose, onNavigate }: MobileMenuProps) {
  const handleClick = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-name]");
    if (!el) return;
    const name = el.getAttribute("data-name");
    if (!name) return;

    if (name === "Close") {
      onClose();
      return;
    }
    if (name === "Button / Dark") {
      onNavigate("RSVP");
      return;
    }
    if (name in NAV_MAP) {
      onNavigate(NAV_MAP[name]);
    }
  };

  return (
    <div
      onClick={handleClick}
      aria-hidden={!open}
      className={`mobile-menu-overlay fixed inset-0 z-50 transition-[opacity,transform] duration-300 ease-out ${
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "-translate-y-3 pointer-events-none opacity-0"
      }`}
    >
      <style>{`
        .mobile-menu-overlay [data-name="Menu"] > div,
        .mobile-menu-overlay [data-name="Close"],
        .mobile-menu-overlay [data-name="Button / Dark"] { cursor: pointer; }
      `}</style>
      <Menu376 />
    </div>
  );
}
