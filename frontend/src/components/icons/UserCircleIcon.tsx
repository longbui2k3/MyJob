interface UserCircleIconProps {
  strokeColor?: string;
}
export default function UserCircleIcon({
  strokeColor = "#ADB2BA",
}: UserCircleIconProps) {
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
          d="M12 15C14.0711 15 15.75 13.3211 15.75 11.25C15.75 9.17893 14.0711 7.5 12 7.5C9.92893 7.5 8.25 9.17893 8.25 11.25C8.25 13.3211 9.92893 15 12 15Z"
          stroke={strokeColor}
          stroke-width="1.5"
          stroke-miterlimit="10"
        />
        <path
          d="M5.98096 18.6913C6.5459 17.5806 7.40719 16.6478 8.46948 15.9963C9.53177 15.3448 10.7536 15 11.9998 15C13.2459 15 14.4678 15.3448 15.5301 15.9963C16.5924 16.6478 17.4537 17.5806 18.0186 18.6913"
          stroke={strokeColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  );
}
