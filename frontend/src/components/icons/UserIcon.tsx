interface UserIconProps {
  strokeColor?: string;
}
export default function UserIcon({ strokeColor = "#ADB2BA" }: UserIconProps) {
  return (
    <span aria-hidden="true">
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 15C15.8137 15 18.5 12.3137 18.5 9C18.5 5.68629 15.8137 3 12.5 3C9.18629 3 6.5 5.68629 6.5 9C6.5 12.3137 9.18629 15 12.5 15Z"
          stroke={strokeColor}
          stroke-width="1.5"
          stroke-miterlimit="10"
        />
        <path
          d="M3.40527 20.2491C4.32736 18.6531 5.65322 17.3278 7.24966 16.4064C8.84611 15.485 10.6569 15 12.5002 15C14.3434 15 16.1542 15.4851 17.7506 16.4065C19.3471 17.3279 20.6729 18.6533 21.5949 20.2493"
          stroke={strokeColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  );
}
