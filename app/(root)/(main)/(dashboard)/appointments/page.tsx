import AppointmentsList from "@/components/modules/appointment/appointments-list";
import TodaysAppointments from "@/components/modules/appointment/todays-appointments";
import Section from "@/components/shared/section";
import ClientOnly from "@/components/ui/client-only";

export default function Appointments() {
  return (
    <div className="w-full h-full p-7 max-w-[1024px] mx-auto flex flex-col gap-10">
      <ClientOnly>
        <Section>
          <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
            <div>
              <h3 className="text-base capitalize font-medium text-balance text-foreground">All Appointments</h3>
            </div>
          </Section.Header>
          <Section.Content>
            <AppointmentsList />
          </Section.Content>
        </Section>
        <Section>
          <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
            <div>
              <h3 className="text-base capitalize font-medium text-balance text-foreground">Today's Appointments</h3>
            </div>
          </Section.Header>
          <Section.Content>
            <TodaysAppointments />
          </Section.Content>
        </Section>
      </ClientOnly>
    </div>
  )
}