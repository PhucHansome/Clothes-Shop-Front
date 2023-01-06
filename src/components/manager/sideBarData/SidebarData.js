import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from "react-icons/bi";

export const SidebarData = [
  {
    title: 'Home',
    path: '/manager',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Customer',
    path: '/customer',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-text'
  },
  {
    title: 'Products',
    path: '/manager/product',
    icon: <AiIcons.AiFillSkin />,
    cName: 'nav-text'
  },
  {
    title: 'Order',
    path: '/Order',
    icon: <AiIcons.AiOutlineShop />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/manager/login',
    icon: <BiIcons.BiLogIn />,
    cName: 'nav-text'
  }
];
