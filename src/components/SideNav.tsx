'use client';
import Link from 'next/link';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export default function SideNav() {
  return (
    <Sidebar>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}
      >
        <MenuItem component={<Link href="/dashboard/documents" />}> Documents</MenuItem>
        <MenuItem component={<Link href="/calendar" />}> Calendar</MenuItem>
        <MenuItem component={<Link href="/e-commerce" />}> E-commerce</MenuItem>
      </Menu>
    </Sidebar>
  );
}
