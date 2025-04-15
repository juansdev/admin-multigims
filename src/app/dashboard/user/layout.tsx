import React from "react";

export default function UserLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="@container/main flex flex-1 flex-col">
            {children}
        </div>
    )
}