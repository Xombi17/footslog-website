// Check if we're on a browser environment
const isClient = typeof window !== 'undefined';

/**
 * Detects if the path is an internal anchor link
 * @param path - The path to check
 * @returns boolean indicating if it's an anchor link
 */
export const isAnchorLink = (path: string): boolean => {
  return path.startsWith('#');
};

/**
 * Detects if the path is a local route (not external)
 * @param path - The path to check
 * @returns boolean indicating if it's a local route
 */
export const isLocalRoute = (path: string): boolean => {
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return false;
  }
  return true;
};

/**
 * Handles smooth scrolling to an element on the page
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top (default: 80px to account for navbar)
 */
export const scrollToElement = (elementId: string, offset: number = 80): void => {
  if (!isClient) return;
  
  // Remove the # if it exists
  const id = elementId.startsWith('#') ? elementId.substring(1) : elementId;
  
  // Find the element
  const element = document.getElementById(id);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Handles navigation, either to a new page or smooth scrolling to an anchor
 * @param path - Path to navigate to
 * @param router - Next.js router instance (optional, for programmatic navigation)
 */
export const handleNavigation = (path: string, router?: any): void => {
  if (!isClient) return;
  
  // Handle anchor links on the current page
  if (isAnchorLink(path)) {
    scrollToElement(path);
    return;
  }
  
  // Handle links to other pages with specific anchors
  if (path.includes('#') && isLocalRoute(path)) {
    const [basePath, hash] = path.split('#');
    const currentPath = window.location.pathname;
    
    // If we're already on the right page, just scroll
    if (currentPath === basePath || (basePath === '/' && currentPath === '/')) {
      scrollToElement(`#${hash}`);
      return;
    }
    
    // If using router (programmatic navigation)
    if (router) {
      router.push(path);
      return;
    }
    
    // Fallback to regular navigation
    window.location.href = path;
    return;
  }
  
  // If using router (programmatic navigation)
  if (router && isLocalRoute(path)) {
    router.push(path);
    return;
  }
  
  // Regular navigation for local routes
  if (isLocalRoute(path)) {
    window.location.href = path;
  } else {
    // External links
    window.open(path, '_blank', 'noopener,noreferrer');
  }
}; 