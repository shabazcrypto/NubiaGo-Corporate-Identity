import type { JSX } from 'react';
import { Logo, BrandRule } from '@/components/brand/Logo';
import { QrPlaceholder } from '@/components/brand/iconSystem';
import { useCompany } from '@/lib/brand-context';

const PAD = 64;

/** Annual report — reversed primary field with large year. */
export function CoverAnnualReport(): JSX.Element {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col justify-between bg-brand" style={{ padding: PAD }}>
      <div className="flex items-start justify-between">
        <Logo size={24} tone="light" />
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">Public</span>
      </div>
      <div>
        <BrandRule width={96} thickness={2} tone="gold" />
        <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
          Annual report 2024
        </div>
        <h1 className="mt-6 text-[80px] font-bold leading-none tracking-[-0.04em] text-white">2024</h1>
        <p className="mt-6 max-w-[440px] text-[14px] leading-[1.7] text-white/65">
          {company.descriptor}
        </p>
      </div>
      <div className="flex items-end justify-between border-t border-white/15 pt-5 text-[10px] text-white/55">
        <span>
          {company.legalName} · {company.endorsement}
        </span>
        <span>{company.website}</span>
      </div>
    </div>
  );
}

/** Board pack — white with confidential band and agenda. */
export function CoverBoardPack(): JSX.Element {
  const company = useCompany();
  const agenda = [
    ['01', 'Call to order and apologies'],
    ['02', 'Minutes of the previous meeting'],
    ['03', 'CEO report and corridor update'],
    ['04', 'Financial performance — Q4'],
    ['05', 'Risk, compliance and audit'],
    ['06', 'Any other business']
  ];
  return (
    <div className="flex h-full w-full flex-col bg-white" style={{ padding: PAD }}>
      <div className="-mx-16 -mt-0 flex items-center justify-between bg-brand px-16 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-white">
        <span>Confidential — board only</span>
        <span>Do not circulate</span>
      </div>
      <div className="mt-10 flex items-start justify-between">
        <Logo size={22} />
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">Board pack</span>
      </div>
      <div className="mt-12">
        <BrandRule width={96} thickness={2} />
        <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
          Board meeting agenda
        </div>
        <h1 className="mt-4 max-w-[520px] text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
          Quarterly board meeting
        </h1>
        <div className="mt-6 grid max-w-[420px] grid-cols-2 gap-6">
          {[
            ['Date', '19 December 2024'],
            ['Time', '10:00 WAT'],
            ['Venue', 'Lagos HQ · Boardroom'],
            ['Reference', 'BM-2024-Q4']
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
              <div className="mt-1 text-[12px] font-medium text-ink">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">Agenda</div>
        <ul className="mt-3">
          {agenda.map(([num, title]) => (
            <li key={num} className="flex items-baseline gap-4 border-b border-gray-200 py-2.5">
              <span className="w-6 text-[10px] font-semibold tabular-nums text-brand">{num}</span>
              <span className="text-[13px] text-ink">{title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 pt-5 text-[10px] text-gray-500">
        {company.legalName} · {company.endorsement}
      </div>
    </div>
  );
}

/** Due diligence pack — sand field for M&A / investment. */
export function CoverDueDiligence(): JSX.Element {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col justify-between bg-brand-sand" style={{ padding: PAD }}>
      <div className="flex items-start justify-between">
        <Logo size={24} />
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">
          Strictly confidential
        </span>
      </div>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Due diligence pack</div>
        <h1 className="mt-4 max-w-[540px] text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
          M&amp;A and investment data room
        </h1>
        <p className="mt-5 max-w-[440px] text-[13px] leading-[1.7] text-gray-700">
          Corporate, financial, legal and operational materials prepared for qualified counterparties
          evaluating a strategic investment in {company.name}.
        </p>
        <div className="mt-10 grid max-w-[480px] grid-cols-2 gap-8 border-t border-gray-200 pt-6">
          {[
            ['Prepared for', 'Qualified investors'],
            ['Series', 'DD-2024-08'],
            ['Issued', '08 December 2024'],
            ['Validity', '90 days']
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
              <div className="mt-1 text-[13px] font-medium text-ink">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between border-t border-gray-200 pt-5 text-[10px] text-gray-500">
        <span>
          {company.legalName} · {company.registration}
        </span>
        <span>{company.website}</span>
      </div>
    </div>
  );
}

/** Policy handbook — white technical index. */
export function CoverPolicyHandbook(): JSX.Element {
  const company = useCompany();
  const policies = [
    ['01', 'Code of conduct', '03'],
    ['02', 'Anti-bribery & corruption', '08'],
    ['03', 'Data protection & privacy', '14'],
    ['04', 'Information security', '22'],
    ['05', 'Whistleblowing', '31'],
    ['06', 'Travel & expenses', '36'],
    ['07', 'Vendor management', '42'],
    ['08', 'Africa sanctions & PEP screening', '48']
  ];
  return (
    <div className="flex h-full w-full flex-col bg-white" style={{ padding: PAD }}>
      <div className="flex items-end justify-between pb-5">
        <Logo size={22} />
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">
          Internal policy
        </span>
      </div>
      <BrandRule width="100%" thickness={1} />
      <div className="mt-12">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-light">
          Handbook POL-100 · Rev. 03
        </div>
        <h1 className="mt-4 max-w-[560px] text-[38px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
          Corporate policy handbook
        </h1>
      </div>
      <div className="mt-12 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">Policy index</div>
        <ul className="mt-4">
          {policies.map(([number, title, page]) => (
            <li key={number} className="flex items-baseline gap-4 border-b border-gray-200 py-3">
              <span className="w-6 text-[10px] font-semibold tabular-nums text-brand">{number}</span>
              <span className="flex-1 text-[13px] text-ink">{title}</span>
              <span className="text-[11px] tabular-nums text-gray-500">{page}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-end justify-between border-t border-gray-200 pt-5">
        <div className="text-[10px] leading-[1.7] text-gray-500">
          {company.legalName} · {company.endorsement}
          <br />
          Effective 01 January 2025 · Controlled document
        </div>
        <QrPlaceholder size={64} label="Policy portal" />
      </div>
    </div>
  );
}

/** Investor brief — dark primary one-pager cover. */
export function CoverInvestorBrief(): JSX.Element {
  const company = useCompany();
  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-brand" style={{ padding: PAD }}>
      <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-brand-gold" aria-hidden />
      <div className="flex items-start justify-between">
        <Logo size={24} tone="light" />
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-brand-gold">
          Investor relations
        </span>
      </div>
      <div>
        <BrandRule width={96} thickness={2} tone="gold" />
        <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
          Investor one-pager
        </div>
        <h1 className="mt-4 max-w-[520px] text-[42px] font-bold leading-[1.08] tracking-[-0.03em] text-white">
          {company.positioning}
        </h1>
        <p className="mt-5 max-w-[420px] text-[14px] leading-[1.7] text-white/65">
          {company.descriptor}
        </p>
        <div className="mt-10 grid max-w-[400px] grid-cols-3 gap-6 border-t border-white/15 pt-6">
          {[
            ['Markets', '12'],
            ['Corridors', '4'],
            ['Uptime', '99.9%']
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold">{label}</div>
              <div className="mt-1 text-[20px] font-bold tabular-nums text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between border-t border-white/15 pt-5 text-[10px] text-white/55">
        <span>IB-2024-12 · December 2024</span>
        <span>{company.website}</span>
      </div>
    </div>
  );
}

/** Tender response — sand editorial with client / ref grid. */
export function CoverTenderResponse(): JSX.Element {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col justify-between bg-brand-sand" style={{ padding: PAD }}>
      <Logo size={24} />
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Tender response</div>
        <h1 className="mt-4 max-w-[560px] text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
          Ministry of Trade &amp; Industry — cross-border settlement rails
        </h1>
        <p className="mt-4 max-w-[480px] text-[13px] leading-[1.7] text-gray-700">
          Response to RFP-MTI-2024-118 for public-sector corridor settlement and reconciliation services.
        </p>
        <div className="mt-10 grid max-w-[520px] grid-cols-2 gap-8 border-t border-gray-200 pt-6">
          {[
            ['Prepared for', 'Ministry of Trade & Industry'],
            ['RFP reference', 'RFP-MTI-2024-118'],
            ['Our reference', 'TR-2024-088'],
            ['Submission date', '15 January 2025'],
            ['Validity', '120 days'],
            ['Contact', company.personName]
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
              <div className="mt-1 text-[13px] font-medium text-ink">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between border-t border-gray-200 pt-5 text-[10px] text-gray-500">
        <span>
          {company.legalName} · {company.registration} · {company.endorsement}
        </span>
        <span>{company.website}</span>
      </div>
    </div>
  );
}

/** White paper — white with gold rule, thought leadership. */
export function CoverWhitePaper(): JSX.Element {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col justify-between bg-white" style={{ padding: PAD }}>
      <div className="flex items-start justify-between">
        <Logo size={24} />
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">
          Thought leadership
        </span>
      </div>
      <div>
        <BrandRule width={96} thickness={2} tone="gold" />
        <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">White paper</div>
        <h1 className="mt-4 max-w-[560px] text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
          Settlement rails for African commerce
        </h1>
        <p className="mt-5 max-w-[460px] text-[14px] leading-[1.7] text-gray-700">
          How corridor design, reconciliation discipline and merchant verification reshape
          cross-border B2B payments.
        </p>
        <div className="mt-10 grid max-w-[400px] grid-cols-2 gap-8 border-t border-gray-200 pt-6">
          {[
            ['Authors', company.personName],
            ['Series', 'WP-2024-03'],
            ['Published', 'December 2024'],
            ['Pages', '24']
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
              <div className="mt-1 text-[12px] font-medium text-ink">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between border-t border-gray-200 pt-5 text-[10px] text-gray-500">
        <span>
          {company.legalName} · {company.endorsement}
        </span>
        <span>{company.website}</span>
      </div>
    </div>
  );
}

/** Training manual — sand with module list. */
export function CoverTrainingManual(): JSX.Element {
  const company = useCompany();
  const modules = [
    ['M01', 'Platform overview and access'],
    ['M02', 'Merchant onboarding workflow'],
    ['M03', 'Settlement windows and cut-offs'],
    ['M04', 'Reconciliation and exceptions'],
    ['M05', 'Support escalation and SLAs'],
    ['M06', 'Compliance checkpoints']
  ];
  return (
    <div className="flex h-full w-full flex-col bg-brand-sand" style={{ padding: PAD }}>
      <div className="flex items-start justify-between">
        <Logo size={24} />
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">
          Internal training
        </span>
      </div>
      <div className="mt-14">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Training manual</div>
        <h1 className="mt-4 max-w-[520px] text-[38px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
          Operations academy — foundation
        </h1>
        <p className="mt-4 max-w-[440px] text-[13px] leading-[1.7] text-gray-700">
          Six modules for new operations and support staff. Complete before production access.
        </p>
      </div>
      <div className="mt-10 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">Modules</div>
        <ul className="mt-3">
          {modules.map(([code, title]) => (
            <li key={code} className="flex items-baseline gap-4 border-b border-gray-200 py-3">
              <span className="w-10 text-[10px] font-semibold tabular-nums text-brand">{code}</span>
              <span className="text-[13px] text-ink">{title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-end justify-between border-t border-gray-200 pt-5 text-[10px] text-gray-500">
        <span>
          TM-OPS-01 · Rev. 02 · {company.endorsement}
        </span>
        <span>{company.website}</span>
      </div>
    </div>
  );
}

/** Press kit — primary reversed media kit. */
export function CoverPressKit(): JSX.Element {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col justify-between bg-brand" style={{ padding: PAD }}>
      <div className="flex items-start justify-between">
        <Logo size={24} tone="light" />
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">Media</span>
      </div>
      <div>
        <BrandRule width={96} thickness={2} tone="gold" />
        <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
          Press &amp; media kit
        </div>
        <h1 className="mt-4 max-w-[520px] text-[44px] font-bold leading-[1.08] tracking-[-0.03em] text-white">
          Brand assets and company facts
        </h1>
        <p className="mt-5 max-w-[420px] text-[14px] leading-[1.7] text-white/65">
          Logos, colour values, boilerplate copy and approved photography for journalists and partners.
        </p>
        <div className="mt-10 space-y-2 text-[12px] text-white/75">
          {[
            'Boilerplate & executive bios',
            'Logo pack (SVG / PNG)',
            'Brand colour & typography sheet',
            'Approved photography',
            'Africa market facts sheet'
          ].map((item) => (
            <div key={item} className="flex items-baseline gap-3 border-b border-white/10 py-2">
              <span className="text-brand-gold">—</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between border-t border-white/15 pt-5 text-[10px] text-white/55">
        <span>
          PK-2024 · {company.email}
        </span>
        <span>{company.website}</span>
      </div>
    </div>
  );
}

/** Contract schedule — white legal cover with parties. */
export function CoverContractSchedule(): JSX.Element {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col justify-between bg-white" style={{ padding: PAD }}>
      <div className="flex items-start justify-between">
        <Logo size={22} />
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">
          Legal · Schedule
        </span>
      </div>
      <div>
        <BrandRule width="100%" thickness={1} />
        <div className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
          Schedule to master services agreement
        </div>
        <h1 className="mt-4 max-w-[540px] text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
          Statement of work — Schedule A
        </h1>
        <div className="mt-10 grid grid-cols-2 gap-0 border border-gray-200">
          <div className="border-r border-gray-200 px-5 py-5">
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-brand">Party A — Provider</div>
            <div className="mt-2 space-y-0.5 text-[11px] leading-[1.7] text-gray-700">
              <div className="font-semibold text-ink">{company.legalName}</div>
              <div>
                {[company.addressLine1, company.addressLine2]
                  .map((p) => p?.trim())
                  .filter(Boolean)
                  .join(', ')}
              </div>
              <div>{company.country}</div>
              <div>{company.registration}</div>
            </div>
          </div>
          <div className="px-5 py-5">
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-brand">Party B — Customer</div>
            <div className="mt-2 space-y-0.5 text-[11px] leading-[1.7] text-gray-700">
              <div className="font-semibold text-ink">Continental Trade Partners Ltd.</div>
              <div>14 Marina Road, Accra</div>
              <div>Ghana</div>
              <div>TIN C0012345678</div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {[
            ['Agreement ref.', 'MSA-2024-0417'],
            ['Schedule ref.', 'SOW-A-01'],
            ['Effective date', '01 January 2025']
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
              <div className="mt-1 text-[12px] font-medium text-ink">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200 pt-5 text-[10px] text-gray-500">
        {company.endorsement} · Controlled legal document · Not for public distribution
      </div>
    </div>
  );
}

export const enterpriseCovers: Array<{
  title: string;
  fileName: string;
  description: string;
  group: string;
  render: () => JSX.Element;
}> = [
  {
    title: 'Cover — Annual Report',
    fileName: 'NubiaGo_Cover_Annual_Report',
    description: 'Reversed primary field with oversized year for the statutory annual report.',
    group: 'Governance',
    render: () => <CoverAnnualReport />
  },
  {
    title: 'Cover — Board Pack',
    fileName: 'NubiaGo_Cover_Board_Pack',
    description: 'White board-meeting agenda with a confidential band and numbered agenda list.',
    group: 'Governance',
    render: () => <CoverBoardPack />
  },
  {
    title: 'Cover — Due Diligence',
    fileName: 'NubiaGo_Cover_Due_Diligence',
    description: 'Warm Sand M&A / investment data-room cover with series and validity metadata.',
    group: 'Corporate',
    render: () => <CoverDueDiligence />
  },
  {
    title: 'Cover — Policy Handbook',
    fileName: 'NubiaGo_Cover_Policy_Handbook',
    description: 'Technical white index cover listing controlled internal policies with page numbers.',
    group: 'Compliance',
    render: () => <CoverPolicyHandbook />
  },
  {
    title: 'Cover — Investor Brief',
    fileName: 'NubiaGo_Cover_Investor_Brief',
    description: 'Dark primary one-pager cover for investor relations with key metrics.',
    group: 'Investor',
    render: () => <CoverInvestorBrief />
  },
  {
    title: 'Cover — Tender Response',
    fileName: 'NubiaGo_Cover_Tender_Response',
    description: 'Editorial sand cover with client and RFP reference grid for procurement responses.',
    group: 'Commercial',
    render: () => <CoverTenderResponse />
  },
  {
    title: 'Cover — White Paper',
    fileName: 'NubiaGo_Cover_White_Paper',
    description: 'Thought-leadership cover on white with a gold rule and publication metadata.',
    group: 'Thought leadership',
    render: () => <CoverWhitePaper />
  },
  {
    title: 'Cover — Training Manual',
    fileName: 'NubiaGo_Cover_Training_Manual',
    description: 'Sand operations academy cover listing six foundation training modules.',
    group: 'People',
    render: () => <CoverTrainingManual />
  },
  {
    title: 'Cover — Press Kit',
    fileName: 'NubiaGo_Cover_Press_Kit',
    description: 'Reversed media kit listing boilerplate, logos, colour sheet and photography.',
    group: 'Media',
    render: () => <CoverPressKit />
  },
  {
    title: 'Cover — Contract Schedule',
    fileName: 'NubiaGo_Cover_Contract_Schedule',
    description: 'Legal schedule cover with Party A / Party B blocks and agreement references.',
    group: 'Legal',
    render: () => <CoverContractSchedule />
  }
];
