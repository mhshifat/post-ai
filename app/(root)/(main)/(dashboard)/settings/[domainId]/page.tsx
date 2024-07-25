import { getDomainDetails, getProducts } from "@/actions/domains";
import { getFilterQuestions, getHelpDeskQuestions } from "@/actions/faqs";
import ChatbotForm from "@/components/modules/domain/chatbot-form";
import CopySnippet from "@/components/modules/domain/copy-snippet";
import CreateDomainForm from "@/components/modules/domain/create-domain-form";
import DeleteDomainBtn from "@/components/modules/domain/delete-domain-btn";
import FilterQuestionForm from "@/components/modules/domain/filter-question-form";
import FilterQuestions from "@/components/modules/domain/filter-questions";
import HelpDeskForm from "@/components/modules/domain/help-desk-form";
import HelpDeskQuestions from "@/components/modules/domain/help-desk-questions";
import Products from "@/components/modules/domain/products";
import CanAccess from "@/components/shared/can-access";
import NotFound from "@/components/shared/not-found";
import Section from "@/components/shared/section";
import SettingsLayout from "@/components/shared/settings-layout";
import { Button } from "@/components/ui/button";
import ClientOnly from "@/components/ui/client-only";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Domain({ params }: { params: { domainId: string } }) {
  const domainDetails = await getDomainDetails(params.domainId);
  const products = await getProducts(params.domainId);
  const helpDeskQuestions = await getHelpDeskQuestions(params.domainId);
  const filterQuestions = await getFilterQuestions(params.domainId);
  
  if (!domainDetails) return <NotFound />
  return (
    <div className="max-w-[1024px] mx-auto">
      <ClientOnly>
        <SettingsLayout>
          <SettingsLayout.Left
            title="Domain"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, repellat?"
          />
          <SettingsLayout.Right>
            <Section>
              <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
                <div>
                  <h3 className="text-base capitalize font-medium text-balance text-foreground">Update Domain</h3>
                </div>
              </Section.Header>
              <Section.Content className="p-5">
                <CreateDomainForm
                  key={domainDetails?.updatedAt + ""}
                  defaultValues={{
                    id: domainDetails.id,
                    domain: domainDetails.domain,
                    logo: domainDetails.logo
                  }}
                />
              </Section.Content>
            </Section>
          </SettingsLayout.Right>
        </SettingsLayout>
        <SettingsLayout>
          <SettingsLayout.Left
            title="Code Snippet"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, repellat?"
          />
          <SettingsLayout.Right>
            <CopySnippet domainId={params.domainId} />
          </SettingsLayout.Right>
        </SettingsLayout>
        <SettingsLayout>
          <SettingsLayout.Left
            title="Chatbot (Pro)"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, repellat?"
          />
          <SettingsLayout.Right>
            <CanAccess
              subscriptions={["PRO"]}
              fallback={(
                <div>
                  <Link href="/settings">
                    <Button variant="link">Upgrade Plan</Button>
                  </Link>
                </div>
              )}
            >
              <Section>
                <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
                  <div>
                    <h3 className="text-base capitalize font-medium text-balance text-foreground">Chatbot Settings</h3>
                  </div>
                </Section.Header>
                <Section.Content className="p-5">
                  <ChatbotForm
                    key={domainDetails.bot?.updatedAt + ""}
                    domainId={params.domainId}
                    defaultValues={{
                      id: domainDetails.bot?.id,
                      logo: domainDetails.bot?.logo,
                      welcomeText: domainDetails.bot?.welcomeText,
                    }}
                  />
                </Section.Content>
              </Section>
            </CanAccess>
          </SettingsLayout.Right>
        </SettingsLayout>
        <SettingsLayout>
          <SettingsLayout.Left
            title="Help Desk"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, repellat?"
          />
          <SettingsLayout.Right>
            <Section>
              <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
                <div>
                  <h3 className="text-base capitalize font-medium text-balance text-foreground">Help Desk Q&A</h3>
                </div>
              </Section.Header>
              <Section.Content className="p-5">
                <HelpDeskForm
                  domainId={params.domainId}
                />
                <HelpDeskQuestions
                  questions={helpDeskQuestions}
                />
              </Section.Content>
            </Section>
          </SettingsLayout.Right>
        </SettingsLayout>
        <SettingsLayout>
          <SettingsLayout.Left
            title="Filter Questions"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, repellat?"
          />
          <SettingsLayout.Right>
            <Section>
              <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
                <div>
                  <h3 className="text-base capitalize font-medium text-balance text-foreground">Filter Questions</h3>
                </div>
              </Section.Header>
              <Section.Content className="p-5">
                <FilterQuestionForm
                  domainId={params.domainId}
                />
                <div className="mt-10">
                  <FilterQuestions
                    questions={filterQuestions}
                  />
                </div>
              </Section.Content>
            </Section>
          </SettingsLayout.Right>
        </SettingsLayout>
        <SettingsLayout>
          <SettingsLayout.Left
            title="Products"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, repellat?"
          />
          <SettingsLayout.Right>
            <Section>
              <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
                <div>
                  <h3 className="text-base capitalize font-medium text-balance text-foreground">Products</h3>
                </div>
              </Section.Header>
              <Section.Content className="p-5">
                <Products domainId={params.domainId} products={products} />
              </Section.Content>
            </Section>
          </SettingsLayout.Right>
        </SettingsLayout>
        <SettingsLayout>
          <SettingsLayout.Left
            title=""
            description=""
          />
          <SettingsLayout.Right>
            <div className="flex justify-start">
              <DeleteDomainBtn domainId={params.domainId} />
            </div>
          </SettingsLayout.Right>
        </SettingsLayout>
      </ClientOnly>
    </div>
  )
}