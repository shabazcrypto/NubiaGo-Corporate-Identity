import React from 'react';
import { editableCompanyFields } from '@/data/brand';
import { useBrandSettings } from '@/lib/brand-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DownloadIcon, SettingsIcon, UploadIcon } from 'lucide-react';

export function BrandSettingsDialog() {
  const {
    company,
    profiles,
    updateCompany,
    resetCompany,
    saveProfile,
    loadProfile,
    deleteProfile,
    exportProfileJson,
    importProfileJson
  } = useBrandSettings();
  const [open, setOpen] = React.useState(false);
  const [profileLabel, setProfileLabel] = React.useState('');
  const [importError, setImportError] = React.useState<string | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const handleSaveProfile = () => {
    saveProfile(profileLabel || `${company.name} handoff`);
    setProfileLabel('');
  };

  const handleImportFile = async (file: File) => {
    setImportError(null);
    try {
      const text = await file.text();
      importProfileJson(text);
      setOpen(false);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Invalid profile JSON');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" aria-label="Brand details">
          <SettingsIcon strokeWidth={1.5} />
          <span className="hidden sm:inline">Brand details</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update brand details</DialogTitle>
          <DialogDescription>
            These values flow through letterheads, cards, signatures and footers. Save named handoff profiles, or
            export / import JSON for another machine.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          {editableCompanyFields.map((field) => (
            <label key={field.key} className="flex flex-col gap-1.5">
              <Label htmlFor={field.key}>{field.label}</Label>
              <Input
                id={field.key}
                value={company[field.key]}
                onChange={(event) => updateCompany({ [field.key]: event.target.value })}
              />
            </label>
          ))}
        </div>

        <div className="mt-2 space-y-3 border-t border-gray-200 pt-4">
          <h4 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-500">Handoff profiles</h4>
          <div className="flex flex-wrap items-end gap-2">
            <label className="flex min-w-[160px] flex-1 flex-col gap-1.5">
              <Label htmlFor="profile-label">Profile name</Label>
              <Input
                id="profile-label"
                placeholder="e.g. Lagos print run"
                value={profileLabel}
                onChange={(e) => setProfileLabel(e.target.value)}
              />
            </label>
            <Button type="button" variant="outline" size="sm" onClick={handleSaveProfile}>
              Save profile
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={exportProfileJson}>
              <DownloadIcon strokeWidth={1.5} />
              Export JSON
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
              <UploadIcon strokeWidth={1.5} />
              Import JSON
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleImportFile(file);
                e.target.value = '';
              }}
            />
          </div>
          {importError ? <p className="text-[12px] text-state-error">{importError}</p> : null}
          {profiles.length > 0 ? (
            <ul className="divide-y divide-gray-200 border border-gray-200">
              {profiles.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium text-ink">{p.label}</div>
                    <div className="text-[11px] text-gray-500">
                      {p.brand === 'ashbak' ? 'AshBak' : 'NubiaGo'} · {new Date(p.updatedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <Button type="button" size="sm" variant="outline" onClick={() => loadProfile(p.id)}>
                      Load
                    </Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => deleteProfile(p.id)}>
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[12px] text-gray-500">No saved profiles yet.</p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={resetCompany}>
            Reset placeholders
          </Button>
          <Button type="button" onClick={() => setOpen(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
