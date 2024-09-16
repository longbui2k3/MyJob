import NavigationBase from "./NavigationBase";

export default function NavigationCreateAccount() {
  return (
    <NavigationBase
      label="Don't have account"
      hyperlinkLabel="Create Account"
      href="/signup"
    />
  );
}
