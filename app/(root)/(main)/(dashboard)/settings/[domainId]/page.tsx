import { getProducts } from "@/actions/domains";
import ChatbotForm from "@/components/modules/domain/chatbot-form";
import CopySnippet from "@/components/modules/domain/copy-snippet";
import CreateDomainForm from "@/components/modules/domain/create-domain-form";
import DeleteDomainBtn from "@/components/modules/domain/delete-domain-btn";
import FilterQuestionForm from "@/components/modules/domain/filter-question-form";
import FilterQuestions from "@/components/modules/domain/filter-questions";
import HelpDeskForm from "@/components/modules/domain/help-desk-form";
import HelpDeskQuestions from "@/components/modules/domain/help-desk-questions";
import Products from "@/components/modules/domain/products";
import Section from "@/components/shared/section";
import SettingsLayout from "@/components/shared/settings-layout";

export default async function Domain({ params }: { params: { domainId: string } }) {
  const products = await getProducts(params.domainId);
  
  return (
    <div className="max-w-[1024px] mx-auto">
      <SettingsLayout>
        <SettingsLayout.Left
          title="Domain"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, repellat?"
        />
        <SettingsLayout.Right>
          <Section>
            <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
              <div>
                <h3 className="text-base capitalize font-medium text-balance">Update Domain</h3>
              </div>
            </Section.Header>
            <Section.Content className="p-5">
              <CreateDomainForm />
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
          title="Chatbot (Premium)"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, repellat?"
        />
        <SettingsLayout.Right>
          <Section>
            <Section.Header className="flex items-start justify-between gap-5 px-5 py-2">
              <div>
                <h3 className="text-base capitalize font-medium text-balance">Chatbot Settings</h3>
              </div>
            </Section.Header>
            <Section.Content className="p-5">
              <ChatbotForm />
            </Section.Content>
          </Section>
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
                <h3 className="text-base capitalize font-medium text-balance">Help Desk Q&A</h3>
              </div>
            </Section.Header>
            <Section.Content className="p-5">
              <HelpDeskForm />
              <HelpDeskQuestions />
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
                <h3 className="text-base capitalize font-medium text-balance">Help Desk Q&A</h3>
              </div>
            </Section.Header>
            <Section.Content className="p-5">
              <FilterQuestionForm />
              <FilterQuestions />
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
                <h3 className="text-base capitalize font-medium text-balance">Products</h3>
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
          <DeleteDomainBtn />
        </SettingsLayout.Right>
      </SettingsLayout>
    </div>
  )
}