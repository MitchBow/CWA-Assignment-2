export interface StageData {
  code: string;
  tasks: string[];
  hints: Record<string, string>;
  checks: Record<string, (code: string) => boolean>;
  correctCode?: Record<string, string>; // store correct snippet per task
}

export const stages: Record<number, StageData> = {
  1: {
    code: `
<html>
  <head>
    <title>My Page<title>
  </head>
  <body>
    <h1>Welcome to my site
    <p>This is a paragraph
  </body>
</html>
    `.trim(),
    tasks: ['Fix malformed <title>', 'Close <h1> tag', 'Close <p> tag'],
    hints: {
      'Fix malformed <title>': 'Remember to add a proper closing </title> tag.',
      'Close <h1> tag': 'Headings should always have an opening and closing tag.',
      'Close <p> tag': 'Paragraphs need </p> to close correctly.',
    },
    checks: {
      'Fix malformed <title>': code => !code.includes('<title>My Page<title>'),
      'Close <h1> tag': code => code.includes('</h1>'),
      'Close <p> tag': code => code.includes('</p>'),
    },
    correctCode: {
      'Fix malformed <title>': '<title>My Page</title>',
      'Close <h1> tag': '</h1>',
      'Close <p> tag': '</p>',
    },
  },

  2: {
    code: `
<html>
  <head>
    <style>h1 { color: red; }</style>
  </head>
  <body>
    <img src="logo.png">
    <ul>
      <li>Item 1
      <li>Item 2
    </ul>
  </body>
</html>
    `.trim(),
    tasks: ['Add alt attribute to <img>', 'Close <li> tags', 'Link external stylesheet'],
    hints: {
      'Add alt attribute to <img>': 'Images need alt="description" for accessibility.',
      'Close <li> tags': 'Each <li> should be closed with </li>.',
      'Link external stylesheet': 'Use <link rel="stylesheet" href="style.css"> instead of <style>.',
    },
    checks: {
      'Add alt attribute to <img>': code => code.includes('alt='),
      'Close <li> tags': code => code.includes('</li>'),
      'Link external stylesheet': code => code.includes('<link rel="stylesheet"'),
    },
    correctCode: {
      'Add alt attribute to <img>': '<img src="logo.png" alt="Logo">',
      'Close <li> tags': '<li>Item 1</li><li>Item 2</li>',
      'Link external stylesheet': '<link rel="stylesheet" href="style.css">',
    },
  },

  3: {
    code: `
<html>
  <body>
    <form>
      <input name="username">
      <input name="email">
    </form>
  </body>
</html>
    `.trim(),
    tasks: ['Add required to inputs', 'Set type="email" for email input', 'Add form action'],
    hints: {
      'Add required to inputs': 'Try adding required inside <input>.',
      'Set type="email" for email input': 'Use type="email" so browsers validate the field.',
      'Add form action': 'Forms should have an action, like action="/submit".',
    },
    checks: {
      'Add required to inputs': code => code.includes('required'),
      'Set type="email" for email input': code => code.includes('type="email"'),
      'Add form action': code => code.includes('action='),
    },
    correctCode: {
      'Add required to inputs': '<input name="username" required>',
      'Set type="email" for email input': '<input name="email" type="email" required>',
      'Add form action': '<form action="/submit">',
    },
  },

  // You can continue adding stages 4,5,6 in the same format...
};
