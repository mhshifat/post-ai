"use client";

import Section from "@/components/shared/section";
import CurrentPlan from "./current-plan";
import SettingsLayout from "@/components/shared/settings-layout";
import ThemeSelector from "./theme-selector";
import ChangePasswordForm from "./change-password-form";
import ClientOnly from "@/components/ui/client-only";

export default function SettingsPageLayout() {
  return (
    <div className="bg-background-secondary">
      <div className="max-w-[1024px] mx-auto">
        <ClientOnly>
          <SettingsLayout>
              <SettingsLayout.Left
                title="Current Plan"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, repellat?"
              />
              <SettingsLayout.Right>
                <Section>
                  <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
                    <div>
                      <h3 className="text-base capitalize font-medium text-balance text-foreground">Current Plan</h3>
                    </div>
                  </Section.Header>
                  <Section.Content>
                    <div className="py-2 px-3">
                      <CurrentPlan />
                    </div>
                  </Section.Content>
                </Section>
              </SettingsLayout.Right>
          </SettingsLayout>
          <SettingsLayout>
              <SettingsLayout.Left
                title="Interface Theme"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, repellat?"
              />
              <SettingsLayout.Right>
                <Section>
                  <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
                    <div>
                      <h3 className="text-base capitalize font-medium text-balance text-foreground">Current Theme</h3>
                    </div>
                  </Section.Header>
                  <Section.Content>
                    <div className="py-2 px-3">
                      <ThemeSelector />
                    </div>
                  </Section.Content>
                </Section>
              </SettingsLayout.Right>
          </SettingsLayout>
          <SettingsLayout>
              <SettingsLayout.Left
                title="Change Password"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, repellat?"
              />
              <SettingsLayout.Right>
                <Section>
                  <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
                    <div>
                      <h3 className="text-base capitalize font-medium text-balance text-foreground">New Password</h3>
                    </div>
                  </Section.Header>
                  <Section.Content>
                    <div className="py-2 px-3">
                      <ChangePasswordForm onSubmit={() => {}} />
                    </div>
                  </Section.Content>
                </Section>
              </SettingsLayout.Right>
          </SettingsLayout>
        </ClientOnly>
      </div>
    </div>
  )
}