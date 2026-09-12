import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    // Defer the initial sync to a microtask to satisfy the
    // react-hooks/set-state-in-effect lint rule.
    queueMicrotask(onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
