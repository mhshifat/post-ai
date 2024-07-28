import Section from "@/components/shared/section";
import ClientOnly from "@/components/ui/client-only";
import AppointmentsList from "./appointments-list";
import TodaysAppointments from "./todays-appointments";
import { getAppointments, getTodaysAppointments } from "@/actions/appointments";
import AppointmentsBanners from "./appointments-banners";
import { IAppointmentWithDomain } from "@/utils/types";

export default async function AppointmentsPageLayout() {
  const appointments = await getAppointments();
  const todaysAppointments = await getTodaysAppointments();

  return (
    <div className="w-full h-full p-7 max-w-[1024px] mx-auto flex flex-col gap-10">
      <AppointmentsBanners />

      <ClientOnly>
        <Section>
          <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
            <div>
              <h3 className="text-base capitalize font-medium text-balance text-foreground">All Appointments</h3>
            </div>
          </Section.Header>
          <Section.Content>
            <AppointmentsList
              appointments={appointments}
            />
          </Section.Content>
        </Section>
        <Section>
          <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
            <div>
              <h3 className="text-base capitalize font-medium text-balance text-foreground">Today's Appointments</h3>
            </div>
          </Section.Header>
          <Section.Content>
            <TodaysAppointments
              appointments={todaysAppointments as IAppointmentWithDomain}
            />
          </Section.Content>
        </Section>
      </ClientOnly>
    </div>
  )
}