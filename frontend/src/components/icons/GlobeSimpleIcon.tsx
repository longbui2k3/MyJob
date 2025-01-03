interface GlobeSimpleIconProps {
  strokeColor?: string;
}
export default function GlobeSimpleIcon({
  strokeColor = "#ADB2BA",
}: GlobeSimpleIconProps) {
  return (
    <span aria-hidden="true">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          stroke={strokeColor}
          stroke-width="1.5"
          stroke-miterlimit="10"
        />
        <path
          d="M3 12H21"
          stroke={strokeColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 20.7584C14.0711 20.7584 15.75 16.8371 15.75 12C15.75 7.16288 14.0711 3.24161 12 3.24161C9.92893 3.24161 8.25 7.16288 8.25 12C8.25 16.8371 9.92893 20.7584 12 20.7584Z"
          stroke={strokeColor}
          stroke-width="1.5"
          stroke-miterlimit="10"
        />
      </svg>
    </span>
  );
}
