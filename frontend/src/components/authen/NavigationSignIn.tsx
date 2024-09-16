import NavigationBase from "./NavigationBase";

export default function NavigationSignIn() {
  return (
    <NavigationBase
      label="Already have account?"
      hyperlinkLabel="Log In"
      href="/signin"
    />
  );
}
