import { useDialog } from "@/components/providers/dialog-provider";
import FormHandler from "@/components/shared/form-handler";
import DatePicker from "@/components/ui/date-picker";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Select from "@/components/ui/select";
import { IAppointment, IDomain } from "@/utils/types";
import { ReactNode, useState } from "react";
import { z } from "zod";
import CreateDomainForm from "../domain/create-domain-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createAppointment, updateAppointment } from "@/actions/appointments";

export default function CreateAppointmentForm({ onComplete, domains }: { domains: Partial<IDomain>[], onComplete: () => void }) {
  const { openDialog, closeDialog } = useDialog();
  const [newDomains, setNewDomains] = useState(domains || []);

  return (
    <FormHandler<Partial<IAppointment>>
      defaultValues={{
        date: "",
        time: "",
        domainId: "",
      }}
      createHandler={async (values) => createAppointment(values)}
      updateHandler={async (values) => updateAppointment(values)}
      onComplete={onComplete}
      schema={z.object({
        date: z.string(),
        time: z.string(),
        domainId: z.string(),
      })}
    >
      {({ form }) => (
        <>
          <FormField
            name="domainId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={newDomains.filter(d => d.id === field.value).map(d => ({
                      content: d.domain!,
                      value: d.id!
                    }))}
                    onChange={(value) => field.onChange(value)}
                  >
                    <Select.Trigger>
                      <Select.Placeholder>Select Domain</Select.Placeholder>
                    </Select.Trigger>
                    <Select.Content>
                      {newDomains.map(domain => (
                        <Select.Option key={domain.id} value={domain.id}>{domain.domain}</Select.Option>
                      ))}
                      <Select.Option
                        onClick={() => openDialog({
                          title: "Create a new domain",
                          description: "Please provide the necessary options to create the domain",
                          content: <CreateDomainForm onSubmit={(domain) => {
                            if (domain) {
                              setNewDomains(values => [domain, ...values])
                              closeDialog();
                            }
                          }} />
                        })}
                      >
                        <Button variant="link" size='sm' className="flex items-center gap-2 p-0 h-auto">
                          <Plus className="size-4" />

                          <span>Create New</span>
                        </Button>
                      </Select.Option>
                    </Select.Content>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DatePicker
            enableTimePicker
            onChange={(date) => form.setValue("date", date.toISOString())}
            onTimeSelect={(time) => form.setValue("time", time)}
          />
          {(form.formState.errors.time?.message || form.formState.errors.date?.message) && (
            <p className="font-medium text-xs text-danger">{(form.formState.errors.time?.message || form.formState.errors.date?.message) as ReactNode}</p>
          )}
        </>
      )}
    </FormHandler>
  )
}