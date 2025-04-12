"use client"

import * as React from "react"
import {IconDashboard, IconInnerShadowTop, IconSettings, IconUsers,} from "@tabler/icons-react"

import {NavMain} from "@/components/nav-main"
import {NavSecondary} from "@/components/nav-secondary"
import {NavUser} from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {ModeToggle} from "@/components/mode-toggle";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Miembros",
      url: "#",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Ajustes",
      url: "#",
      icon: IconSettings,
    },
  ]
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu className={"flex-row justify-between"}>
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <Link href="/dashboard">
                  <IconInnerShadowTop className="!size-5"/>
                  <span className="text-base font-semibold">MultiGims</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <ModeToggle/>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain}/>
          <NavSecondary items={data.navSecondary} className="mt-auto"/>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user}/>
        </SidebarFooter>
      </Sidebar>
  )
}
