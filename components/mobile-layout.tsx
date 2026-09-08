"use client";

import { useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { Topbar } from "@/components/topbar";
import { Container } from "@/components/ui/container";
import { AvatarPlaceholder } from "@/components/ui/avatar-placeholder";
import { MacWindow } from "@/components/mac-window";
import { WindowContent } from "@/components/window-content";
import { Home } from "@/components/sections/home";
import { Contact } from "@/components/sections/contact";
import { MOBILE_TABS } from "@/lib/content";

const DRAG_THRESHOLD = 80;

export function MobileLayout() {
  const [index, setIndex] = useState(0);
  const activeId = MOBILE_TABS[index].id;

  function goToNext() {
    setIndex((i) => (i + 1) % MOBILE_TABS.length);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -DRAG_THRESHOLD && index < MOBILE_TABS.length - 1) {
      setIndex((i) => i + 1);
    } else if (info.offset.x > DRAG_THRESHOLD && index > 0) {
      setIndex((i) => i - 1);
    }
  }

  return (
    <>
      <Topbar activeId={activeId} onNavigate={(id) => setIndex(MOBILE_TABS.findIndex((tab) => tab.id === id))} />
      <main className="flex flex-col gap-10 py-10">
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            animate={{ x: `-${index * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {MOBILE_TABS.map((tab) => (
              <div key={tab.id} className="w-full shrink-0 px-1">
                <Container className="flex flex-col items-center gap-6">
                  {tab.id === "about" ? (
                    <>
                      <AvatarPlaceholder />
                      <MacWindow slug={tab.slug} onMinimize={goToNext} className="w-full">
                        <Home />
                      </MacWindow>
                    </>
                  ) : (
                    <MacWindow slug={tab.slug} onMinimize={goToNext} className="w-full">
                      <WindowContent id={tab.id} />
                    </MacWindow>
                  )}
                </Container>
              </div>
            ))}
          </motion.div>
        </div>

        <div id="contact">
          <Container>
            <Contact />
          </Container>
        </div>
      </main>
    </>
  );
}
