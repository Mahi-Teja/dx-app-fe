import { DesktopNavBar, MobileBottomNav } from "@/components/Nav";

import BodyWrapper from "@/layouts/BodyWrapper";
import MainWrapper from "@/layouts/ContentWrapper";
import ScrollableContentWrapper from "@/layouts/ScrollableContentWrapper";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <BodyWrapper>
      {/* Desktop Sidebar */}
      <DesktopNavBar />

      {/* Main Column */}
      <MainWrapper>
        {/* Header */}
        {/* Scrollable Page Content */}
        <ScrollableContentWrapper>
          <Outlet />
        </ScrollableContentWrapper>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </MainWrapper>
    </BodyWrapper>
  );
};

export default AppLayout;
