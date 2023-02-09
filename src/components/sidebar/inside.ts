import * as List from "../../assets/icons/List";

interface FlagsProps {
  link: string;
  iconName: keyof typeof List;
}

export const Links: FlagsProps[] = [
  { link: "#home", iconName: "Home" },
  { link: "#about", iconName: "Card" },
  { link: "#projects", iconName: "Portfolio" },
];
