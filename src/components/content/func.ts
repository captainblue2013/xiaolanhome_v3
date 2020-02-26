const COLORS = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

export function tagColor(tag: string): string {
  let index: number = 0;
  for (let i = 0; i < tag.length; i++) {
    index += tag.charCodeAt(i);
  }
  return COLORS[index % COLORS.length];
}

