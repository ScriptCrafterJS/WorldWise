import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import SidebarFooter from "./SidebarFooter";
import { Outlet } from "react-router-dom";
export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <SidebarFooter />
    </aside>
  );
}
