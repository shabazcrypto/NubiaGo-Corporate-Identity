import type { Meta, StoryObj } from '@storybook/react';
import { formats } from '@/lib/formats';

const meta: Meta = {
  title: 'System/Formats',
  parameters: { layout: 'padded' }
};

export default meta;
type Story = StoryObj;

const rows = Object.values(formats).map((spec) => ({
  id: spec.id,
  label: spec.label,
  css: `${spec.width} × ${spec.height}`,
  exportPx: `${spec.exportWidth} × ${spec.exportHeight}`,
  mm: `${spec.widthMm.toFixed(1)} × ${spec.heightMm.toFixed(1)}`,
  dpi: spec.dpiLabel,
  exports: spec.defaultExports.join(', ') || 'HTML actions only'
}));

export const Registry: Story = {
  render: () => (
    <div className="max-w-4xl overflow-hidden border border-gray-200 bg-white text-[13px]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-brand text-left text-white">
            <th className="px-3 py-2">ID</th>
            <th className="px-3 py-2">Label</th>
            <th className="px-3 py-2">CSS px</th>
            <th className="px-3 py-2">Export px</th>
            <th className="px-3 py-2">mm</th>
            <th className="px-3 py-2">DPI</th>
            <th className="px-3 py-2">Exports</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} className={index % 2 ? 'bg-gray-50' : 'bg-white'}>
              <td className="border-b border-gray-200 px-3 py-2 font-mono text-[11px]">{row.id}</td>
              <td className="border-b border-gray-200 px-3 py-2">{row.label}</td>
              <td className="border-b border-gray-200 px-3 py-2 tabular-nums">{row.css}</td>
              <td className="border-b border-gray-200 px-3 py-2 tabular-nums">{row.exportPx}</td>
              <td className="border-b border-gray-200 px-3 py-2 tabular-nums">{row.mm}</td>
              <td className="border-b border-gray-200 px-3 py-2">{row.dpi}</td>
              <td className="border-b border-gray-200 px-3 py-2">{row.exports}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-gray-200 px-3 py-3 text-[12px] text-gray-500">
        Verified targets: A4 export {formats.a4.exportWidth}×{formats.a4.exportHeight} · Card{' '}
        {formats.card.exportWidth}×{formats.card.exportHeight} · Slide {formats.slide.width}×{formats.slide.height}
      </p>
    </div>
  )
};
