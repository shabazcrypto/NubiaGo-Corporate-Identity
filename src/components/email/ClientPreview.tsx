import { useState, type ReactNode } from 'react';

export type EmailClientId = 'gmail' | 'outlook' | 'apple';

const CLIENTS: { id: EmailClientId; label: string; note: string }[] = [
  { id: 'gmail', label: 'Gmail', note: 'Web · sans stack · white chrome' },
  { id: 'outlook', label: 'Outlook', note: 'Desktop · Word HTML engine · tighter width' },
  { id: 'apple', label: 'Apple Mail', note: 'macOS · generous padding · system chrome' }
];

type ClientPreviewProps = {
  children: ReactNode;
  /** Optional controlled client; omit for internal state. */
  client?: EmailClientId;
  onClientChange?: (id: EmailClientId) => void;
};

export function ClientPreviewToggle({
  client,
  onChange
}: {
  client: EmailClientId;
  onChange: (id: EmailClientId) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 print:hidden" role="group" aria-label="Email client preview">
      {CLIENTS.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(c.id)}
          title={c.note}
          className={`border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors ${
            client === c.id
              ? 'border-brand bg-brand text-white'
              : 'border-gray-200 bg-white text-gray-700 hover:border-brand hover:text-brand'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

/** Chrome shell that simulates Gmail / Outlook / Apple Mail around signature HTML. */
export function ClientPreviewFrame({
  client,
  children
}: {
  client: EmailClientId;
  children: ReactNode;
}) {
  if (client === 'outlook') {
    return (
      <div className="flex h-full w-full flex-col bg-[#F3F2F1]">
        <div className="flex items-center gap-2 border-b border-[#E1DFDD] bg-white px-3 py-2">
          <span className="text-[11px] font-semibold text-[#185ABD]">Outlook</span>
          <span className="text-[10px] text-gray-500">Reading pane · 100%</span>
        </div>
        <div className="flex min-h-0 flex-1 justify-center overflow-auto p-3">
          <div className="w-full max-w-[560px] border border-[#E1DFDD] bg-white shadow-sm">{children}</div>
        </div>
      </div>
    );
  }

  if (client === 'apple') {
    return (
      <div className="flex h-full w-full flex-col bg-[#E8E8E8]">
        <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#F6F6F6] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-[11px] font-medium text-gray-700">Mail</span>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-6 sm:p-8">{children}</div>
      </div>
    );
  }

  // Gmail
  return (
    <div className="flex h-full w-full flex-col bg-[#F2F2F2]">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-2.5">
        <span className="text-[13px] font-medium text-[#5F6368]">Gmail</span>
        <span className="rounded bg-[#E8F0FE] px-2 py-0.5 text-[10px] font-medium text-[#1967D2]">Inbox</span>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-white p-4 sm:p-6">{children}</div>
    </div>
  );
}

/** Stateful wrapper for AssetFrame children. */
export function ClientPreview({ children, client: controlled, onClientChange }: ClientPreviewProps) {
  const [internal, setInternal] = useState<EmailClientId>('gmail');
  const client = controlled ?? internal;
  const setClient = (id: EmailClientId) => {
    onClientChange?.(id);
    if (controlled === undefined) setInternal(id);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <ClientPreviewToggle client={client} onChange={setClient} />
        <span className="hidden text-[10px] text-gray-500 sm:inline">
          {CLIENTS.find((c) => c.id === client)?.note}
        </span>
      </div>
      <div className="min-h-0 flex-1">
        <ClientPreviewFrame client={client}>{children}</ClientPreviewFrame>
      </div>
    </div>
  );
}
