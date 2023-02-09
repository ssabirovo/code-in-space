import * as List from "../../assets/icons/List";

interface FlagsProps {
  lang: string;
  iconName: keyof typeof List;
}

export const Flags: FlagsProps[] = [
  { lang: "uz", iconName: "uzFlag" },
  { lang: "ru", iconName: "ruFlag" },
  { lang: "en", iconName: "ukFlag" },
];
