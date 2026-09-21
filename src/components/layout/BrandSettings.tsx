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
import { SettingsIcon } from 'lucide-react';

export function BrandSettingsDialog() {
  const { company, updateCompany, resetCompany } = useBrandSettings();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <SettingsIcon strokeWidth={1.5} />
          Brand details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update brand details</DialogTitle>
          <DialogDescription>
            These values flow through letterheads, cards, signatures and footers. They stay in this browser until you
            reset them.
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
