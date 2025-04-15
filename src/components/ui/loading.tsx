import type React from "react"
import {Loader2, LoaderCircle} from "lucide-react"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const loadingVariants = cva("animate-spin text-muted-foreground", {
    variants: {
        size: {
            default: "h-8 w-8",
            sm: "h-4 w-4",
            lg: "h-12 w-12",
            xl: "h-16 w-16",
            "2xl": "h-24 w-24",
        },
        variant: {
            default: "",
            primary: "text-primary",
            secondary: "text-secondary",
        },
    },
    defaultVariants: {
        size: "default",
        variant: "default",
    },
})

interface LoadingIconProps extends VariantProps<typeof loadingVariants> {
    className?: string
    icon?: "circle" | "spinner"
}

export function LoadingIcon({className, size, variant, icon = "spinner"}: Readonly<LoadingIconProps>) {
    const Icon = icon === "circle" ? LoaderCircle : Loader2

    return <Icon className={cn(loadingVariants({size, variant}), className)} aria-hidden="true"/>
}

const loadingContainerVariants = cva("flex items-center justify-center", {
    variants: {
        fullscreen: {
            true: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
            false: "",
        },
    },
    defaultVariants: {
        fullscreen: false,
    },
})

interface LoadingProps extends LoadingIconProps {
    fullscreen?: boolean
    text?: string
    containerClassName?: string
}

export function Loading({
                            className,
                            containerClassName,
                            size,
                            variant,
                            icon,
                            fullscreen,
                            text
                        }: Readonly<LoadingProps>) {
    return (
        <div className={cn(loadingContainerVariants({fullscreen}), containerClassName)}>
            <div className="flex flex-col items-center gap-2">
                <LoadingIcon className={className} size={size} variant={variant} icon={icon}/>
                {text && <p className="text-sm font-medium text-muted-foreground">{text}</p>}
                <span className="sr-only">{text ?? "Loading..."}</span>
            </div>
        </div>
    )
}

interface LoadingOverlayProps extends LoadingProps {
    isLoading: boolean
    children: React.ReactNode
}

export function LoadingOverlay({
                                   isLoading,
                                   children,
                                   className,
                                   containerClassName,
                                   size,
                                   variant,
                                   icon,
                                   fullscreen,
                                   text,
                               }: Readonly<LoadingOverlayProps>) {
    if (!isLoading) return <>{children}</>

    return (
        <div className="relative">
            <div className="absolute inset-0 z-10">
                <Loading
                    className={className}
                    containerClassName={cn("h-full w-full bg-background/60", containerClassName)}
                    size={size}
                    variant={variant}
                    icon={icon}
                    fullscreen={fullscreen}
                    text={text}
                />
            </div>
            <div className="invisible">{children}</div>
        </div>
    )
}

interface LoadingButtonProps {
    isLoading: boolean
    loadingText?: string
    children: React.ReactNode
}

export function LoadingButton({isLoading, loadingText, children}: Readonly<LoadingButtonProps>) {
    return (
        <>
            {isLoading && <LoadingIcon size="sm" className="mr-2"/>}
            {isLoading ? (loadingText ?? "Cargando...") : children}
        </>
    )
}

export function LoadingSkeleton() {
    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center space-x-4">
                <div className="h-12 w-12 animate-pulse rounded-full bg-muted"></div>
                <div className="space-y-2">
                    <div className="h-4 w-40 animate-pulse rounded bg-muted"></div>
                    <div className="h-3 w-24 animate-pulse rounded bg-muted"></div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
            </div>
            <div className="h-32 w-full animate-pulse rounded-lg bg-muted"></div>
        </div>
    )
}

export function LoadingCard() {
    return (
        <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex flex-col items-center justify-center space-y-2 py-6">
                <LoadingIcon size="lg"/>
                <p className="text-sm font-medium text-muted-foreground">Cargando contenido...</p>
            </div>
        </div>
    )
}

export function LoadingTable() {
    return (
        <div className="w-full overflow-hidden rounded-lg border">
            <div className="h-10 w-full bg-muted/50"></div>
            {Array.from({length: 5}).map((_, index) => index + 1)
                .map((value) => (
                    <div key={value} className="flex w-full animate-pulse items-center border-b py-3 px-4">
                        <div className="h-4 w-1/6 rounded bg-muted"></div>
                        <div className="ml-4 h-4 w-1/4 rounded bg-muted"></div>
                        <div className="ml-auto h-4 w-1/6 rounded bg-muted"></div>
                    </div>
                ))}
        </div>
    )
}
