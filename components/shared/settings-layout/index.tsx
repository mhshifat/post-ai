import { PropsWithChildren } from "react";
import SettingsLeft from "./settings-left";
import SettingsRight from "./settings-right";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex gap-10 py-10">
      {children}
    </div>
  )
}

SettingsLayout.Left = SettingsLeft;
SettingsLayout.Right = SettingsRight;