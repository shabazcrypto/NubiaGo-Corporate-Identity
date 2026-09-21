const PNG_SIG = [137, 80, 78, 71, 13, 10, 26, 10];

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function u32(value: number): Uint8Array {
  return new Uint8Array([(value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff]);
}

function readU32(bytes: Uint8Array, offset: number): number {
  return ((bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3]) >>> 0;
}

function concat(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function makeChunk(type: string, data: Uint8Array): Uint8Array {
  const typeBytes = new TextEncoder().encode(type);
  const crcInput = concat([typeBytes, data]);
  return concat([u32(data.length), typeBytes, data, u32(crc32(crcInput))]);
}

function isPng(bytes: Uint8Array): boolean {
  return PNG_SIG.every((value, index) => bytes[index] === value);
}

/** Embed a pHYs chunk so layout apps honour the intended DPI instead of assuming 72. */
export function injectPngDpi(png: Uint8Array, dpi: number): Uint8Array {
  if (!isPng(png)) return png;

  const pixelsPerMeter = Math.round(dpi / 0.0254);
  const physData = concat([u32(pixelsPerMeter), u32(pixelsPerMeter), new Uint8Array([1])]);
  const physChunk = makeChunk('pHYs', physData);

  const chunks: Uint8Array[] = [png.slice(0, 8)];
  let offset = 8;
  let inserted = false;

  while (offset + 8 <= png.length) {
    const length = readU32(png, offset);
    const type = String.fromCharCode(png[offset + 4], png[offset + 5], png[offset + 6], png[offset + 7]);
    const chunkEnd = offset + 12 + length;
    if (chunkEnd > png.length) break;

    if (type === 'pHYs') {
      offset = chunkEnd;
      continue;
    }

    if (!inserted && type !== 'IHDR') {
      chunks.push(physChunk);
      inserted = true;
    }

    chunks.push(png.slice(offset, chunkEnd));
    offset = chunkEnd;
  }

  if (!inserted) chunks.push(physChunk);
  return concat(chunks);
}

export function dataUrlToBytes(dataUrl: string): Uint8Array {
  const comma = dataUrl.indexOf(',');
  const binary = atob(comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function bytesToDataUrl(bytes: Uint8Array, mime: string): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return `data:${mime};base64,${btoa(binary)}`;
}
