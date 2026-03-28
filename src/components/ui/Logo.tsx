export const Logo = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 256 256" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="52" y="52" width="88" height="88" rx="28" fill="#F8D558" />
    <rect x="116" y="52" width="88" height="88" rx="28" fill="#F97350" opacity="0.9" />
    <rect x="52" y="116" width="88" height="88" rx="28" fill="#6AA0FF" opacity="0.9" />
    <rect x="116" y="116" width="88" height="88" rx="28" fill="#A976FF" opacity="0.9" />
  </svg>
);
