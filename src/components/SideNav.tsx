'use client';
import { AxeIcon, Files, HistoryIcon, Settings } from 'lucide-react';
import Link from 'next/link';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export default function SideNav() {
  const menuItems = [
    {
      id: 1,
      itemTitle: 'Documents',
      href: '/dashboard/documents',
      icon: <Files className="h-6 w-6" />,
    },
    {
      id: 2,
      itemTitle: 'Chat history',
      href: '/dashboard/chat',
      icon: <HistoryIcon className="h-6 w-6" />,
    },
    {
      id: 3,
      itemTitle: 'Settings',
      href: 'https://legal-newt-27.accounts.dev/user',
      icon: <Settings className="h-6 w-6" />,
    },
  ];

  return (
    <Sidebar
      className="dark:bg-slate-800/90 bg-slate-100 "
      backgroundColor=""
      style={{ borderRight: '0' }}
    >
      <Menu
        menuItemStyles={{
          button: {
            color: 'dark:#f8fafc',
            '&:hover': {
              backgroundColor: '#334155',
              color: '#f8fafc',
            },
          },
        }}
        className=""
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            component={<Link href={item.href} />}
          >
            {' '}
            {item.itemTitle}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
}
