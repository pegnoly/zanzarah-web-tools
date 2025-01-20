import { ReactNode } from "react";

export default function Layout({
    children,
    focused
}: {
    children: ReactNode,
    focused: ReactNode
}
) {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {children}
            {focused}
        </div>
    )
}