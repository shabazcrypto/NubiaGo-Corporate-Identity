import { A4Page, DocumentHeader, DocumentFooter } from '@/components/documents/DocumentChrome';
import { Logo, BrandRule } from '@/components/brand/Logo';
import { useCompany } from '@/lib/brand-context';

/** Internal memo — A4, minimal chrome. */
export function LetterheadMemo() {
  const company = useCompany();
  return (
    <A4Page
      header={<DocumentHeader variant="minimal" />}
      footer={<DocumentFooter variant="minimal" page="1 / 1" />}
    >
      <div className="pt-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">Internal memo</p>
        <h1 className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-ink">
          Corridor sequence — Q1 operations briefing
        </h1>
        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2 border border-gray-200 bg-gray-50 px-4 py-3 text-[10px]">
          {[
            ['From', `${company.personName} · ${company.jobTitle}`],
            ['To', 'Operations leadership · Regional leads'],
            ['Date', '12 January 2025'],
            ['Ref', 'MEMO-OPS-2025-01'],
            ['Classification', 'Internal'],
            ['Action', 'Acknowledge by 17 January']
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <span className="w-24 shrink-0 font-semibold uppercase tracking-[0.1em] text-gray-500">{k}</span>
              <span className="text-ink">{v}</span>
            </div>
          ))}
        </div>
        <BrandRule width={48} thickness={1.5} tone="gold" />
        <div className="mt-5 space-y-3 text-[10.5px] leading-[1.85] text-gray-700">
          <p>
            This note confirms the 2025 corridor sequence agreed at the December operations review. Senegal, Tanzania
            and Zambia proceed first; Côte d’Ivoire remains on a watch path pending onboarding capacity.
          </p>
          <p>
            Regional leads should return headcount and vendor dependencies by 17 January so the board pack can lock
            figures. No external circulation.
          </p>
          <ol className="ml-4 list-decimal space-y-2 marker:font-semibold marker:text-brand">
            <li>Confirm local hiring plan and start dates for each corridor.</li>
            <li>Flag any settlement partner SLA that cannot meet T+1.</li>
            <li>Escalate blockers to the named account owner before the January board.</li>
          </ol>
        </div>
      </div>
    </A4Page>
  );
}

/** Legal / compliance letterhead — formal counsel correspondence. */
export function LetterheadLegal() {
  const company = useCompany();
  return (
    <A4Page
      header={<DocumentHeader variant="full" />}
      footer={
        <DocumentFooter variant="full" page="1 / 1" reference="LEGAL-2025-0042" showPhone />
      }
    >
      <div className="pt-10">
        <div className="flex items-start justify-between">
          <div className="text-[10px] leading-[1.8] text-gray-700">
            <div className="font-semibold text-ink">Counsel · [Counterparty legal name]</div>
            <div>[Firm / Chambers]</div>
            <div>[Address line]</div>
          </div>
          <div className="text-right text-[10px] leading-[1.8] text-gray-700">
            <div>
              <span className="text-gray-500">Matter</span> NG-MSA-2024-118
            </div>
            <div>
              <span className="text-gray-500">Date</span> 12 January 2025
            </div>
            <div className="mt-1 font-semibold uppercase tracking-[0.12em] text-brand">Privileged</div>
          </div>
        </div>
        <h1 className="mt-8 text-[14px] font-semibold tracking-[-0.01em] text-ink">
          Without prejudice — proposed amendment to schedule 2 (service levels)
        </h1>
        <div className="mt-5 space-y-3.5 text-[10.5px] leading-[1.85] text-gray-700">
          <p>Dear Counsel,</p>
          <p>
            We write on behalf of {company.legalName} regarding the draft amendment to Schedule 2 of the master
            services agreement dated 4 September 2024. This letter is sent on a without-prejudice basis and does not
            waive privilege or any rights reserved under that agreement.
          </p>
          <p>
            Our proposed revisions concern availability measurement windows and escalation contacts only. Commercial
            rates and payment terms are unchanged. A marked comparison is enclosed.
          </p>
          <p>
            Kindly confirm receipt and indicate whether a call with your client is required before signature. We remain
            available to finalise wording within the current timetable.
          </p>
          <p>Yours faithfully,</p>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-2 text-[10.5px] leading-[1.8] text-gray-700">
          <div className="font-semibold text-ink">[Counsel name]</div>
          <div className="text-gray-500">External counsel · for {company.legalName}</div>
        </div>
      </div>
    </A4Page>
  );
}

/** Full-colour letterhead — French body (West / Central Africa correspondence). */
export function LetterheadFr() {
  const company = useCompany();
  return (
    <A4Page
      header={<DocumentHeader variant="full" />}
      footer={<DocumentFooter variant="full" page="1 / 1" reference="Réf. NG-2025-008" showPhone />}
    >
      <div className="pt-12">
        <div className="flex items-start justify-between">
          <div className="text-[10px] leading-[1.8] text-gray-700">
            <div className="font-semibold text-ink">Mme Amara Okonkwo</div>
            <div>Directrice des Achats</div>
            <div>Continental Trade Partners Ltd.</div>
            <div>14 Marina Road, Accra, Ghana</div>
          </div>
          <div className="text-right text-[10px] leading-[1.8] text-gray-700">
            <div>
              <span className="text-gray-500">Réf.</span> NG-2025-008
            </div>
            <div>
              <span className="text-gray-500">Date</span> 12 janvier 2025
            </div>
            <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.12em] text-brand">FR · EN available</div>
          </div>
        </div>
        <h1 className="mt-9 text-[15px] font-semibold tracking-[-0.01em] text-ink">
          Conditions de partenariat — règlement transfrontalier
        </h1>
        <div className="mt-5 space-y-3.5 text-[10.5px] leading-[1.85] text-gray-700">
          <p>Madame,</p>
          <p>
            Nous vous remercions pour l’échange du 8 janvier concernant l’infrastructure de règlement pour votre réseau
            de fournisseurs. La présente confirme le périmètre convenu et les conditions commerciales pour votre revue.
          </p>
          <p>
            NubiaGo assurera l’onboarding marchand, la vérification et le règlement sur les quatre marchés identifiés,
            intégré à votre plateforme d’achat. La mise en œuvre est prévue sur douze semaines, avec un premier marché
            opérationnel en semaine cinq.
          </p>
          <p>
            Notre engagement est clair : tarification transparente, niveaux de service publiés et un interlocuteur nommé
            pour toute la durée du mandat.
          </p>
          <p>Dans l’attente de votre retour, veuillez agréer, Madame, l’expression de nos salutations distinguées.</p>
        </div>
        <div className="mt-9 text-[10.5px] leading-[1.8] text-gray-700">
          <p>Cordialement,</p>
          <div className="mt-8 border-t border-gray-200 pt-2">
            <div className="font-semibold text-ink">{company.personName}</div>
            <div className="text-gray-500">
              {company.jobTitle} · {company.name}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Logo size={12} />
          <BrandRule width={32} thickness={1} tone="gold" />
          <span className="text-[8px] text-gray-500">English version available on request</span>
        </div>
      </div>
    </A4Page>
  );
}
