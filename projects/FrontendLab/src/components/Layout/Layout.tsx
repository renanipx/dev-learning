import type { ReactNode } from "react"
import { Header } from "../Header/Header"
import { Sidebar } from "../Sidebar/Sidebar"

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header title="FrontendLab" />
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
